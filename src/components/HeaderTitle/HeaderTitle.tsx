import React from "react";
import { Text } from "native-base";

export default function HeaderTitle({ title, ...rest }: { title: string }) {
    return (
        <Text
            textTransform={"uppercase"}
            color={"#000"}
            fontSize={17}
            fontWeight={700}
            _dark={{
                color: "#fff",
            }}
            {...rest}
        >
            {title}
        </Text>
    );
}
