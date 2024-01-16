import {
    CloseIcon,
    Factory,
    Flex,
    HStack,
    Image,
    Pressable,
    Text,
    useColorMode,
    VStack,
} from "native-base";
import React from "react";
import Facebook from "@assets/svgs/Facebook";
import Google from "@assets/svgs/Google";
import Message from "@assets/svgs/Message";
import megaSell from "@assets/images/mega-sell.png";
import Modal from "react-native-modal";
import { TouchableOpacity } from "react-native";

export default function DashModal({ isOpen, onClose, ...rest }) {
    const UModal = Factory(Modal);

    const { colorMode } = useColorMode();

    return (
        <UModal
            isVisible={isOpen}
            backdropColor={colorMode === "dark" ? "#000" : "#fff"}
            propagateSwipe={true}
            onSwipeComplete={onClose}
            swipeDirection={["left", "right"]}
            {...rest}
        >
            <VStack w="320px" h="460px" mx={"auto"}>
                <Pressable
                    onPress={onClose}
                    backgroundColor={"red.800"}
                    borderRadius={50}
                    position={"absolute"}
                    top={-5}
                    right={-5}
                    zIndex={1}
                    p={2}
                >
                    <CloseIcon
                        color={"#fff"}
                        _dark={{
                            color: "#000",
                        }}
                        size={5}
                    />
                </Pressable>
                <VStack
                    bg="#fff"
                    width={"100%"}
                    height={"100%"}
                    borderRadius={20}
                    position={"relative"}
                    shadow="lg"
                    overflow="hidden"
                >
                    <VStack
                        alignItems={"center"}
                        bg="primary.100"
                        w="100%"
                        h="175px"
                    >
                        <Image
                            w="245px"
                            resizeMode="contain"
                            source={megaSell}
                            alt="mega-sell"
                        />
                    </VStack>
                    <VStack justifyContent={"center"} alignItems="center">
                        <Text
                            textAlign={"center"}
                            fontSize={"33px"}
                            color={"primary.100"}
                            mt={4}
                            maxW={250}
                            fontWeight={"600"}
                        >
                            Get Amazing Offer
                        </Text>
                        {/* <Text
                            textAlign={"center"}
                            fontSize={"13px"}
                            color={"light.200"}
                            mt={3}
                            maxW={250}
                            fontWeight={"500"}
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Magnam nulla magni placeat eos
                        </Text> */}
                        <Text
                            textAlign={"center"}
                            fontSize={"12px"}
                            color={"gray.400"}
                            maxW={250}
                            fontWeight={"500"}
                            mt={2}
                        >
                            Tap to Share
                        </Text>
                    </VStack>
                    <HStack
                        py={4}
                        mt="auto"
                        bg="green.100"
                        alignItems="center"
                        justifyContent={"center"}
                        space="5"
                    >
                        <Pressable>
                            <Facebook />
                        </Pressable>

                        <Pressable>
                            <Google />
                        </Pressable>
                        <Pressable>
                            <Message />
                        </Pressable>
                    </HStack>
                </VStack>
            </VStack>
            {/* <Touchable onPress={() => setIsVisible(false)}>
                <Center
                    _dark={{ bg: "#fff" }}
                    mt={20}
                    h="9"
                    w="9"
                    bg="#000"
                    borderRadius={50}
                >
                    <CloseIcon
                        color="#fff"
                        _dark={{
                            color: "#000",
                        }}
                    />
                </Center>
            </Touchable> */}
        </UModal>
    );
}
