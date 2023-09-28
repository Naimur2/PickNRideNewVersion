import { useNavigation } from "@react-navigation/native";
import {
  selectCurrentRegion,
  selectInitialLocation,
} from "@store/features/user-location/userLocationSlice";
import { Center, Factory, VStack, Box } from "native-base";
import React from "react";
import { Dimensions, Keyboard } from "react-native";
import MapView, {
  AnimatedRegion,
  Marker,
  MarkerAnimated,
  Region,
} from "react-native-maps";
import { useSelector } from "react-redux";
import { ILatLng } from "../../MapScreen.types";
import AllMarkers from "../AllMarker/AllMarker";
import { RootState } from "@store/store";
import Animated from "react-native-reanimated";

export interface IMapScreenProps {
  children?: any;
}
const { height, width } = Dimensions.get("window");

function MapBox() {
  const Map = Factory(MapView);
  const mapRef = React.useRef<MapView>(null);
  const navigation = useNavigation();

  const initialRegion = useSelector(selectInitialLocation) as Region;

  const currentLocation = useSelector(selectCurrentRegion) as ILatLng;

  const fitToCoordinatesHandler = (coordinates: ILatLng[]) => {
    if (mapRef.current) {
      mapRef.current.fitToSuppliedMarkers(coordinates, {
        edgePadding: {
          right: (width / 20) * 1.2,
          left: (width / 20) * 1.2,
          top: (height / 20) * 1.2,
          bottom: (height / 20) * 1.2,
        },
      });

      mapRef.current.animateToRegion(initialRegion, 300);
    }
  };

  React.useEffect(() => {
    mapRef.current?.animateToRegion(initialRegion, 300);
  }, [navigation]);

  React.useEffect(() => {
    if (currentLocation.latitude && currentLocation.longitude) {
      fitToCoordinatesHandler([currentLocation]);
    }
  }, [currentLocation]);

  const getAnimatedMarker = () => {
    return new AnimatedRegion({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      latitudeDelta: 0.009,
      longitudeDelta: 0.01,
    });
  };

  // console.log("currentLocation", currentLocation);

  return (
    <Map
      ref={mapRef}
      initialRegion={initialRegion}
      flex={1}
      // provider={PROVIDER_GOOGLE}
      w={width}
      h={height}
      onPress={() => Keyboard.dismiss()}
    >
      {currentLocation.latitude && currentLocation.longitude ? (
        <Marker.Animated
          coordinate={getAnimatedMarker()}
          tracksViewChanges={false}
        >
          <Center h={6} w={6} rounded={"full"} bg="#866aad50">
            <Box h={4} w={4} rounded={"full"} bg="#866aad"></Box>
          </Center>
        </Marker.Animated>
      ) : (
        <></>
      )}
      <AllMarkers />
    </Map>
  );
}

export default React.memo(React.forwardRef(MapBox));
