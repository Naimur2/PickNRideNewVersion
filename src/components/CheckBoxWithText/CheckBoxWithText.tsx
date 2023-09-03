import { HStack, Pressable, Text } from "native-base";
import React from "react";
import CheckBox from "../CheckBox/CheckBox";

interface ITextCheckboxProps {
    isChecked: boolean;
    onPress: () => void;
    text: string;
}

export default function CheckBoxWithText({
    isChecked,
    onPress,
    text,
    ...rest
}: ITextCheckboxProps) {
    return (
        <Pressable onPress={onPress} {...rest}>
            <HStack justifyContent={"space-between"} alignItems="center" py={2}>
                <Text
                    color={"#000"}
                    fontWeight={600}
                    fontSize={15}
                    _dark={{
                        color: "white",
                    }}
                >
                    {text}
                </Text>
                <CheckBox isChecked={isChecked} />
            </HStack>
        </Pressable>
    );
}
