import GradientBtn from "@components/GradientBtn/GradientBtn";
import PickCountry from "@components/PickCountry/PickCountry";
import { Actionsheet, Box, useColorMode } from "native-base";
import React from "react";
import { Dimensions, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface IPhoneInputSheet {
    isOpen: boolean;
    onClose: () => void;
    setPhoneText: ({
        phoneNumber,
        dialingCode,
    }: {
        phoneNumber: string;
        dialingCode: string;
    }) => void;
    value: {
        phoneNumber: string;
        dialingCode: string;
    };
}

export default function PhoneInputSheet({
    isOpen,
    onClose,
    setPhoneText,
    value,
}: IPhoneInputSheet) {
    const colormode = useColorMode();
    const [phone, setPhone] = React.useState({
        phoneNumber: "",
        dialingCode: "",
    });

    React.useEffect(() => {
        setPhone(value);
    }, [value]);

    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Box
                h={"2/4"}
                w={"full"}
                roundedTop={40}
                bottom={0}
                position={"absolute"}
                backgroundColor={
                    colormode.colorMode === "dark" ? "black" : "#ffffff"
                }
                borderColor={"white"}
                borderWidth={2}
                borderBottomWidth={0}
                py={5}
                px={5}
            >
                <KeyboardAwareScrollView
                    style={{ height: Dimensions.get("window").height / 2 }}
                >
                    <Text
                        my={5}
                        textAlign={"center"}
                        fontWeight={"800"}
                        fontSize={"lg"}
                        mb={10}
                    ></Text>
                    <PickCountry
                        setPhoneInfo={(phoneInfo) => {
                            setPhone({
                                phoneNumber: phoneInfo?.phoneNumber,
                                dialingCode: phoneInfo?.dialingCode,
                            });
                        }}
                        onChangeText={(v) => {
                            setPhone((prev) => ({ ...prev, phoneNumber: v }));
                        }}
                        value={phone.phoneNumber}
                        initialDialingCode={value.dialingCode}
                    />

                    {/*  */}
                    <GradientBtn
                        gradientStyle={{ maxWidth: 250 }}
                        title={"Save"}
                        mx={"auto"}
                        mt={10}
                        // disabled={result.isLoading}
                        onPress={() => {
                            setPhoneText?.(phone);
                            onClose?.();
                        }}
                    />
                </KeyboardAwareScrollView>
            </Box>
        </Actionsheet>
    );
}
