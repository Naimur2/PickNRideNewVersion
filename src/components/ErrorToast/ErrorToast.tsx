import { Entypo } from "@expo/vector-icons";
import { HStack, Text } from "native-base";
import React from "react";
import { IErrorToastProps } from "./ErrorToast.types";

export default function ErrorToast({
    message,
    textProps,
    ...rest
}: IErrorToastProps) {
    return (
        <HStack
            shadow="1"
            px="6"
            py="4"
            borderWidth={"1px"}
            borderColor={"#ccc"}
            rounded={"lg"}
            bg="red.500"
            w="full"
            space="2"
            alignItems="center"
            {...rest}
        >
            <Entypo name="warning" size={16} color="white" />
            <Text
                textAlign={"justify"}
                fontWeight={"bold"}
                color={"white"}
                {...textProps}
            >
                {message}
            </Text>
        </HStack>
    );
}
