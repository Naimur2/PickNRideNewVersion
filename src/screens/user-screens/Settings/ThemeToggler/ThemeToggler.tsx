import React from "react";
import Card from "@components/Card/Card";
import { HStack, Text, useColorMode } from "native-base";
import ToggleSwitch from "toggle-switch-react-native";
import colors from "@theme/colors";

export default function ThemeToggler() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Card py={3}>
            <HStack justifyContent={"space-between"}>
                <Text
                    color="#000"
                    _dark={{ color: "#fff" }}
                    fontWeight={600}
                    fontSize={15}
                >
                    {colorMode === "light" ? "Dark Mode" : "Light Mode"}
                </Text>
                <ToggleSwitch
                    isOn={colorMode === "dark"}
                    onColor={colors.primary[100]}
                    offColor="red"
                    size="medium"
                    onToggle={toggleColorMode}
                />
            </HStack>
        </Card>
    );
}
