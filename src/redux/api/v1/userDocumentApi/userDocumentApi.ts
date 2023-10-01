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
  }),
  overrideExisting: true,
});

export const {
  useGetGetUserDocumentsStatusApiQuery,
  useGetEmailMobileStatusApiQuery,
} = userDocumentApi;
