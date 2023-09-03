import React from "react";
import { VStack, Text, Image } from "native-base";
import Card from "@components/Card/Card";
import lock from "@assets/images/lock-unlock.png";
import clock from "@assets/images/clock.png";
import { scale } from "react-native-size-matters";

export default function PriceCard({
    type,
    header,
    subtitle,
}: {
    type: string;
    header: string;
    subtitle: string;
}) {
    return (
        <VStack
            alignItems={"center"}
            borderRadius={20}
            py="4"
            bg="primary.100"
            w="48%"
        >
            <Text pt={2} color={"#fff"} fontWeight={700} fontSize={scale(26)}>
                {header}
            </Text>
            <Text pb={4} color={"#fff"} fontWeight={500} fontSize={scale(12)}>
                {subtitle}
            </Text>
            <Card mb="-48px" px="9" borderRadius={16} alignItems="center">
                {type ? (
                    <Image source={type === "lock" ? lock : clock} alt="lock" />
                ) : null}
            </Card>
        </VStack>
    );
}
