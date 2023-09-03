import { HStack, Image, Pressable, Text } from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";

import apple from "@assets/images/apple-logo.png";
import google from "@assets/images/google.png";

export default function SocialButton({
    type,
    onPress,
    ...rest
}: {
    type: "apple" | "google";
    onPress: () => void;
}) {
    return (
        <Pressable
            onPress={onPress}
            {...rest}
            alignItems="center"
            mx={"auto"}
            w="100%"
        >
            <HStack
                alignItems="center"
                bg={type === "apple" ? "#000000" : "red.100"}
                px={6}
                py={4}
                borderRadius={20}
                space="6"
                width={"100%"}
                maxWidth={[400, null, null, 300]}
            >
                <Image
                    source={type === "apple" ? apple : google}
                    alt="apple"
                    height={scale(20) + "px"}
                    width={scale(20) + "px"}
                    resizeMode="contain"
                />
                <Text
                    fontWeight={500}
                    fontSize={scale(13) + "px"}
                    mx={"auto"}
                    color="#fff"
                >
                    Continue with {type === "apple" ? "Apple" : "Google"}
                </Text>
            </HStack>
        </Pressable>
    );
}
