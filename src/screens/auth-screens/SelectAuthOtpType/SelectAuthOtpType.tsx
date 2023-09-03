import ImageBg from "@components/ImageBg/ImageBg";
import Scroller from "@components/Scroller/Scroller";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fontSizes } from "@theme/typography";
import { Text, VStack, useColorMode } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import GradientBtn from "@components/GradientBtn/GradientBtn";
import {
    ISelectAuthOtpTypeParams,
    ISelectAuthTypeParams,
} from "./SelectAuthOtpType.types";

export default function SelectAuthOtpType() {
    const { colorMode } = useColorMode();
    const navigation = useNavigation();
    const inset = useSafeAreaInsets();

    const routeParams = useRoute().params as ISelectAuthOtpTypeParams;

    const handleOtpViaEmail = async () => {
        if (routeParams?.authType === "ForgotPassword") {
            navigation.navigate("ForgotPassword", {
                validationType: "email",
            } as ISelectAuthTypeParams);
        }
        if (routeParams?.authType === "Changepassword") {
            navigation.navigate("ForgotPassword", {
                validationType: "email",
            } as ISelectAuthTypeParams);
        }
    };
    const handleOtpViaWhatsapp = async () => {
        if (routeParams?.authType === "ForgotPassword") {
            navigation.navigate("ForgotPassword", {
                validationType: "whatsapp",
            } as ISelectAuthTypeParams);
        }
        if (routeParams?.authType === "Changepassword") {
            navigation.navigate("ForgotPassword", {
                validationType: "whatsapp",
            } as ISelectAuthTypeParams);
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
                    />
                    {/* <GradientBtn
                        onPress={handleOtpViaWhatsapp}
                        title="OTP via Whatsapp"
                    /> */}
                </VStack>
            </Scroller>
        </ImageBg>
    );
}
