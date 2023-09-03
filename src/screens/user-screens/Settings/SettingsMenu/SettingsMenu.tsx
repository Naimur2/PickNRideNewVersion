import React from "react";
import { Pressable, HStack, Text, ChevronRightIcon } from "native-base";

export interface ISettingsMenu {
    onPress?: () => void;
    title: string;
}

export default function SettingsMenu({
    onPress,
    title,
    ...rest
}: ISettingsMenu) {
    return (
        <Pressable py={4} onPress={onPress} {...rest}>
            <HStack justifyContent={"space-between"}>
                <Text
                    color="#000"
                    _dark={{ color: "#fff" }}
                    fontWeight={600}
                    fontSize={15}
                >
                    {title}
                </Text>
                <ChevronRightIcon />
            </HStack>
        </Pressable>
    );
}
