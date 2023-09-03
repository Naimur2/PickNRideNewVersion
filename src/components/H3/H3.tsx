import { Text } from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";

export default function H3({
    children,
    ...rest
}: {
    children: React.ReactNode;
}) {
    return (
        <Text
            fontWeight={600}
            fontSize={scale(20)}
            _dark={{
                color: "#fff",
            }}
            mb={4}
            color="#000"
            {...rest}
        >
            {children}
        </Text>
    );
}
