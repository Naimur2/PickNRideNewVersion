import GradientBtn from "@components/GradientBtn/GradientBtn";
import PickCountry from "@components/PickCountry/PickCountry";
import TextInput from "@components/TextInput/TextInput";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fontSizes } from "@theme/typography";
import { useFormik } from "formik";
import { FormControl, HStack, Text, Toast, VStack } from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";
import * as Yup from "yup";
import ErrorToast from "@components/ErrorToast/ErrorToast";
import ScreenWithScrollImage from "@components/ScreenWithScrollImage/ScreenWithScrollImage";
import { ISelectAuthTypeParams } from "../SelectAuthOtpType/SelectAuthOtpType.types";
import { useSelector } from "react-redux";
import { selectAuth } from "@store/store";

import {
    useForgotPasswordByEmailMutation,
    useForgotPasswordByWhatsAppMutation,
} from "@store/api/v1/authApi/authApiSlice";
import useShowModal from "@hooks/useShowModal";

export default function ForgotPassword() {
    const navigation = useNavigation();
    const showModal = useShowModal();
    const params = useRoute().params as ISelectAuthTypeParams;
    const [handleEmailQuery, { loading: emailLoading }] =
        useForgotPasswordByEmailMutation();
    const [handlePhoneQuery, { loading: phoneLoading }] =
        useForgotPasswordByWhatsAppMutation();

    const emailSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
    });

    const whatsappSchema = Yup.object().shape({
        dialing_code: Yup.string().required("Dialing code is required"),
        phone: Yup.number().required("Phone number is required"),
    });

    const emailForm = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: emailSchema,
        onSubmit: async (values) => {
            try {
                const { email } = values;
                const result = await handleEmailQuery({
                    emailId: email,
                }).unwrap();

                if (result.error) {
                    showModal("error", {
                        title: "Error",
                        message: result.error.message,
                    });
                } else {
                    navigation.navigate("ForgotPasswordOtp", {
                        validationType: "email",
                        emailId: email,
                    });
                }
            } catch (error) {
                console.log(error);
                showModal("error", {
                    title: "Error",
                    message: "Error sending OTP",
                });
            }
        },
    });

    const whatsappForm = useFormik({
        initialValues: {
            dialing_code: "+974",
            phone: "",
        },
        validationSchema: whatsappSchema,
        onSubmit: async (values) => {
            try {
                const { dialing_code, phone } = values;
                const result = await handlePhoneQuery({
                    phoneCode: dialing_code,
                    mobileNo: phone,
                }).unwrap();

                if (result.error) {
                    showModal("error", {
                        title: "Error",
                        message: result.error.message,
                    });
                } else {
                    navigation.navigate("ForgotPasswordOtp", {
                        validationType: "whatsapp",
                        phoneCode: dialing_code,
                        mobileNo: phone,
                    });
                }
            } catch (error) {
                console.log(error);
                showModal("error", {
                    title: "Error",
                    message: "Error sending OTP",
                });
            }
        },
    });

    const auth = useSelector(selectAuth);

    return (
        <ScreenWithScrollImage>
            <VStack alignItems={"center"} space="4">
                <Text
                    mt={scale(30) + "px"}
                    color="primary.200"
                    fontSize={fontSizes.md}
                    fontWeight="bold"
                >
                    {auth?.token ? "Reset Password" : "Forgot Password"}
                </Text>
                <Text
                    color="gray.100"
                    fontSize={scale(13) + "px"}
                    fontWeight="500"
                    textAlign={"center"}
                    _dark={{
                        color: "light.200",
                    }}
                >
                    Please enter your{" "}
                    {params?.validationType === "whatsapp"
                        ? "whats app number"
                        : "email address"}
                    . We will send you{" "}
                    {params?.validationType === "whatsapp"
                        ? "a verification code via whats app"
                        : "a verification code via email"}{" "}
                    to set an new password for your account.
                </Text>
            </VStack>

            {params?.validationType === "whatsapp" ? (
                <FormControl>
                    <PickCountry
                        mt={10}
                        setPhoneInfo={(phoneInfo) => {
                            whatsappForm.setFieldValue(
                                "dialing_code",
                                phoneInfo?.dialingCode
                            );
                            whatsappForm.setFieldValue(
                                "phone",
                                phoneInfo?.phoneNumber
                            );
                        }}
                    />
                </FormControl>
            ) : (
                <TextInput
                    mt={10}
                    placeholder="Email"
                    value={emailForm.values.email}
                    onChangeText={(value) =>
                        emailForm.setFieldValue("email", value)
                    }
                    onBlur={emailForm.handleBlur("email")}
                    error={emailForm.touched.email && emailForm.errors.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            )}

            <GradientBtn
                gradientStyle={{ maxWidth: 250 }}
                title={"Send Code"}
                mx={"auto"}
                mt={4}
                onPress={() => {
                    if (params?.validationType === "whatsapp") {
                        whatsappForm.handleSubmit();
                    } else {
                        emailForm.handleSubmit();
                    }
                }}
            />

            {/* <HStack
                my={10}
                alignItems={"center"}
                justifyContent="center"
                space={2}
            >
                <Text
                    color={"gray.100"}
                    fontWeight={500}
                    fontSize={scale(13) + "px"}
                    _dark={{
                        color: "light.100",
                    }}
                >
                    Need an account?
                </Text>
                <Text
                    onPress={() => navigation.navigate("Register")}
                    color={"gray.200"}
                    fontWeight={500}
                    fontSize={scale(13) + "px"}
                    _dark={{
                        color: "light.100",
                    }}
                >
                    Sign Up
                </Text>
            </HStack> */}
        </ScreenWithScrollImage>
    );
}
