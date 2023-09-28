import { HStack, Pressable, useColorMode } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { fontConfig } from "../../../theme-config/fontConfig";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import colors from "@theme/colors";

interface Switchprops {
  onPress: () => void;
  title: string;
  isActive: boolean;
}

const SwitchButton = ({ onPress, title, isActive }: Switchprops) => {
  const activeState = useDerivedValue(() => {
    return isActive ? withTiming(1) : withTiming(0);
  }, [isActive]);
  const colormode = useColorMode();

  const textStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      activeState.value,
      [0, 1],
      [colormode.colorMode === "dark" ? "#fff" : "black", "#fff"]
    ),
  }));

  return (
    <Pressable
      bg={isActive ? "primary.100" : null}
      w="100"
      mx={1}
      py="12px"
      onPress={onPress}
      borderRadius={100}
    >
      <>
        <HStack justifyContent={"center"}>
          <Animated.Text style={[styles.text, textStyle]}>
            {title}
          </Animated.Text>
        </HStack>
      </>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: fontConfig.Montserrat[500].normal,
    textTransform: "capitalize",
  },
});

export default SwitchButton;
