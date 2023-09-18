import { HStack, VStack } from "native-base";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

import SwitchButton from "./coponents/SwitchButton";

interface ThreeSwitchProps {
  onPress?: (current: string) => void;
  currentIndex?: number;
  data?: any;
}

const ThreeSwitch = ({ onPress, currentIndex, data }: ThreeSwitchProps) => {
  return (
    <VStack
      my={4}
      bg="transparent"
      maxW={350}
      mt={4}
      shadow="1"
      borderRadius={20}
    >
      <HStack bg={"#ffffff"} shadow={"none"}>
        <FlatList
          data={data || []}
          horizontal
          renderItem={({ item, index }) => {
            return (
              <SwitchButton
                onPress={() => onPress(index)}
                title={item}
                isActive={currentIndex == index}
              />
            );
          }}
        />
      </HStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  active: {
    backgroundColor: "#cfcccc",
    width: "33.34%",
    height: "100%",
    position: "absolute",
    zIndex: -1,
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default ThreeSwitch;
