import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@config";

import { setLoading } from "@store/features/ui/uiSlice";
import { RootState, store } from "@store/store";
import { logout } from "@store/features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: config.API_AUTH,
    credentials: "include",
    prepareHeaders: (headers: Headers, { getState }) => {
        const state = getState() as RootState;
        const authState = state?.auth;

        const authToken = authState?.token || "gfhghf";

        if (authState?.token) {
            headers.set("Authorization", `Bearer ${authToken}`);
            headers.set("Pick&Ride-Token", `${authToken}`);
            headers.set("token", `${authToken}`);
        }
        return headers;
    },
});

const loadingBaseQuery = async (args: any, api: any, extraOptions: any) => {
    const { dispatch } = api;
    dispatch(setLoading(true));
    const result = await baseQuery(args, api, extraOptions);

    if (result.meta.response.status === 401) {
        store.dispatch(logout());
    }
    dispatch(setLoading(false));
    return result;
};

export const authApiV1 = createApi({
    reducerPath: "apiSliceVersion1",
    baseQuery: loadingBaseQuery,
    endpoints: (builder) => ({}),
});
