import { CloseIcon } from "@components/Icons/Icons";
import { Center, Pressable, Text, VStack } from "native-base";
import React from "react";

export default function CameraModalComp({
    onCloseModal,
}: {
    onCloseModal: () => void;
}) {
    const Message = ({ si, message }) => (
        <VStack alignItems={"center"} space="2" position={"relative"}>
            <Center borderRadius={20} h={"20px"} w="20px" bg="#fff">
                <Text fontWeight={700} fontSize={8} color="#000">
                    {si}
                </Text>
            </Center>
            <Text
                textAlign={"center"}
                fontWeight={500}
                fontSize={13}
                w={180}
                color={"#fff"}
            >
                {message}
            </Text>
        </VStack>
    );

    return (
        <VStack
            alignItems={"center"}
            borderRadius={20}
            pt={10}
            pb={20}
            w={300}
            bg={"gray.400"}
        >
            <Text
                textAlign={"center"}
                fontSize={24}
                fontWeight={600}
                color={"#fff"}
                mb={6}
            >
                Attention!
            </Text>
            <VStack space={4}>
                <Message
                    si="1"
                    message="Hold ID near your face in 10 seconds self video."
                />
                <Message
                    si="2"
                    message="Tap on record button when you are ready."
                />
                <Message
                    si="3"
                    message="Blink you eyes while capturing the video."
                />
            </VStack>
            <Pressable
                position={"absolute"}
                bottom={-15}
                onPress={onCloseModal}
            >
                <Center borderRadius={50} h="36px" w="36px" bg="primary.100">
                    <CloseIcon color="#fff" />
                </Center>
            </Pressable>
        </VStack>
    );
}
