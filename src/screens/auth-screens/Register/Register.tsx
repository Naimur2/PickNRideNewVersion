import { Telephone, Whatsapp } from "@components/Icons/Icons";
import Scroller from "@components/Scroller/Scroller";
import {
    HStack,
    Image,
    Pressable,
    Text,
    VStack,
    useColorMode,
} from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import SignUpInputForm from "./SignUpInputForm/SignUpInputForm";

import dark from "@assets/images/background-map-dark.png";
import light from "@assets/images/background-map-light.png";
import config from "@config";
import { fontSizes } from "@theme/typography";
import * as Linking from "expo-linking";

export default function Register() {
    const { colorMode } = useColorMode();

    const insets = useSafeAreaInsets();
    const openWhatsapp = () => {
        Linking.openURL(`https://wa.me/${config.whatsappNumber}`);
    };

    const openDialScreen = (number) => {
        if (Linking.canOpenURL(`tel:${number}`)) {
            Linking.openURL(`tel:${number}`);
        }
    };

    return (
        <>
            <Scroller
                contentStyle={{
                    flexGrow: 1,
                    alignItems: "center",
                    paddingTop: insets.top + 20,
                }}
            >
                <Image
                    source={colorMode === "dark" ? dark : light}
                    h="full"
                    w="full"
                    alt="map"
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                />
                <VStack
                    maxW={scale(320) + "px"}
                    flexGrow={1}
                    w="full"
                    px={4}
                    py={5}
                >
                    <VStack alignItems={"center"} space="3">
                        <Text
                            color="primary.200"
                            fontSize={17}
                            fontWeight="bold"
                        >
                            Sign Up
                        </Text>
                        <Text
                            color="gray.100"
                            fontSize={13}
                            fontWeight="500"
                            w="180"
                            textAlign={"center"}
                            _dark={{
                                color: "light.200",
                            }}
                        >
                            Enter your Sign Up details to Create your account
                        </Text>
                    </VStack>
                    <SignUpInputForm />
                    <HStack
                        alignItems={"center"}
                        mt={4}
                        py={4}
                        justifyContent={"space-between"}
                    >
                        <Pressable onPress={openWhatsapp}>
                            <HStack alignItems={"center"} space="2">
                                <Whatsapp color="primary.100" />
                                <Text
                                    fontSize={fontSizes.xs}
                                    fontWeight={500}
                                    color={"gray.100"}
                                >
                                    Whatsapp
                                </Text>
                            </HStack>
                        </Pressable>
                        <Pressable
                            display="flex"
                            flexDir={"row"}
                            alignItems={"center"}
                            space="2"
                            onPress={() =>
                                openDialScreen(`+${config.whatsappNumber}`)
                            }
                        >
                            <Telephone color="primary.100" />
                            <Text
                                fontSize={fontSizes.xs}
                                fontWeight={500}
                                color={"gray.100"}
                                ml={2}
                            >
                                +{config.whatsappNumber}
                            </Text>
                        </Pressable>
                    </HStack>
                </VStack>
            </Scroller>
        </>
    );
}
