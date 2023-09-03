import { apiSliceV2 } from "../apiSlice";

const authoriztionApi = apiSliceV2.injectEndpoints({
    endpoints: (builder) => ({
        checkIsAuthorized: builder.mutation({
            query: () => ({
                url: "Authorization/IsAuthorized",
            }),
        }),
        signInApi: builder.mutation({
            query: (body: {
                phoneCode: string;
                mobileNo: string;
                password: string;
            }) => ({
                url: "Authorization/SignIn",
                method: "POST",
                body: body,
            }),
        }),
        googleSignIn: builder.mutation({
            query: () => ({
                url: "Authorization/GoogleSignIn",
                method: "POST",
            }),
        }),
        appleSignIn: builder.mutation({
            query: () => ({
                url: "Authorization/AppleSignIn",
                method: "POST",
            }),
        }),
        googleSignInResponse: builder.query({
            query: () => ({
                url: "Authorization/GoogleSignInResponse",
            }),
        }),
    }),
    overrideExisting: true,
});

export const {
    useCheckIsAuthorizedMutation,
    useSignInApiMutation,
    useGoogleSignInMutation,
    useGoogleSignInResponseQuery,
    useAppleSignInMutation,
} = authoriztionApi;
