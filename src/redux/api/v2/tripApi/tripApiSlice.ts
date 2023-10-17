import getAddressFromLatLng from "@utils/getAddressFromLatLng";
import { apiSliceV2 } from "../apiSlice";
import { ICarCommands } from "./tripApiSlice.types";
import {
  IEndCarTrip,
  IRequestStartCarTrip,
  IStartCarTrip,
  IStartCarTripOtpType,
  IUploadCarImages,
  IValidateCarTripRequest,
} from "./tripApiSlice.types";

export const tripApiSlice = apiSliceV2.injectEndpoints({
  endpoints: (builder) => ({
    uploadCarImage: builder.mutation({
      query: (body: IUploadCarImages) => ({
        url: "CarTrip/UploadCarImages",
        method: "POST",
        body,
      }),
    }),
    validateCarTripRequest: builder.mutation({
      query: (body: IValidateCarTripRequest) => ({
        url: "CarTrip/ValidateCarTripRequest",
        method: "POST",
        body,
      }),
    }),
    requestStartCarTrip: builder.mutation({
      query: (body: IRequestStartCarTrip) => ({
        url: "CarTrip/RequestStartCarTrip",
        method: "POST",
        body,
      }),
    }),
    startCarTrip: builder.mutation({
      query: (body: IStartCarTrip) => ({
        url: "CarTrip/StartCarTrip",
        method: "POST",
        body,
      }),
      invalidatesTags: ["getTripStatus"],
    }),
    endCarTrip: builder.mutation({
      query: (body: IEndCarTrip) => ({
        url: "CarTrip/EndCarTrip",
        method: "POST",
        body,
      }),
      invalidatesTags: ["getTripStatus"],
    }),
    sendCarTripOtpType: builder.mutation({
      query: (body: IStartCarTripOtpType) => ({
        url:
          body.type === "email"
            ? "CarTrip/RequestStartCarTripEmailOTP"
            : "CarTrip/RequestStartCarTripWhatsAppOTP",
        method: "POST",
        body,
      }),
    }),
    lockUnlock: builder.mutation({
      query: (body: { lock: boolean; tripToken: string }) => ({
        url: "CarTrip/LockUnLockCarTrip",
        method: "POST",
        body,
      }),
    }),
    executeCarCommand: builder.mutation({
      query: (body: ICarCommands) => ({
        url: "CarTrip/CommandStatusCarTrip",
        method: "POST",
        body,
      }),
    }),
    checkIsCarTripActive: builder.query({
      query: () => ({
        url: "CarTrip/TripStatus",
        method: "GET",
      }),
      providesTags: ["getTripStatus"],
    }),
    getTripInvoice: builder.query({
      query: (tripId) => ({
        url: `CarTrip/GetTripInvoice?TripId=39734`,
        method: "GET",
      }),
    }),
    getAllCarTrips: builder.query({
      query: () => ({
        url: `CarTrip/GetAllTrips?PageNumber=${1}&PageSize=${15}`,
        method: "GET",
      }),
      transformResponse: async (response: any) => {
        if (response?.data && response?.succeeded) {
          const { data } = response;
          const { items } = data;
          const newItems = [];
          for (let i = 0; i < items.length; i++) {
            const startLatitude = items[i].startLatitude;
            const startLongitude = items[i].startLongitude;
            const endLatitude = items[i].endLatitude ?? startLatitude;
            const endLongitude = items[i].endLongitude ?? startLongitude;
            const startAddress = await getAddressFromLatLng(
              startLatitude,
              startLongitude
            );
            const endAddress = await getAddressFromLatLng(
              endLatitude,
              endLongitude
            );
            const type = items[i].type;
            newItems.push({
              _id: items[i].id,
              starting: {
                locationName: startAddress,
                time: items[i].tripStartTime,
              },
              destination: {
                locationName: endAddress,
                time: items[i].tripEndTime ?? items[i].tripStartTime,
              },
              duration: items[i].totalTripTime ?? 0,
              distance: items[i].totalKM ?? 0,
              fair: items[i].price ?? 0,
              type,
            });
          }

          return {
            ...response,
            data: {
              ...data,
              items: newItems,
            },
          };
        }
        return response;
      },
    }),
    geMoreCarTrips: builder.query({
      query: ({
        pageNumber = 1,
        pageSize = 10,
      }: {
        pageNumber?: number;
        pageSize?: number;
      }) => ({
        url: `CarTrip/GetAllTrips?PageNumber=${pageNumber}&PageSize=${pageSize}`,
        method: "GET",
      }),
      transformResponse: async (response: any) => {
        if (response?.data && response?.succeeded) {
          const { data } = response;
          const { items } = data;
          const newItems = [];
          for (let i = 0; i < items.length; i++) {
            const startLatitude = items[i].startLatitude;
            const startLongitude = items[i].startLongitude;
            const endLatitude = items[i].endLatitude ?? startLatitude;
            const endLongitude = items[i].endLongitude ?? startLongitude;
            const startAddress = await getAddressFromLatLng(
              startLatitude,
              startLongitude
            );
            const endAddress = await getAddressFromLatLng(
              endLatitude,
              endLongitude
            );
            const type = items[i].type;
            newItems.push({
              _id: items[i].id,
              starting: {
                locationName: startAddress,
                time: items[i].tripStartTime,
              },
              destination: {
                locationName: endAddress,
                time: items[i].tripEndTime ?? items[i].tripStartTime,
              },
              duration: items[i].totalTripTime ?? 0,
              distance: items[i].totalKM ?? 0,
              fair: items[i].price ?? 0,
              type,
            });
          }

          return {
            ...response,
            data: {
              ...data,
              items: newItems,
            },
          };
        }
        return response;
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          console.log({ arg });
          const result = await queryFulfilled;

          dispatch(
            tripApiSlice.util.updateQueryData(
              "getAllCarTrips",
              undefined,
              (draft) => {
                console.log({ draft });
                draft.data = {
                  ...draft.data,
                  items: [...draft.data.items, ...result?.data?.data?.items],
                  hasNextPage: result?.data?.data?.hasNextPage,
                  hasPreviousPage: result?.data?.data?.hasPreviousPage,
                  pageIndex: result?.data?.data?.pageIndex,
                  totalCount: result?.data?.data?.totalCount,
                  totalPages: result?.data?.data?.totalPages,
                };
              }
            )
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),

  overrideExisting: true,
});

export const {
  useUploadCarImageMutation,
  useRequestStartCarTripMutation,
  useValidateCarTripRequestMutation,
  useStartCarTripMutation,
  useEndCarTripMutation,
  useSendCarTripOtpTypeMutation,
  useLockUnlockMutation,
  useExecuteCarCommandMutation,
  useCheckIsCarTripActiveQuery,
  useGetAllCarTripsQuery,
  useGeMoreCarTripsQuery,
  useGetTripInvoiceQuery,
} = tripApiSlice;
