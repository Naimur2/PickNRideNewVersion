import { Text, VStack } from "native-base";
import React from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import { fontSizes } from "@theme/typography";

interface ITopSection {
    title: string;
    subtitle: string;
}

export default function TopSection({ title, subtitle }: ITopSection) {
    const insets = useSafeAreaInsets();

    return (
        <VStack
            borderBottomRadius={40}
            bg="green.200"
            w="full"
            pt={Platform.OS === "android" ? 55 : 0}
            pb={10}
            px={8}
            _dark={{
                bg: "primary.100",
            }}
        >
            <Text
                lineHeight={scale(45) + "px"}
                fontWeight={700}
                fontSize={fontSizes["4xl"]}
                pt={7}
                maxW={scale(300)}
                color="primary.200"
                _dark={{
                    color: "#000",
                }}
            >
                {title}
            </Text>
            <Text
                color={"green.300"}
                pt={2}
                fontWeight={500}
                fontSize={fontSizes["xs"]}
                _dark={{
                    color: "#000",
                }}
            >
                {subtitle}
            </Text>
        </VStack>
    );
}
