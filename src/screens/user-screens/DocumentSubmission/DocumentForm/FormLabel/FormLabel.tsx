import { View, Text } from "react-native";
import React from "react";
import { FormControl } from "native-base";

export default function FormLabel({ title }: { title: string }) {
    return (
        <FormControl.Label
            fontSize={12}
            color="gray.400"
            _dark={{ color: "#fff" }}
            fontWeight={500}
        >
            {title}
        </FormControl.Label>
    );
}
