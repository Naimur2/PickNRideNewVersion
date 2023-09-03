import { Input, VStack } from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Platform } from "react-native";

interface ItextInput extends React.ComponentProps<typeof Input> {
    value: string;
    placeholder: string;
    error?: string;
}

export default function TextInput({
    onChangeText,
    value,
    placeholder,
    error,
    ...rest
}: ItextInput) {
    return (
        <VStack>
            <Input
                borderWidth={Platform.OS === "ios" ? 2 : 0}
                borderColor="gray.300"
                bg="white"
                shadow="9"
                px={6}
                py={3}
                borderRadius={20}
                _focus={{
                    bg: "white",
                }}
                color="gray.200"
                fontSize={scale(12)}
                fontWeight="500"
                placeholderTextColor="gray.300"
                mb={2}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                {...rest}
            />
            {error ? <ErrorMessage>{error}</ErrorMessage> : null}
        </VStack>
    );
}
