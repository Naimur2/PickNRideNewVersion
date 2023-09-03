import { View, Text } from "react-native";
import React from "react";
import Card from "@components/Card/Card";
import CheckBoxWithText from "@components/CheckBoxWithText/CheckBoxWithText";

export default function NotifyAbout() {
    const [selected, setSelected] = React.useState(1);
    return (
        <Card>
            <CheckBoxWithText
                isChecked={selected === 1}
                py="2"
                text="New Messages"
                onPress={() => setSelected(1)}
            />
            <CheckBoxWithText
                isChecked={selected === 2}
                py="2"
                text="Direct Messages & Mentions"
                onPress={() => setSelected(2)}
            />
            <CheckBoxWithText
                isChecked={selected === 3}
                py="2"
                text="Only Mentions"
                onPress={() => setSelected(3)}
            />
        </Card>
    );
}
