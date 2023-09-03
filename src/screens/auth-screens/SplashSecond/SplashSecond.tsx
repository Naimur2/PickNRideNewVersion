import { useNavigation } from "@react-navigation/native";
import { Pressable, Text } from "native-base";
import React from "react";
import ImageBg from "@components/ImageBg/ImageBg";
import Logo from "@assets/svgs/Logo";
import Next from "@assets/svgs/Next";
import Scroller from "@components/Scroller/Scroller";
import GradientBtn from "@components/GradientBtn/GradientBtn";

export default function SplashSecond() {
    const navigation = useNavigation();
    return (
        <ImageBg>
            <Scroller
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: 100,
                }}
            >
                <Logo />
                <Text
                    mt={"30%"}
                    textAlign={"center"}
                    fontSize="15"
                    maxW={180}
                    color="white"
                    fontWeight={"700"}
                >
                    {" "}
                    Pick and ride that comes to your mind.{" "}
                </Text>
                <GradientBtn
                    title={"Get Started"}
                    onPress={() => navigation.navigate("Login")}
                />
            </Scroller>
        </ImageBg>
    );
}
