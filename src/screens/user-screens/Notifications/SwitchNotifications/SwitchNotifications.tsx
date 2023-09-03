import { HStack, Text } from "native-base";
import React from "react";
import ToggleSwitch from "toggle-switch-react-native";
import Card from "@components/Card/Card";
import colors from "@theme/colors";

export default function SwitchNotifications() {
    const [allowNotifications, setAllowNotifications] = React.useState(true);
    return (
        <Card>
            <HStack justifyContent={"space-between"}>
                <Text
                    color="#000"
                    _dark={{ color: "#fff" }}
                    fontWeight={600}
                    fontSize={15}
                >
                    Allow Notifications
                </Text>
                <ToggleSwitch
                    isOn={allowNotifications}
                    onColor={colors.primary[100]}
                    offColor="red"
                    size="medium"
                    onToggle={() => setAllowNotifications((prev) => !prev)}
                />
            </HStack>
        </Card>
    );
}
