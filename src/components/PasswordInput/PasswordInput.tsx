import React from "react";
import { Input, VStack } from "native-base";
import { EyeClose, EyeOpen } from "../Icons/Icons";
import { scale } from "react-native-size-matters";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function PasswordInput({
    onChangeText,
    value,
    placeholder,
    error,
    ...rest
}: {
    onChangeText: (text: string) => void;
    value: string;
    placeholder: string;
    error: string;
}) {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    return (
        <VStack>
            <Input
                borderWidth={0}
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
                type={isPasswordVisible ? "default" : "password"}
                rightElement={
                    isPasswordVisible ? (
                        <EyeOpen
                            onPress={() =>
                                setIsPasswordVisible((prev) => !prev)
                            }
                            color="gray.300"
                            mx="4"
                        />
                    ) : (
                        <EyeClose
                            onPress={() =>
                                setIsPasswordVisible((prev) => !prev)
                            }
                            color="gray.300"
                            mx="4"
                        />
                    )
                }
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                {...rest}
            />
            {error ? <ErrorMessage>{error}</ErrorMessage> : null}
        </VStack>
    );
}
