import { fontSizes } from "@theme/typography";
import { Box, HStack, Input, VStack } from "native-base";
import React, { useRef, useState } from "react";
import { TextInput } from "react-native";
import { scale } from "react-native-size-matters";

const INPUT_WIDTH = scale(45) + "px";
const INPUT_HEIGHT = scale(50) + "px";

const INPUT_BORDER_RADIUS = 10;
const INPUT_FONT_SIZE = fontSizes.xs;

interface OtpInputProps extends React.ComponentProps<typeof HStack> {
    numInputs: number;
    setOtp: (otp: string) => void;
}

const OtpInput = ({ numInputs, setOtp, ...rest }: OtpInputProps) => {
    const [values, setValues] = useState(Array(numInputs).fill(""));
    const inputRefs = useRef<Array<TextInput>>([]);

    const handleOnChange = (index: number, value: string) => {
        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);
        setOtp?.(newValues.join(""));

        if (value !== "") {
            // move focus to next input field
            if (inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].focus();
            }
        } else {
            // move focus to previous input field if current field is empty
            if (
                index > 0 &&
                inputRefs.current[index - 1] &&
                values[index - 1] !== ""
            ) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleOnKeyPress = (index: number, event: any) => {
        // prevent moving to next input field if previous one is empty
        if (event.nativeEvent.key === "Backspace" && values[index] !== "") {
            if (inputRefs.current[index - 1]) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleOnFocus = (index: number) => {
        // move focus to previous input field if previous one is empty
        if (index > 0 && values[index - 1] === "") {
            if (inputRefs.current[index - 1]) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    return (
        <HStack
            space="2"
            justifyContent={"center"}
            alignItems={"center"}
            {...rest}
        >
            {Array.from({ length: numInputs }).map((_, index) => (
                <Box
                    key={index.toString() + "otp"}
                    width={INPUT_WIDTH}
                    height={INPUT_HEIGHT}
                    borderRadius={INPUT_BORDER_RADIUS}
                    shadow={5}
                    borderWidth={1}
                    borderColor={"light.100"}
                    overflow={"hidden"}
                    bg={values[index] ? "primary.100" : "white"}
                >
                    <Input
                        width={"full"}
                        height={"full"}
                        fontSize={INPUT_FONT_SIZE}
                        textAlign="center"
                        value={values[index]}
                        keyboardType="number-pad"
                        maxLength={1}
                        bg="transparent"
                        _focus={{
                            bg: "transparent",
                        }}
                        onChangeText={(value) => handleOnChange(index, value)}
                        onKeyPress={(event) => handleOnKeyPress(index, event)}
                        borderWidth={0}
                        fontWeight={700}
                        color={values[index] ? "white" : "black"}
                        onFocus={() => handleOnFocus(index)}
                        ref={(ref) => {
                            inputRefs.current[index] = ref;
                        }}
                    />
                </Box>
            ))}
        </HStack>
    );
};

export default OtpInput;
