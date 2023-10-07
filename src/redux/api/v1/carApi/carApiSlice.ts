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
    getGetAllCarsCategoryApi: builder.query({
      query: () => ({
        url: `Cars/GetAllCarsCategory`,
        method: "GET",
      }),
    }),
    getGetCarsApi: builder.query({
      query: () => ({
        url: `Cars`,
        method: "GET",
      }),
    }),
    getGetAllCarsApi: builder.query({
      query: () => ({
        url: `Cars/AllCars`,
        method: "GET",
      }),
    }),
    getAllCarsWithCategory: builder.query({
      query: () => ({
        url: `Cars/GetAllCarsWithCategory`,
        method: "GET",
      }),
    }),
    checkCarsNamePlate: builder.query({
      query: (body: INumberPlate) => ({
        url: "Cars/CheckCarNumberPlate",
        method: "POST",
        body: body,
      }),
    }),
    getAllCarsByCategoryAndLocation: builder.query({
      query: (body) => ({
        url: `Cars/GetAllCarsByCategoryAndLocation?Latitude=${body?.latitude}&Longitude=${body?.longitude}`,
        method: "GET",
      }),
    }),
    getPricingByCarCategory: builder.query({
      query: (body) => ({
        url: `Cars/GetPricingByCarCategory`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetNearestCarsApiQuery,
  useCheckCarsNamePlateQuery,
  useGetCarsCategoryApiQuery,
  useGetGetAllCarsCategoryApiQuery,
  useGetGetAllCarsApiQuery,
  useGetAllCarsWithCategoryQuery,
  useGetGetCarsApiQuery,
  useGetAllCarsByCategoryAndLocationQuery,
  useGetPricingByCarCategoryQuery,
} = carApiSlice;
