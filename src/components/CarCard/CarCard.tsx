import React from "react";

import { Button, HStack, Image, Pressable, Text, VStack } from "native-base";
import { scale } from "react-native-size-matters";

export interface ICarCardProp {
    subtitle?: string;
    title: string;
    distance: string;
    image: string;
    onPress: () => void;
    onSelect: () => void;
}

export default function CarCard({
    subtitle,
    title,
    distance,
    image,
    onPress,
    onSelect,
}: ICarCardProp) {
    return (
        <Pressable onPress={onPress} w="full">
            <HStack
                py={3}
                pr={4}
                bg="#fff"
                shadow="6"
                overflow="hidden"
                borderRadius={25}
                alignItems="center"
                w="full"
            >
                <Image
                    source={{
                        uri: image,
                    }}
                    alt="Renault"
                    h={scale(100) + "px"}
                    w={scale(250) + "px"}
                    resizeMode="contain"
                    ml={-20}
                />
                <VStack justifyContent={"center"} ml={6}>
                    {subtitle ? (
                        <Text
                            color={"#CBE6B8"}
                            fontSize={scale(10)}
                            fontWeight={600}
                        >
                            {subtitle}
                        </Text>
                    ) : null}
                    <Text
                        color={"primary.200"}
                        fontWeight={700}
                        fontSize={scale(17)}
                    >
                        {title}
                    </Text>
                    <Text fontSize={scale(13)} color={"gray.100"}>
                        Distance {distance}
                    </Text>
                    <Button
                        onPress={onSelect}
                        mt={2}
                        px={1}
                        py={2}
                        width="90px"
                        borderRadius={20}
                        bg="primary.100"
                        _pressed={{
                            bg: "primary.200",
                        }}
                        _text={{
                            color: "#fff",
                            fontSize: scale(12),
                            fontWeight: 700,
                            textTransform: "uppercase",
                        }}
                    >
                        Select
                    </Button>
                </VStack>
            </HStack>
        </Pressable>
    );
}
