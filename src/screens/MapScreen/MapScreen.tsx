import { VStack } from "native-base";
import React from "react";
import { ICAR } from "./MapScreen.types";
import MapBox, { IMapScreenProps } from "./components/MapBox/MapBox";
import { SheetManager } from "react-native-actions-sheet";
import MapscreenComp, {
  IMapTopDetailsProps,
} from "./components/MapScreenComp/MapscreenComp";

interface IMapProps extends IMapScreenProps, IMapTopDetailsProps {}

function ActualMap({ route }: any) {
  const [carType, setCarType] = React.useState<ICAR>("scooter");
  // console.log("route", route?.params?.veichle);
  // latitude
  // "imageName": "1_123_test_Front", "imei": "866907050822278", "inTrip": 0, "ioTBattery": "75", "ioTSimNumber": "12345678", "latitude": 25.3168768, "longitude": 51.4805984, "name": "Hilux Testing 2", "odometer": null, "price": 1, "speedLimit": 100, "status": 1, "totalKm": "250", "updatedAt": null}

  return (
    <VStack
      flex={1}
      position="relative"
      justifyContent="space-between"
      h="full"
      w="full"
      collapsable={false}
    >
      <VStack flex="1" collapsable={false}>
        <MapscreenComp type={carType} setType={(t) => setCarType(t)} />
        <MapBox />
      </VStack>
    </VStack>
  );
}

export default React.memo(ActualMap);
