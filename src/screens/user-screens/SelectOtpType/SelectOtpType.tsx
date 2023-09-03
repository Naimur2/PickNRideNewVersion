import ImageBg from "@components/ImageBg/ImageBg";
import Scroller from "@components/Scroller/Scroller";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSendCarTripOtpTypeMutation } from "@store/api/v2/tripApi/tripApiSlice";
import { fontSizes } from "@theme/typography";
import { Text, VStack, useColorMode } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import GradientBtn from "../../../components/GradientBtn/GradientBtn";
import { IStartEndTripParams } from "../StartEndRide/StartEnTrip.types";
import { Alert } from "react-native";

export default function SelectOtpType() {
    const { colorMode } = useColorMode();
    const navigation = useNavigation();
    const inset = useSafeAreaInsets();
    const [sendOtpRequest, result] = useSendCarTripOtpTypeMutation();
    const params = useRoute().params as IStartEndTripParams;

    const handleOtpViaEmail = async () => {
        if (!params.data.tripToken) return alert("tripToken is undefined");
        const res = await sendOtpRequest({
            tripToken: params.data.tripToken,
            type: "email",
        }).unwrap();

        if (res.data?.otp) {
            navigation.navigate("TripOtpScreen", {
                ...params,
                otpData: res.data,
            });
        }
    };
    const handleOtpViaWhatsapp = async () => {
        if (!params.data.tripToken) return alert("tripToken is undefined");
        const res = await sendOtpRequest({
            tripToken: params.data.tripToken,
            type: "sms",
        }).unwrap();

        if (res?.error?.message) {
            Alert.alert("Error", res?.error?.message, [
                {
                    text: "OK",
                    onPress: () => {},
                },
            ]);
        } else {
            if (res?.succeeded && res.data?.otp) {
                navigation.navigate("TripOtpScreen", {
                    ...params,
                    otpData: res.data,
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
    };

    return (
        <ImageBg type={colorMode}>
            <Scroller
                contentStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 30,
                    paddingTop: inset.top + 20,
                    paddingBottom: 20,
                }}
            >
                <VStack mt={10} alignItems={"center"} space="4">
                    <Text
                        mt={scale(30) + "px"}
                        color="primary.200"
                        fontSize={fontSizes.md}
                        fontWeight="bold"
                    >
                        Request OTP
                    </Text>
                    <Text
                        color="gray.100"
                        fontSize={scale(13) + "px"}
                        fontWeight="500"
                        w={scale(170) + "px"}
                        textAlign={"center"}
                        _dark={{
                            color: "light.200",
                        }}
                    >
                        Select method to receive OTP
                    </Text>
                </VStack>

                <VStack
                    space="4"
                    alignItems={"center"}
                    justifyContent={"center"}
                    mt={scale(80) + "px"}
                >
                    <GradientBtn
                        onPress={handleOtpViaEmail}
                        title="OTP via Email"
                        disabled={result.isLoading}
                    />
                    <GradientBtn
                        onPress={handleOtpViaWhatsapp}
                        title="OTP via Whatsapp"
                        disabled={result.isLoading}
                    />
                </VStack>
            </Scroller>
        </ImageBg>
    );
}
