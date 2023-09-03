import CModal from "@components/CModal/CModal";
import H3 from "@components/H3/H3";
import { Button, HStack, VStack } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ICAR } from "../../MapScreen";
import BottomScan from "../BottomScan/BottomScan";
import CarDetailsSheet from "../BottomScan/components/CarDetailsSheet/CarDetailsSheet";
import GeoSheet from "../BottomScan/components/GeoSheet/GeoSheet";
import SelectActionSheet from "../BottomScan/components/SelectActionSheet/SelectActionSheet";
import SpeedSheet from "../BottomScan/components/SpeedSheet/SpeedSheet";
import LocationSearch from "../LocationSearch/LocationSearch";
import MapTopDetails from "../MapTopDetails/MapTopDetails";
import SpeedMeter from "../SpeedMeter/SpeedMeter";

import { useRoute } from "@react-navigation/native";
import { useCheckIsCarTripActiveQuery } from "@store/api/v2/tripApi/tripApiSlice";
import { selectCarTripInfo } from "@store/features/car-trip/carTripSlice";
import { ICarTripState } from "@store/features/car-trip/carTripSlice.types";
import { fontSizes } from "@theme/typography";
import { useDispatch, useSelector } from "react-redux";
import { tripApiSlice } from "@store/api/v2/tripApi/tripApiSlice";
import Sos from "../Sos/Sos";

export interface IMapTopDetailsProps {
    type: ICAR;
    setType: (type: ICAR) => void;
}

function MapscreenComp({ type, setType }: IMapTopDetailsProps) {
    const { width } = Dimensions.get("window");

    const route = useRoute();
    const params = route.params as any;

    const dispatch = useDispatch();

    const carTripDetails: ICarTripState = useSelector(selectCarTripInfo);
    const { data, refetch } = useCheckIsCarTripActiveQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const updateType = React.useMemo(() => {
        return (carType: ICAR) => {
            setType(carType);
        };
    }, []);

    const insets = useSafeAreaInsets();

    React.useEffect(() => {
        dispatch(tripApiSlice.endpoints.checkIsCarTripActive.initiate())
            .unwrap()
            .then((res) => {
                console.log("res", res);
                // setData(res);
            });
    }, []);

    React.useEffect(() => {
        console.log("data?.data?.succeeded", data?.succeeded);
        if (data?.succeeded) {
            console.log("data?.data?.succeeded", data?.succeeded);
            SheetManager.show("carDetailsSheet");
        } else {
            SheetManager.hide("carDetailsSheet");
        }
    }, [data]);

    // console.log(new Date("2023-03-21T17:16:45.495Z").getTime());

    return (
        <VStack
            flex={1}
            position="absolute"
            zIndex={10000}
            top={0}
            left={0}
            bottom={0}
            right={0}
            w={width}
            bg={"transparent"}
            pointerEvents="box-none"
            pt={insets.top + 15 + "px"}
            justifyContent="space-between"
        >
            <VStack>
                <LocationSearch
                    setDestinationLocation={() => {}}
                    selectedType={type}
                    position="absolute"
                    zIndex={100000}
                />
                <MapTopDetails
                    selected={type}
                    px="4"
                    setSelected={updateType}
                    mt={"80px"}
                    hasStartedJourny={data?.succeeded}
                    startedTime={
                        data?.data?.tripStartTime
                            ? new Date(data?.data?.tripStartTime)
                            : undefined
                    }
                />
            </VStack>
            <SpeedMeter />
            {carTripDetails?.hasStartedJourney ? <Sos /> : null}
            <BottomScan
                onLeftPress={() => SheetManager.show("selectionSheet")}
            />

            <SpeedSheet sheetId="speedSheet" onBtnPress={() => {}} />

            <CarDetailsSheet
                sheetId="carDetailsSheet"
                avaiableDistance={"3.2 km"}
                availeTime={"1 hour"}
                availableBattery={"100%"}
                carId={"10545"}
                hasStartedJourney={data?.succeeded}
                tripDetails={data?.data}
            />

            <GeoSheet sheetId={"geoSheet"} />

            <SelectActionSheet
                sheetId="selectionSheet"
                onBtn2Press={() => {
                    SheetManager.hide("selectionSheet");
                    SheetManager.show("geoSheet");
                }}
            />

            <CModal isOpen={false} py={8}>
                <H3 fontSize={fontSizes.lg} textAlign="center">
                    Before ending the ride make sure you have parked in a safe
                    zone. Make sure above 25% of fuel.
                </H3>
                <HStack justifyContent={"space-between"} px="4">
                    <Button
                        _text={{
                            fontWeight: 700,
                            fontSize: 11,
                            textTransform: "uppercase",
                            color: "primary.100",
                        }}
                        w={"100%"}
                        borderRadius={14}
                        variant="outline"
                        borderColor={"primary.100"}
                        borderWidth={1.5}
                        _pressed={{
                            bg: "#ffffff80",
                        }}
                        onPress={() => console.log("pressed")}
                    >
                        CONFIRM END RIDE
                    </Button>
                </HStack>
            </CModal>
        </VStack>
    );
}

export default React.memo(MapscreenComp);
