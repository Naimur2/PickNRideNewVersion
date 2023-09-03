import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, VStack } from "native-base";
import React, { useState } from "react";

import { Alert, useWindowDimensions } from "react-native";

import GradientBtn from "@components/GradientBtn/GradientBtn";
import OtpInput from "@components/OtpInput/OtpInput";
import useShowModal from "@hooks/useShowModal";
import { IRegisterProps } from "@screens/auth-screens/Register/SignUpInputForm/SignUpInputForm.types";
import {
    useOtpVerifyApiMutation,
    useResendOtpApiMutation,
} from "@store/api/auth/authApi/authApiSlice";
import { IOtpVerify } from "@store/api/auth/authApi/authApiSlice.types";
import { fontSizes } from "@theme/typography";
import { useDispatch } from "react-redux";
import ResetOtp from "./ResendOtp";

export default function OtpForm() {
    const navigation = useNavigation();
    const routeParams = useRoute().params as IRegisterProps;
    const [verifyOtp, otpResult] = useOtpVerifyApiMutation();
    const [resendOtp, resendOtpResult] = useResendOtpApiMutation();
    const dispatch = useDispatch();
    const showModal = useShowModal();

    const [startTimer, setStartTimer] = useState(false);

    React.useEffect(() => {
        if (
            otpResult.data?.status === 400 ||
            otpResult.data?.status === 500 ||
            otpResult.isError
        ) {
            showModal("error", {
                title: "Error",
                message: otpResult.data?.message || "Something went wrong",
            });
        }
        if (
            resendOtpResult.data?.status === 400 ||
            resendOtpResult.data?.status === 500 ||
            resendOtpResult.isError
        ) {
            showModal("error", {
                title: "Error",
                message:
                    resendOtpResult.data?.message || "Something went wrong",
            });
        }
    }, [otpResult.data, resendOtpResult.data]);

    const { width } = useWindowDimensions();

    const [otp, setOtp] = useState("");

    const OTP = otp;

    const submitOtpHander = async () => {
        if (OTP.length < 4 && typeof OTP !== "number") {
            Alert.alert("Invalid OTP", "Please enter a valid OTP");

            return;
        }
        const submitFromData: IOtpVerify = {
            dialing_code: routeParams?.dialing_code,
            phone: routeParams?.phone,
            otp: OTP,
        };

        try {
            const data = await verifyOtp(submitFromData).unwrap();
            console.log(data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        setStartTimer(true);
    }, []);

    // Resend Otp api call
    const handelResendOtp = async () => {
        const resendOtpData = {
            dialing_code: routeParams?.dialing_code,
            phone: routeParams?.phone,
        };
        setOtp("");
        setStartTimer(true);
        await resendOtp(resendOtpData);
    };

    return (
        <VStack flex="1" px={4} space="3" alignItems={"center"}>
            <Text
                fontSize={fontSizes.md}
                color="primary.200"
                mt={Math.round(width / 2.5)}
                mx="auto"
                fontWeight={700}
                maxW={220}
                textAlign={"center"}
            >
                Verify your number with codes sent to you
            </Text>

            <OtpInput numInputs={6} setOtp={setOtp} />

            <ResetOtp
                onResend={handelResendOtp}
                startTimer={startTimer}
                setStartTimer={(val) => setStartTimer(val)}
            />

            <GradientBtn
                disabled={
                    OTP.length !== 6 ||
                    otpResult.isLoading ||
                    resendOtpResult.isLoading
                }
                mt={10}
                onPress={submitOtpHander}
                title={"Submit"}
            />
        </VStack>
    );
}
