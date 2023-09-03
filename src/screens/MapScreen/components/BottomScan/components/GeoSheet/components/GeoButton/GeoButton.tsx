import { HStack, Image, Text, VStack } from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";
import scooter from "@assets/images/motor.png";
import park from "@assets/images/park.png";
import { Ban, ErrorOutline } from "@components/Icons/Icons";

export default function GeoButton({
    title,
    subTitle,
    variant,
}: {
    title: string;
    subTitle: string;
    variant: "park" | "warning" | "banned" | "veichle";
}) {
    const icons = {
        warning: (
            <ErrorOutline
                _dark={{
                    color: "red.100",
                }}
                color={"red.100"}
            />
        ),
        veichle: (
            <Image
                w="24px"
                h="24px"
                tintColor={"#000"}
                _dark={{
                    tintColor: "#fff",
                }}
                source={scooter}
                alt="park"
                resizeMode="contain"
            />
        ),
        banned: (
            <Ban
                _dark={{
                    color: "red.100",
                }}
                color={"red.100"}
            />
        ),
        park: <Image source={park} alt="park" />,
    };

    return (
        <HStack
            space={5}
            w="full"
            maxW={scale(300) + "px"}
            alignItems="center"
            py={3}
        >
            {icons?.[variant]}
            <VStack>
                <Text
                    fontWeight={600}
                    fontSize={17}
                    color={"#000"}
                    _dark={{
                        color: "#fff",
                    }}
                >
                    {title}
                </Text>
                <Text
                    fontWeight={500}
                    fontSize={12}
                    color={"#000"}
                    _dark={{
                        color: "#fff",
                    }}
                >
                    {subTitle}
                </Text>
            </VStack>
        </HStack>
    );
}
