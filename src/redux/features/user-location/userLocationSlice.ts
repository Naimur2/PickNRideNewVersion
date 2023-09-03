import { IUserLocationState } from "./userLocationSlice.types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState: IUserLocationState = {
    currentLocation: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.009,
        longitudeDelta: 0.01,
    },
    initialLocation: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.009,
        longitudeDelta: 0.01,
    },
    hasBackgroundLocationPermission: false,
    hasForegroundLocationPermission: false,
};

export const userLocationSlice = createSlice({
    name: "userLocation",
    initialState,
    reducers: {
        setCurrentLocation: (state, action) => {
            state.currentLocation = {
                latitude: action.payload?.latitude,
                longitude: action.payload?.longitude,
                latitudeDelta: 0.009,
                longitudeDelta: 0.01,
            };
        },
        setInitialLocation: (state, action) => {
            console.log("action.payload", action.payload);
            state.initialLocation = {
                latitude: action.payload?.latitude,
                longitude: action.payload?.longitude,
                latitudeDelta: 0.009,
                longitudeDelta: 0.01,
            };
        },
        setHasBackgroundLocationPermission: (state, action) => {
            state.hasBackgroundLocationPermission = action.payload;
        },
        setHasForegroundLocationPermission: (state, action) => {
            state.hasForegroundLocationPermission = action.payload;
        },
    },
});

export const selectInitialLocation = (state: RootState) =>
    state.userLocation.initialLocation;
export const selectHasBackgroundLocationPermission = (state: RootState) =>
    state.userLocation.hasBackgroundLocationPermission;
export const selectHasForegroundLocationPermission = (state: RootState) =>
    state.userLocation.hasForegroundLocationPermission;

export const selectCurrentRegion = (state: RootState) =>
    state.userLocation.currentLocation;

const userLocationReducer = userLocationSlice.reducer;

export const {
    setCurrentLocation,
    setInitialLocation,
    setHasBackgroundLocationPermission,
    setHasForegroundLocationPermission,
} = userLocationSlice.actions;

export default userLocationReducer;
