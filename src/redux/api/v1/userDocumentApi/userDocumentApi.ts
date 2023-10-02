import { apiSlice } from "../apiSlice";

const userDocumentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGetUserDocumentsStatusApi: builder.query({
      query: () => ({
        url: `UserDocument/GetUserDocumentsStatus`,
        method: "GET",
      }),
    }),
    getEmailMobileStatusApi: builder.query({
      query: () => ({
        url: `Customer/GetEmailMobileStatus`,
        method: "GET",
      }),
    }),

    postVerifyEmailPhoneRequest: builder.mutation({
      query: (body: any) => ({
        url: "Customer/VerifyEmailRequest",
        method: "POST",
        body: body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetGetUserDocumentsStatusApiQuery,
  useGetEmailMobileStatusApiQuery,
  usePostVerifyEmailPhoneRequestMutation,
} = userDocumentApi;
