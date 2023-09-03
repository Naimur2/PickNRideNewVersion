import React from "react";
import { VStack, Text, Pressable, Image } from "native-base";
import torch from "@assets/images/torch.png";

export default function TorchBtn({ onPress }: { onPress: () => void }) {
    return (
        <VStack space="2" alignItems={"center"}>
            <Pressable
                px="4"
                py="4"
                alignItems="center"
                justifyContent="center"
                rounded={"full"}
                bg="#fff"
                shadow="9"
                onPress={onPress}
            >
                <Image
                    h={"24px"}
                    w={"24px"}
                    resizeMode="contain"
                    source={torch}
                    alt="torch"
                />
            </Pressable>
        </VStack>
    );
}
