import { useNavigation } from "@react-navigation/native";
import {
  selectCurrentRegion,
  selectInitialLocation,
} from "@store/features/user-location/userLocationSlice";
import { Center, Factory, VStack, Box } from "native-base";
import React, {
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { Dimensions, Keyboard } from "react-native";
import MapView, { AnimatedRegion, Marker, Region } from "react-native-maps";
import { useSelector } from "react-redux";
import { ILatLng } from "../../MapScreen.types";
import AllMarkers from "../AllMarker/AllMarker";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import config from "@config";

export interface IMapScreenProps {
  children?: any;
}
const { height, width } = Dimensions.get("window");

function MapBox({ veichle }, ref) {
  const Map = Factory(MapView);
  const mapRef = React.useRef<MapView>(null);
  const navigation = useNavigation();
  const initialRegion = useSelector(selectInitialLocation) as Region;
  const [initialCarLocation, setInitialCarLocation] = useState(undefined);

  useEffect(() => {
    setInitialCarLocation(initialRegion);
  }, [initialRegion]);

  //
  const location = useMemo(() => {
    return initialCarLocation;
  }, [initialCarLocation]);
  //
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

  //
  // const origin = [
  //   {
  //     latitude: veichle.latitude,
  //     longitude: veichle.longitude,
  //   },
  //   {
  //     latitude: currentLocation.latitude,
  //     longitude: currentLocation.longitude,
  //   },
  // ];
  const locateToCurrentlocation = async () => {
    const cLocation = await Location.getCurrentPositionAsync();
    mapRef.current?.animateToRegion(
      {
        ...initialRegion,
        latitude: cLocation?.coords?.latitude,
        longitude: cLocation?.coords?.longitude,
      },
      300
    );
  };

  useImperativeHandle(ref, () => ({
    locateToCurrentlocation,
  }));

  return (
    <Map
      ref={mapRef}
      initialRegion={location}
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
      {/* dei */}
      {/* <MapViewDirections
        origin={origin[0]}
        destination={origin[1]}
        apikey={config.MAP_KEY}
      /> */}
    </Map>
  );
}

export default React.memo(React.forwardRef(MapBox));
