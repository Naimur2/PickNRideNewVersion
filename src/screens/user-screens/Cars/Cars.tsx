import BackButton from "@components/BackButton/BackButton";
import Balance from "@components/Balance/Balance";
import CarCard from "@components/CarCard/CarCard";
import HeaderTitle from "@components/HeaderTitle/HeaderTitle";
import ImageBg from "@components/ImageBg/ImageBg";
import LoadingView from "@components/LoadingView/LoadingView";
import Scroller from "@components/Scroller/Scroller";
import { useNavigation } from "@react-navigation/native";
import {
    useGetAllCarsByCategoryAndLocationQuery,
    useGetAllCarsWithCategoryQuery,
    useGetGetAllCarsApiQuery,
    useGetPricingByCarCategoryQuery,
} from "@store/api/v1/carApi/carApiSlice";
import { selectCurrentRegion } from "@store/features/user-location/userLocationSlice";
import colors from "@theme/colors";
import { VStack, useColorMode } from "native-base";
import React from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function Cars() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();
    const insets = useSafeAreaInsets();
    const currentLocation = useSelector(selectCurrentRegion);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="Pricing" />,
            headerTitleAlign: "center",
            headerLeft: () => (
                <BackButton color={colorMode === "dark" ? "white" : "black"} />
            ),
            headerRight: () => (
                <Balance iconColor="primary.100" textColor="gray.100" />
            ),
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor:
                    colorMode === "dark" ? colors.dark[100] : colors.light[300],
            },
        });
    }, [navigation]);
    //   Cars API
    const { data: carCategoryPrice, isLoading } =
        useGetPricingByCarCategoryQuery(undefined);
    const body = {
        latitude: currentLocation?.latitude,
        longitude: currentLocation?.longitude,
    };
    const { data: carsData, isLoading: carsLoading } =
        useGetAllCarsByCategoryAndLocationQuery(body);

    // car data
    const cardD = carsData?.data?.map((item, index) => {
        const car = item?.cars?.[0];

        return {
            category: item?.category,
            totalCars: item?.totalCarsInCategory,
            car: {
                id: car?.id,
                name: car?.name,
                latitude: car?.latitude,
                longitude: car?.longitude,
                price: car?.price,
                image: car?.image,
                totalKm: car?.totalKm,
                distanceInMeter: car?.distanceInMeter,
            },
        };
    });
    //

    return (
        <ImageBg flex={1} type={colorMode}>
            {carsLoading ? <LoadingView /> : null}
            <Scroller
                contentStyle={{
                    flexGrow: 1,
                }}
            >
                <VStack
                    space={4}
                    mt={4}
                    px="6"
                    pb={8}
                    h="full"
                    mx="auto"
                    pt={Platform.OS === "android" ? 55 : 0}
                >
                    {cardD?.map((car, index) => {
                        return (
                            <CarCard
                                key={car?.category + index}
                                // subtitle={car.category}
                                title={car?.category}
                                category={car?.category}
                                image={car?.car?.image}
                                distance={car?.car?.distanceInMeter}
                                vehicle={car?.car}
                                totalCars={car?.totalCars}
                                carPrice={carCategoryPrice?.data?.filter(
                                    (v) => v?.category === car?.category
                                )}
                            />
                        );
                    })}
                </VStack>
            </Scroller>
        </ImageBg>
    );
}
