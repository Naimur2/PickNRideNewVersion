import { VStack } from "native-base";
import React from "react";
import { ICAR } from "./MapScreen.types";
import MapBox, { IMapScreenProps } from "./components/MapBox/MapBox";
import { SheetManager } from "react-native-actions-sheet";
import MapscreenComp, {
  IMapTopDetailsProps,
} from "./components/MapScreenComp/MapscreenComp";

interface IMapProps extends IMapScreenProps, IMapTopDetailsProps {}

function ActualMap({}: IMapProps) {
  const [carType, setCarType] = React.useState<ICAR>("scooter");

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
