import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@config";

import { setLoading } from "@store/features/ui/uiSlice";
import { RootState, store } from "@store/store";
import createFormFile from "@utils/fileDetails";
import { logout } from "@store/features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: config.API_V2,
    credentials: "include",
    prepareHeaders: (headers: Headers, { getState }) => {
        const state = getState() as RootState;
        const authState = state?.auth;

        if (authState?.token) {
            headers.set("Authorization", `Bearer ${authState.token}`);
            headers.set("Pick&Ride-Token", `${authState.token}`);
            headers.set("token", `${authState.token}`);
        }
        return headers;
    },
});

const loadingBaseQuery: any = async (
    args: any,
    api: any,
    extraOptions: any
) => {
    console.log({ args });
    console.log({ api });
    const { dispatch } = api;

    console.log(api.endpointName);
    let showLoader = true;

    if (
        api.endpointName !== "getNearestCarsApi" ||
        api.endpointName !== "getWeather"
    ) {
        showLoader = false;
    }

    dispatch(setLoading(showLoader));

    const result = await baseQuery(args, api, extraOptions);
    if (result?.["data"]?.["error"]?.["code"] === 401) {
        store.dispatch(logout());
    }
    dispatch(setLoading(false));
    return result;
};

export const apiSliceV2 = createApi({
    reducerPath: "apiSliceV2",
    baseQuery: loadingBaseQuery,
    endpoints: (builder) => ({}),
    tagTypes: ["startCarTrip", "getTripStatus"],
});
