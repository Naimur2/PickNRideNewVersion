import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { apiSlice } from "./api/v1/apiSlice";
import { apiSliceV2 } from "./api/v2/apiSlice";
import authReducer from "./features/auth/authSlice";
import carTripReducer from "./features/car-trip/carTripSlice";
import carsReducer from "./features/cars/carsSlice";
import documentReducer from "./features/document/documentSlice";
import uiReducer from "./features/ui/uiSlice";
import userLocationReducer from "./features/user-location/userLocationSlice";
import { mapsApiSlice } from "./api/v3/mapsApiSlice";
import { authApiV1 } from "./api/auth/apiSlice";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem"; // for more storage  in to AsyncStorage

const persistConfig = {
    key: "root",
    storage: ExpoFileSystemStorage, //  AsyncStorage remove add new
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedCarTripReducer = persistReducer(persistConfig, carTripReducer);

const reducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiSliceV2.reducerPath]: apiSliceV2.reducer,
    [mapsApiSlice.reducerPath]: mapsApiSlice.reducer,
    [authApiV1.reducerPath]: authApiV1.reducer,
    auth: persistedAuthReducer,
    ui: uiReducer,
    cars: carsReducer,
    document: documentReducer,
    userLocation: userLocationReducer,
    carTrip: persistedCarTripReducer,
});

export const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(apiSlice.middleware)
            .concat(apiSliceV2.middleware)
            .concat(mapsApiSlice.middleware)
            .concat(authApiV1.middleware),
    devTools: false,
});

export const persistor = persistStore(store);

export const selectAuth = (state: RootState) => state.auth;
export const selectLoading = (state: RootState) => state.ui.loading;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
