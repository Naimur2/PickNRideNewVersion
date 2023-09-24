import { apiSlice } from "../apiSlice";

const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGetAllNotificationsApi: builder.query({
      query: () => ({
        url: `Notification/GetAllNotifications`,
        method: "GET",
      }),
    }),
    getGetCustomerNotificationsApi: builder.query({
      query: () => ({
        url: `Notification/GetCustomerNotifications`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetGetAllNotificationsApiQuery,
  useGetGetCustomerNotificationsApiQuery,
} = notificationApi;
