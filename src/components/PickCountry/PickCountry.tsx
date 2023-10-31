import { CountryCallingCode, CountryCode } from "libphonenumber-js";
import { HStack, Input, Pressable, Text, VStack } from "native-base";
import React from "react";
import {
    NativeSyntheticEvent,
    Platform,
    TextInputFocusEventData,
} from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";
import { scale } from "react-native-size-matters";
import { validatePhone } from "@utils/validate-phone";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { ChevronDownFill } from "../Icons/Icons";

type TInputProps = React.ComponentProps<typeof Input>;

interface ICountryWithCode {
    dialingCode: string;
    countryCode: string;
    phoneNumber: string;
}

interface IPickCountry extends TInputProps {
    onChangeText?: (text: string) => void;
    value?: string;
    errorMessage?: string;
    setPhoneInfo: (info: ICountryWithCode) => void;
    initialDialingCode?: CountryCallingCode;
}

function PickCountry({
    onChangeText,
    value,
    onFocus,
    onBlur,
    errorMessage,
    setPhoneInfo,
    initialDialingCode,
    ...rest
}: IPickCountry) {
    const [show, setShow] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);

    const [countryCode, setCountryCode] = React.useState<CountryCallingCode>(
        initialDialingCode ?? "+974"
    );
    const [country, setCountry] = React.useState<CountryCode>("QA");
    const [phone, setPhone] = React.useState("");

    React.useEffect(() => {
        const hasError = validatePhone(phone, countryCode, country);
        setError(hasError);
        setPhoneInfo?.({
            dialingCode: countryCode,
            countryCode: country,
            phoneNumber: phone,
        });
    }, [countryCode, phone, country]);

    const handleError = (text: string) => {
        const hasError = validatePhone(text, countryCode, country);
        setError(hasError);
    };

    const handleChangeText = (text: string) => {
        setPhone(text);
        onChangeText?.(text);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        handleError(phone);
        onBlur?.(e);
    };

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        handleError(phone);
        setIsFocused(true);
        onFocus?.(e);
    };

    React.useEffect(() => {
        handleError(phone);
    }, [phone]);

    const localErrorMessage =
        isFocused && error ? "Invalid Phone Number" : undefined;

    const phoneError = errorMessage || localErrorMessage;

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
                placeholder="Phone Number"
                _focus={{
                    bg: "white",
                }}
                color="gray.200"
                fontSize={scale(12)}
                fontWeight="500"
                placeholderTextColor="gray.300"
                mb={2}
                keyboardType="phone-pad"
                onChangeText={handleChangeText}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={value}
                leftElement={
                    <Pressable onPress={() => setShow(true)}>
                        <HStack space={1} pl={5} alignItems={"center"}>
                            <Text
                                fontSize={scale(12)}
                                fontWeight={500}
                                color={"gray.200"}
                            >
                                {countryCode || "+974"}
                            </Text>
                            <ChevronDownFill color="gray.200" />
                        </HStack>
                    </Pressable>
                }
                {...rest}
            />

            <CountryPicker
                lang="en"
                show={show}
                onBackdropPress={() => setShow(false)}
                // when picker button press you will get the country object with dial code
                pickerButtonOnPress={(item) => {
                    setCountry(item.code.toUpperCase() as CountryCode);
                    setCountryCode(item.dial_code);
                    setShow(false);
                }}
                style={{
                    modal: {
                        height: 400,
                    },
                }}
            />
            {phoneError ? <ErrorMessage>{phoneError}</ErrorMessage> : null}
        </VStack>
    );
}

export default React.memo(PickCountry);
