import { createSlice } from "@reduxjs/toolkit";
import {
  ICarState,
  ISetNearestCarsAction,
  ISetSelectedVeichleTypeAction,
} from "./carsSlice.types";

const initialState: ICarState = {
  nearestCars: [],
  selectedVeichleType: null,
  speed: 0,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setNearestCars: (state: ICarState, action: ISetNearestCarsAction) => {
      action?.payload?.forEach((car) => {
        const isAlreadyInState = state.nearestCars.findIndex(
          (c) => c.id === car.id
        );
        if (isAlreadyInState === -1) {
          state.nearestCars.push(car);
        } else {
          if (state.nearestCars[isAlreadyInState].latitude !== car.latitude) {
            state.nearestCars[isAlreadyInState].latitude = car.latitude;
          }
          if (state.nearestCars[isAlreadyInState].longitude !== car.longitude) {
            state.nearestCars[isAlreadyInState].longitude = car.longitude;
          }
        }
      });
    },
    setSelectedVeichleType: (
      state: ICarState,
      action: ISetSelectedVeichleTypeAction
    ) => {
      state.selectedVeichleType = action.payload;
    },
    setCurrentSpeed: (
      state: ICarState,
      action: {
        payload: number;
      }
    ) => {
      state.speed = action.payload;
    },
  },
});

const carsReducer = carsSlice.reducer;
export default carsReducer;
export const { setNearestCars, setSelectedVeichleType, setCurrentSpeed } =
  carsSlice.actions;
export const selectNearestCars = (state: any) => state.cars.nearestCars;
export const selectSelectedVeichleType = (state: any) =>
  state.cars.selectedVeichleType;

export const selectCurrentSpeed = (state: any) => state.cars.speed;
