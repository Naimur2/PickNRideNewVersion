import { setNearestCars } from "@store/features/cars/carsSlice";
import { apiSlice } from "../apiSlice";
import { IGetNearestCars, INumberPlate } from "./carApiSlice.types";

const carApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNearestCarsApi: builder.query({
      query: (body: IGetNearestCars) => ({
        url: `Cars/AllNearestCars?PageNumber=${body.pageNumber}&PageSize=${body.pageSize}&Latitude=${body.latitude}&Longitude=${body.longitude}`,
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        console.log({ arg });
        try {
          const result = await queryFulfilled;
          const { data } = result;
          const cars = data?.data?.items;
          dispatch(setNearestCars(cars));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getCarsCategoryApi: builder.query({
      query: () => ({
        url: `Cars/GetCarsInCategory`,
        method: "GET",
      }),
      //   async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //     console.log({ arg });
      //     try {
      //       const result = await queryFulfilled;
      //       const { data } = result;
      //       const cars = data?.data?.items;
      //       dispatch(setNearestCars(cars));
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   },
    }),
    checkCarsNamePlate: builder.query({
      query: (body: INumberPlate) => ({
        url: "Cars/CheckCarNumberPlate",
        method: "POST",
        body: body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetNearestCarsApiQuery,
  useCheckCarsNamePlateQuery,
  useGetCarsCategoryApiQuery,
} = carApiSlice;
