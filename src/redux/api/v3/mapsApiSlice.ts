import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setLoading } from "@store/features/ui/uiSlice";
import Constants from "expo-constants";
import { ILatLng } from "../../../screens/MapScreen/MapScreen.types";
import config from "@config";
const constants = Constants?.manifest?.extra as { [key: string]: any };

const baseQuery = fetchBaseQuery({
    baseUrl: config.MAPS_API,
});

const loadingBaseQuery: any = async (
    args: any,
    api: any,
    extraOptions: any
) => {
    const { dispatch } = api;
    dispatch(setLoading(true));
    const result = await baseQuery(args, api, extraOptions);
    dispatch(setLoading(false));
    return result;
};

export const mapsApiSlice = createApi({
    reducerPath: "apiSliceV3",
    baseQuery: loadingBaseQuery,
    endpoints: (builder) => ({
        getAddressByCoordinates: builder.query({
            query: (coordinates: ILatLng) => {
                console.log("coordinates", coordinates);
                return {
                    url: `geocode/json?latlng=${coordinates.latitude},${coordinates.longitude}&key=${constants?.GOOGLE_MAP_KEY}`,
                };
            },
        }),
    }),
});

export const { useGetAddressByCoordinatesQuery } = mapsApiSlice;
