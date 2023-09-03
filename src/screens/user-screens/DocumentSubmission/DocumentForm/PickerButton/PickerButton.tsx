import { Divider, HStack, Text, Factory } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { ChevronDownFill } from "@components/Icons/Icons";

export default function PickerButton({
    value,
    onPress,
    isActive,
    divider,
    ...rest
}: {
    value: string;
    onPress: () => void;
    divider?: boolean;
    isActive: boolean;
}) {
    const Touchable = Factory(TouchableOpacity);
    return (
        <Touchable onPress={onPress}>
            <HStack
                justifyContent={"space-between"}
                alignItems="center"
                py={3}
                {...rest}
            >
                <Text
                    color={isActive ? "#000" : "gray.100"}
                    fontWeight={600}
                    fontSize={17}
                    p={0}
                    _dark={{
                        color: "#fff",
                    }}
                >
                    {value}
                </Text>
                <ChevronDownFill
                    color={"gray.100"}
                    _dark={{
                        color: "#fff",
                    }}
                />
            </HStack>
            {divider && <Divider bg="light.200" />}
        </Touchable>
    );
}
