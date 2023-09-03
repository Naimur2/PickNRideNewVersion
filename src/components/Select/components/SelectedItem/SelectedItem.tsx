import { Factory, HStack, Text } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Tick } from "../../../Icons/Icons";

function SelectedItem({
    onPress,
    isSelected,
    title,
}: {
    onPress: () => void;
    isSelected: boolean;
    title: string;
}) {
    const Touchable = Factory(TouchableOpacity);
    return (
        <Touchable onPress={onPress}>
            <HStack
                borderBottomWidth={"1.5px"}
                borderBottomColor={"#cccccc70"}
                py="5"
                p="6"
                bg={isSelected ? "blueGray.100" : "white"}
                justifyContent="space-between"
            >
                <Text>{title}</Text>
                {isSelected && <Tick color={"primary.100"} />}
            </HStack>
        </Touchable>
    );
}

export default React.memo(SelectedItem);
