import {
    ITemperatur,
    UIState,
    ICurrentModal,
    ModalTypes,
} from "./uiSlice.types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

const initialState: UIState = {
    loading: false,
    startOrEndRide: undefined,
    temperatur: undefined,
    currentModal: undefined,
    showCurrentModal: false,
    sowVerifyModal: false,
};

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setStartOrEndRide: (
            state,
            action: {
                payload: "start" | "end";
            }
        ) => {
            state.startOrEndRide = action.payload;
        },
        setTemperature: (
            state,
            action: {
                payload: ITemperatur;
            }
        ) => {
            state.temperatur = action.payload;
        },
        setCurrentModal: (
            state,
            action: {
                payload: {
                    name: ModalTypes;
                    props?: {
                        title: string;
                        message: string;
                    };
                };
            }
        ) => {
            state.currentModal = action.payload;
            state.showCurrentModal = true;
        },
        hideCurrentModal: (state) => {
            state.showCurrentModal = false;
            state.currentModal = undefined;
        },
        setVerifyModal: (state, action) => {
            state.sowVerifyModal = action.payload;
        },
    },
});

export const {
    setLoading,
    setStartOrEndRide,
    setTemperature,
    setCurrentModal,
    hideCurrentModal,
    setVerifyModal,
} = uiSlice.actions;
export const selectStartOrEndRide = (state: RootState) =>
    state.ui.startOrEndRide;
export const selectCurrentModal = (state: RootState) => state.ui.currentModal;

export const isCurrentModalOpen = (state: RootState) =>
    state.ui.showCurrentModal;

export const selectLoading = (state: RootState) => state.ui.loading;
export const selectTemperature = (state: RootState) => state.ui.temperatur;

export const selectVerifyModal = (state: RootState) => state.ui.sowVerifyModal;
export default uiSlice.reducer;
