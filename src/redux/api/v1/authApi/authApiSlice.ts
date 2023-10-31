import { apiSlice } from "../apiSlice";

import {
    login,
    setCheckOtherInformation,
} from "@store/features/auth/authSlice";
import { IAuthState } from "@store/features/auth/authSlice.types";
import {
    IAddCard,
    ILoginProps,
    IOtpVerify,
    IUpdateResidency,
    TResendOtp,
} from "./authApiSlice.types";
import createFormFile from "@utils/fileDetails";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginApi: builder.mutation({
            query: (body: ILoginProps) => {
                return {
                    url: "Customer/SignIn",
                    method: "POST",
                    body: {
                        phoneCode: body.dialing_code,
                        mobileNo: body.phone,
                        password: body.password,
                    },
                };
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    console.log("arg", arg);
                    const result = await queryFulfilled;
                    const { data } = result;
                    console.log("result-->", result);
                    console.log("data--data -->", data?.data);

                    dispatch(login(data.data));
                } catch (error) {}
            },
        }),
        registerApi: builder.mutation({
            query: (body) => ({
                url: "sign_up",
                method: "POST",
                body: body,
            }),
        }),
        otpVerifyApi: builder.mutation({
            query: (body: IOtpVerify) => ({
                url: "otp_verify",
                method: "POST",
                body: body,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    const { data } = result;

                    const dispatchData = data.data as IAuthState;

                    if (
                        dispatchData?.resident_status === "0" &&
                        dispatchData?.userdocuments_status === "0"
                    ) {
                        const dataInfo = {
                            ...dispatchData,
                            checkOtherInformation: true,
                        };
                        dispatch(login(dataInfo));
                    } else {
                        dispatch(login(dispatchData));
                    }
                } catch (error) {}
            },
        }),
        resendOtpApi: builder.mutation({
            query: (body: TResendOtp) => ({
                url: "resend_otp",
                method: "POST",
                body: body,
            }),
        }),
        addCardsApi: builder.mutation({
            query: (body: IAddCard) => ({
                url: "addCards",
                method: "POST",
                body: body,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;

                    dispatch(setCheckOtherInformation(false));
                } catch (error) {}
            },
        }),
        updateResidencyApi: builder.mutation({
            query: (body: IUpdateResidency) => ({
                url: "updateResidency",
                method: "PUT",
                body: body,
            }),
        }),
        forgotPasswordByWhatsApp: builder.mutation({
            query: (body: { mobileNo: string; phoneCode: string }) => ({
                url: "Customer/ForgotPasswordByWhatsApp",
                method: "POST",
                body: body,
            }),
        }),
        forgotPasswordByEmail: builder.mutation({
            query: (body: { emailId: string }) => ({
                url: "Customer/ForgotPasswordByEmail",
                method: "POST",
                body: body,
            }),
        }),
        verifyForgotPasswordOtpWhatsapp: builder.mutation({
            query: (body: {
                mobileNo: string;
                phoneCode: string;
                otp: string;
            }) => ({
                url: "Customer/VerifyForgotPasswordByWhatsAppOTP",
                method: "POST",
                body: body,
            }),
        }),
        verifyForgotPasswordOtpEmail: builder.mutation({
            query: (body: { email: string; otp: string }) => ({
                url: "Customer/VerifyForgotPasswordByEmailOTP",
                method: "POST",
                body: body,
            }),
        }),
        changePassword: builder.mutation({
            query: (body: {
                currentPassword: string;
                newPassword: string;
                confirmNewPassword: string;
            }) => ({
                url: "Customer/ChangePassword",
                method: "POST",
                body: body,
            }),
        }),
        updateUserProfile: builder.mutation({
            query: (data: {
                photo: string;
                firstName: string;
                lastName: string;
                email?: string;
                phone?: string;
                qid?: string;
                dob?: string;
                dialing_code?: string;
            }) => {
                const formData = new FormData();
                formData.append("Photo", createFormFile(data.photo, "image"));
                formData.append("FirstName", data.firstName);
                formData.append("Lastname", data.lastName);

                return {
                    url: "Customer/UpdateCustomerProfile",
                    method: "PUT",
                    body: formData,
                };
            },
        }),
    }),
    overrideExisting: true,
});

export const {
    useLoginApiMutation,
    useRegisterApiMutation,
    useOtpVerifyApiMutation,
    useResendOtpApiMutation,
    useAddCardsApiMutation,
    useUpdateResidencyApiMutation,
    useForgotPasswordByWhatsAppMutation,
    useForgotPasswordByEmailMutation,
    useVerifyForgotPasswordOtpWhatsappMutation,
    useVerifyForgotPasswordOtpEmailMutation,
    useChangePasswordMutation,
    useUpdateUserProfileMutation,
} = authApiSlice;
