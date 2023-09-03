import { Region } from "react-native-maps";

export interface IUserLocationState {
    currentLocation: Region | null;
    initialLocation: Region | null;
    hasBackgroundLocationPermission: boolean;
    hasForegroundLocationPermission: boolean;
}
