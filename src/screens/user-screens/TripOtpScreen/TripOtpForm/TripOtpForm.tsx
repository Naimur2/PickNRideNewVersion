import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, Center, HStack, Input, Text, VStack } from "native-base";
import React, { useRef, useState } from "react";

import { Alert, useWindowDimensions } from "react-native";
import { scale } from "react-native-size-matters";

import GradientBtn from "@components/GradientBtn/GradientBtn";
import { useStartCarTripMutation } from "@store/api/v2/tripApi/tripApiSlice";
import { setTripInfo } from "@store/features/car-trip/carTripSlice";
import { ICarTripState } from "@store/features/car-trip/carTripSlice.types";
import { fontSizes } from "@theme/typography";
import { useDispatch } from "react-redux";
import { IStartEndTripParams } from "../../StartEndRide/StartEnTrip.types";
import OtpInput from "@components/OtpInput/OtpInput";

const inputs = Array(6).fill("");
let newInputIndex = 0;
const INPUT_WIDTH = scale(45) + "px";
const INPUT_HEIGHT = scale(50) + "px";

const INPUT_BORDER_RADIUS = 10;
const INPUT_FONT_SIZE = fontSizes.xs;

interface Iotp {
    [key: number]: string;
}

interface IResendOtpTextProps {
    onResend?: () => void;
    leftText?: string;
    rightText?: string;
}

export default function TripOtpForm() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [verifyTripOtp, result] = useStartCarTripMutation();
    const params = useRoute().params as IStartEndTripParams;

    const { width } = useWindowDimensions();

    const [otp, setOtp] = useState<string>("");

    const submitOtpHander = async () => {
        if (otp.length < 6) {
            Alert.alert("Invalid otp", "Please enter a valid OTP");
            return;
        }
        try {
            const res = await verifyTripOtp({
                otp: otp,
                tripToken: params.data.tripToken,
            }).unwrap();
            console.log("res", res);
            if (res?.error?.message) {
                Alert.alert("Error", res?.error?.message, [
                    {
                        text: "OK",
                        onPress: () => {},
                    },
                ]);
            } else {
                if (res.succeeded) {
                    const tripState: ICarTripState = {
                        tripInfo: params.data,
                        hasStartedJourney: true,
                    };
                    console.log("tripState", tripState);

                    dispatch(setTripInfo(tripState));
                    navigation.navigate("MapScreen", {
                        startTrip: true,
                    });
                } else {
                    Alert.alert("Error", "Something went wrong", [
                        {
                            text: "OK",
                            onPress: () => {},
                        },
                    ]);
                }
            }
        } catch (error) {
            alert("Invalid OTP");
        }
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

            <Center mt={5}>
                <OtpInput numInputs={6} setOtp={setOtp} />
            </Center>

            <GradientBtn
                disabled={otp.length !== 6 || result.isLoading}
                mt={10}
                onPress={submitOtpHander}
                title={"Submit"}
            />
        </VStack>
    );
}
