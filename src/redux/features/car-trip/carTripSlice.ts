import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { ICarTripState } from "./carTripSlice.types";

const initialState: ICarTripState = {
    tripInfo: null,
    hasStartedJourney: false,
    isLocked: true,
    offerModalVisible: false,
};

const carTripSlice = createSlice({
    name: "carTrip",
    initialState,
    reducers: {
        setTripInfo: (state, action) => {
            state.tripInfo = action.payload;
            state.hasStartedJourney = action.payload ? true : false;
        },
        stopCarTrip: (state) => {
            state.tripInfo = null;
            state.hasStartedJourney = false;
            state.isLocked = true;
        },
        setIsLocked: (state, action) => {
            state.isLocked = action.payload;
        },
        clearCarTrip: (state) => {
            state.tripInfo = null;
            state.hasStartedJourney = false;
            state.isLocked = true;
        },
        setOfferModalVisible: (state, action) => {
            state.offerModalVisible = action.payload;
        },
    },
});

const carTripReducer = carTripSlice.reducer;
export default carTripReducer;

export const {
    setTripInfo,
    stopCarTrip,
    setIsLocked,
    clearCarTrip,
    setOfferModalVisible,
} = carTripSlice.actions;

export const selectCarTripInfo = (state: any) => state.carTrip.tripInfo;
export const selectHasStartedJourney = (state: any) =>
    state.carTrip.hasStartedJourney;
export const selectIsLocked = (state: RootState) => state.carTrip.isLocked;
export const selectOfferModalVisible = (state: RootState) =>
    state.carTrip.offerModalVisible;
