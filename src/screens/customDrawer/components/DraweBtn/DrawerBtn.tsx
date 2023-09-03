import {
    ChevronRightIcon,
    HStack,
    Pressable,
    Text,
    Factory,
} from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";
import { TouchableOpacity } from "react-native";

interface Props {
    onPress: () => void;
    title: string;
}

export default function DrawerBtn({ onPress, title }: Props) {
    const Touchable = Factory(TouchableOpacity);
    return (
        <Touchable onPress={onPress}>
            <HStack
                justifyContent={"space-between"}
                alignItems="center"
                py={"10px"}
            >
                <Text
                    color={"#fff"}
                    fontSize={scale(14)}
                    fontWeight={500}
                    textTransform={"uppercase"}
                >
                    {title}
                </Text>
                <ChevronRightIcon color={"#fff"} />
            </HStack>
        </Touchable>
    );
}
