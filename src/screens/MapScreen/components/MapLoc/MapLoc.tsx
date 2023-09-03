import React from "react";
import { AnimatedRegion, Marker, MarkerAnimated } from "react-native-maps";
import { IVeichle } from "../../MapScreen.types";
import MarkerBar from "../LocationMarker/LocationMarker";
import Animated from "react-native-reanimated";

function MapLoc({ car, onPress }: { car: IVeichle; onPress?: () => void }) {
    const getAnimatedMarker = () => {
        return new AnimatedRegion({
            latitude: car.latitude,
            longitude: car.longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.01,
        });
    };
    return (
        <Marker.Animated
            onPress={onPress}
            coordinate={getAnimatedMarker()}
            tracksViewChanges={false}
        >
            <MarkerBar {...car} />
        </Marker.Animated>
    );
}

export default React.memo(MapLoc);
