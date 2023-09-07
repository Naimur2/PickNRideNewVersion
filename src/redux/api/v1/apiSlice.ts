import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@config";

import { setLoading } from "@store/features/ui/uiSlice";
import { RootState } from "@store/store";

const baseQuery = fetchBaseQuery({
  baseUrl: config.API_V1,
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
  dispatch(setLoading(false));
  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: loadingBaseQuery,
  endpoints: (builder) => ({}),
});
