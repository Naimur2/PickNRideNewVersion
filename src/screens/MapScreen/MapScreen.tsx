import { VStack } from "native-base";
import React, { useRef } from "react";
import { ICAR } from "./MapScreen.types";
import MapBox, { IMapScreenProps } from "./components/MapBox/MapBox";
import { SheetManager } from "react-native-actions-sheet";
import MapscreenComp, {
  IMapTopDetailsProps,
} from "./components/MapScreenComp/MapscreenComp";

interface IMapProps extends IMapScreenProps, IMapTopDetailsProps {}

function ActualMap({ route }: any) {
  const mapRef = useRef();
  const [carType, setCarType] = React.useState<ICAR>("scooter");
  const veichle = route?.params?.veichle || {};

  const handleLocate = async () => {
    //
    if (mapRef?.current) {
      await mapRef?.current?.locateToCurrentlocation();
    }
  };

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
        <MapscreenComp
          handleLocate={handleLocate}
          type={carType}
          setType={(t) => setCarType(t)}
        />
        <MapBox ref={mapRef} veichle={veichle} />
      </VStack>
    </VStack>
  );
}

export default React.memo(ActualMap);
