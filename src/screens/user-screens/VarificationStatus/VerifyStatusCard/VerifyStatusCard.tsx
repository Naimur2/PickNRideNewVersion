import Card from "@components/Card/Card";
import { HStack, Text } from "native-base";
import React from "react";
import { INotificationsList } from "../VarificationStatus";

interface IVCards extends INotificationsList {
    onPress?: () => void;
}

const colorsList = {
    approved: "primary.100",
    pending: "primary.100",
    rejected: "red.100",
    expired: "gray.400",
};

export default function VerifyStatusCard({
    title,
    status,
    onPress,
    validDate,
}: IVCards) {
    return (
        <Card
            _dark={{
                bg: "#fff",
            }}
            onPress={onPress}
        >
            <HStack alignItems={"center"} justifyContent="space-between" mb={1}>
                <Text fontWeight={700} fontSize={21} color="#000">
                    {title}
                </Text>
                <Text
                    fontWeight={600}
                    fontSize={15}
                    color={colorsList[status]}
                    textTransform={"capitalize"}
                >
                    {status}
                </Text>
            </HStack>
            <Text fontWeight={600} fontSize={15} color="gray.100">
                Valid till{"  "}
                {new Date(validDate).toLocaleDateString().replace(/\//g, "-")}
            </Text>
        </Card>
    );
}
