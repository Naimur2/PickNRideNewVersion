import { apiSlice } from "../apiSlice";

const configApiSlice: any = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLocationApi: builder.query({
      query: () => ({
        url: "getLocation",
        method: "GET",
      }),
    }),
    getResidencyApi: builder.query({
      query: () => ({
        url: "getResidency",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetLocationApiQuery, useGetResidencyApiQuery } =
  configApiSlice;
