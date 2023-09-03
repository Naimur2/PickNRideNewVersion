import { HStack, Image, Text, useColorMode, VStack } from "native-base";
import React from "react";
import GradientBtn from "@components/GradientBtn/GradientBtn";
import ImageBg from "@components/ImageBg/ImageBg";
import Scroller from "@components/Scroller/Scroller";
import cycle from "@assets/images/cycle.png";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

export default function SplashThird() {
    const { colorMode } = useColorMode();
    const navigation = useNavigation();

    return (
        <Scroller
            contentContainerStyle={{
                flexGrow: 1,
            }}
        >
            <ImageBg
                type={colorMode}
                alignItems="center"
                justifyContent="space-between"
            >
                <Image
                    source={cycle}
                    width={scale(180) + "px"}
                    resizeMode={"contain"}
                    alt="cycle"
                    mt={"45%"}
                />
                <VStack mb="20%">
                    <GradientBtn
                        title={"Get Started"}
                        onPress={() => navigation.navigate("Register")}
                    />
                    <HStack
                        alignItems={"center"}
                        justifyContent="center"
                        mt={4}
                        space={2}
                    >
                        <Text
                            color={"gray.100"}
                            fontWeight={500}
                            fontSize={13}
                            _dark={{
                                color: "light.100",
                            }}
                        >
                            Already have an account?
                        </Text>
                        <Text
                            onPress={() => navigation.navigate("Login")}
                            color={"gray.200"}
                            fontWeight={500}
                            fontSize={13}
                            _dark={{
                                color: "light.100",
                            }}
                        >
                            Sign In
                        </Text>
                    </HStack>
                </VStack>
            </ImageBg>
        </Scroller>
    );
}
