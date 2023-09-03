import { HStack, Text } from "native-base";
import React from "react";

export default function CameraTimer({
    time,
    isRecording,
}: {
    time: number;
    isRecording: boolean;
}) {
    return (
        <HStack
            display={isRecording ? "flex" : "none"}
            w={20}
            py={1}
            mt={50 + "px"}
            bg="gray.400"
            borderRadius={40}
            alignItems="center"
            justifyContent="center"
        >
            <Text fontSize={16} color={"#fff"} fontWeight={600}>
                00:{time < 10 ? "0" + time : time}
            </Text>
        </HStack>
    );
}
