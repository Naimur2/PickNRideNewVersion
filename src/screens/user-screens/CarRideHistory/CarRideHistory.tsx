import BackButton from "@components/BackButton/BackButton";
import Balance from "@components/Balance/Balance";
import HeaderTitle from "@components/HeaderTitle/HeaderTitle";
import { useNavigation } from "@react-navigation/native";
import colors from "@theme/colors";
import { FlatList, HStack, Text, VStack, useColorMode } from "native-base";
import React from "react";
import { ActivityIndicator, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";

import {
    tripApiSlice,
    useGetAllCarTripsQuery,
} from "@store/api/v2/tripApi/tripApiSlice";
import { useDispatch, useSelector } from "react-redux";
import HistoryCard, { IHistoryCard } from "./HistoryCard/HistoryCard";
import ViichleCircle from "@components/VeichleSelector/ViichleCircle/ViichleCircle";
import { ECarType } from "@store/features/cars/carsSlice.types";

const RHistoryContext = React.createContext({
    selected: ECarType.CAR,
    setSelected: (type: ECarType) => {},
});

const LoadingComponent = () => {
    return (
        <VStack alignItems="center" justifyContent="center" height={scale(100)}>
            <ActivityIndicator size="large" color="black" />
        </VStack>
    );
};

const HeadaderComponent = React.memo(() => {
    const { selected, setSelected } = React.useContext(RHistoryContext);
    return (
        <HStack space={4} px={4} pb={4} bg={colors.light[300]} w={"full"}>
            {/* <ViichleCircle
        type={ECarType.SCOTTER}
        isActive={selected === ECarType.SCOTTER}
        onPress={() => setSelected(ECarType.SCOTTER)}
        p={4}
        imageWidth={24}
      /> */}
            <ViichleCircle
                type={ECarType.CAR}
                isActive={selected === ECarType.CAR}
                onPress={() => setSelected(ECarType.CAR)}
                p={4}
                imageWidth={24}
            />
            {/* <ViichleCircle
        type={ECarType.CYCLE}
        isActive={selected === ECarType.CYCLE}
        onPress={() => setSelected(ECarType.CYCLE)}
        p={4}
        imageWidth={24}
      /> */}
        </HStack>
    );
});

const minuteToHour = (minute: number) => {
    const hour = minute / 60;
    if (hour > 24) {
        return (hour / 24).toFixed(2) + " days";
    }
    return hour?.toFixed(2) + " hr";
};

const milisecondToMinuteHour = (milisecond: number) => {
    const second = milisecond / 1000;
    if (second < 60) {
        return second?.toFixed(2) + " sec";
    }
    const minute = second / 60;
    if (minute < 60) {
        return minute?.toFixed(2) + " min";
    }
    const hour = minute / 60;
    if (hour > 24) {
        return (hour / 24).toFixed(2) + " days";
    }
    return hour?.toFixed(2) + " hr";
};

const renderItem = ({ item, index }: { item: IHistoryCard; index: number }) => {
    return (
        <HistoryCard
            item={item}
            starting={item?.starting}
            destination={item?.destination}
            duration={milisecondToMinuteHour(item?.duration || 0)}
            fair={item?.fair}
            distance={item?.distance}
            key={index}
            rideId={item?._id}
        />
    );
};

export default function CarRideHistory() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const colormode = useColorMode();
    const dispatch = useDispatch();

    const [selected, setSelected] = React.useState<ECarType>(ECarType.SCOTTER);

    const { data, isFetching, isLoading } = useGetAllCarTripsQuery(undefined, {
        refetchOnMountOrArgChange: false,
    });

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="RIDE history" />,
            headerTitleAlign: "center",
            headerLeft: () => (
                <BackButton
                    color={colormode.colorMode === "dark" ? "white" : "black"}
                />
            ),
            headerRight: () => (
                <Balance iconColor="primary.100" textColor="gray.100" />
            ),
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor:
                    colormode.colorMode === "dark"
                        ? colors.dark[100]
                        : colors.light[300],
            },
        });
    }, [navigation]);

    const onLoadMore = async () => {
        console.log("onLoadMore");
        const hasNextPage = data?.data?.hasNextPage;
        const currentPage = data?.data?.pageIndex;
        if (hasNextPage) {
            const res = await dispatch(
                tripApiSlice.endpoints.geMoreCarTrips.initiate({
                    pageNumber: currentPage + 1,
                    pageSize: 15,
                })
            ).unwrap();
            console.log("res", res);
        }
    };

    const values = React.useMemo(() => ({ selected, setSelected }), [selected]);

    const dataToRender = React.useMemo(() => {
        if (selected === ECarType.CAR) {
            return data?.data?.items?.filter(
                (item: IHistoryCard) => item?.type === 3
            );
        } else if (selected === ECarType.SCOTTER) {
            return data?.data?.items?.filter(
                (item: IHistoryCard) => item?.type === 2
            );
        } else {
            return data?.data?.items?.filter(
                (item: IHistoryCard) => item?.type === 1
            );
        }
    }, [selected, data]);
    //

    return (
        <RHistoryContext.Provider value={values}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={data?.data?.items || []}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingTop: Platform.OS === "ios" ? insets.top : 0,
                    paddingBottom: insets.bottom,
                    backgroundColor: colors.light[300],
                }}
                onEndReached={onLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isFetching ? LoadingComponent : null}
                ListEmptyComponent={
                    isLoading ? null : (
                        <VStack
                            alignItems="center"
                            justifyContent="center"
                            height={scale(100)}
                        >
                            <Text
                                textAlign={"center"}
                                maxWidth={200}
                                fontWeight={700}
                                fontSize={"xl"}
                                color={"red.100"}
                            >
                                No history found for this vehicle
                            </Text>
                        </VStack>
                    )
                }
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={HeadaderComponent}
                stickyHeaderIndices={[0]}
            />
        </RHistoryContext.Provider>
    );
}
