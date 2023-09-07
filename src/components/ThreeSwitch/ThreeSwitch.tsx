import { HStack, VStack } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import SwitchButton from "./coponents/SwitchButton";

interface ThreeSwitchProps {
  onPress?: (current: string) => void;
  leftTitle?: string;
  rightTitle?: string;
  centerTitle?: string;
  currentIndex?: number;
}

const ThreeSwitch = ({
  onPress,
  leftTitle,
  rightTitle,
  centerTitle,
  currentIndex,
}: ThreeSwitchProps) => {
  return (
    <VStack
      my={4}
      bg="transparent"
      maxW={350}
      mt={4}
      shadow="1"
      borderRadius={20}
    >
      <HStack
        bg="#fff"
        // onLayout={containerLayoutHandler}
        borderRadius={20}
        justifyContent={"space-between"}
        _dark={{
          bg: "gray.400",
        }}
      >
        <SwitchButton
          onPress={() => onPress(0)}
          title={"Left"}
          isActive={currentIndex == 0}
        />
        <SwitchButton
          onPress={() => onPress(1)}
          title={centerTitle || "Center"}
          isActive={currentIndex == 1}
        />

        <SwitchButton
          onPress={() => onPress(2)}
          title={rightTitle || "Right"}
          isActive={false}
          isActive={currentIndex == 2}
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
