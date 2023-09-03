import Lock from "@assets/svgs/Lock";
import MobileApp from "@assets/svgs/MobileApp";
import Search from "@assets/svgs/Search";
import Veichle from "@assets/svgs/Veichle";
import React from "react";

import colors from "@theme/colors";
import { Factory, Text, VStack } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function TopSelection({
    iconName,
    isActive,
    title,
    onPress,
}: {
    iconName: string;
    isActive: boolean;
    title: string;
    onPress: () => void;
}) {
    const icons = {
        veichle: Veichle,
        lock: Lock,
        mobileApp: MobileApp,
        search: Search,
    };

    const Icon = icons[iconName];

    const Touchable = Factory(TouchableOpacity);

    return (
        <Touchable w={"24%"} onPress={onPress}>
            <VStack
                bg={isActive ? colors.primary[100] : "transparent"}
                alignItems={"center"}
                justifyContent={"center"}
                h={"120px"}
                borderRadius={"25px"}
            >
                <Icon
                    color={isActive ? "white" : "light.100"}
                    mb={4}
                    _dark={{
                        color: isActive ? "white" : "gray.400",
                    }}
                />

                <Text
                    fontSize={11}
                    fontWeight={600}
                    color={isActive ? "white" : "light.100"}
                    _dark={{
                        color: isActive ? "white" : "gray.400",
                    }}
                >
                    {title}
                </Text>
            </VStack>
        </Touchable>
    );
}

const styles = StyleSheet.create({
    bg: {
        width: "24%",
        backgroundColor: colors.primary[100],
        paddingVertical: 25,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
    },
});
