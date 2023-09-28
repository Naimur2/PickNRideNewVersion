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
    putFcmToken: builder.mutation({
      query: (token) => ({
        url: "Customer/FCMToken",
        method: "PUT",
        body: {
          fcmToken: `${token}`,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetGetAllNotificationsApiQuery,
  useGetGetCustomerNotificationsApiQuery,
  usePutFcmTokenMutation,
} = notificationApi;
