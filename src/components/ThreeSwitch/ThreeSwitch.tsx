import { HStack, VStack } from "native-base";
import React from "react";
import { LayoutChangeEvent, StyleSheet, useAnimatedValue } from "react-native";

import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import LinGradient from "../LinGrad/LinGrad";
import SwitchButton from "./coponents/SwitchButton";

interface ThreeSwitchProps {
  onPress?: (current: string) => void;
  leftTitle?: string;
  rightTitle?: string;
  centerTitle?: string;
}

const ThreeSwitch = ({
  onPress,
  leftTitle,
  rightTitle,
  centerTitle,
}: ThreeSwitchProps) => {
  const switchWidth = React.useRef(0);
  const containerWidth = React.useRef(0);

  const [active, setActive] = React.useState(0);

  const animatedValue = useSharedValue(0);


  const switchLayoutHandler = (e: LayoutChangeEvent) => {
    switchWidth.current = e.nativeEvent.layout.width;
  };

  const containerLayoutHandler = (e: LayoutChangeEvent) => {
    containerWidth.current = e.nativeEvent.layout.width;
  };

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animatedValue.value }],
    };
  }, [animatedValue.value]);

  const handlePress = (type: string) => {
    "worklet";
    console.log({ type });
    switch (type) {
      case 1:
        animatedValue.value = withTiming(0, { duration: 100 }, (isFinished) => {
          if (isFinished && onPress) {
            runOnJS(onPress)?.("1");
            runOnJS(setActive)?.(1);
          }
        });
        break;
      case 2:
        animatedValue.value = withTiming(
          containerWidth.current / 3,
          { duration: 100 },
          (isFinished) => {
            if (isFinished && onPress) {
              runOnJS(onPress)?.("2");
              runOnJS(setActive)?.(2);
            }
          }
        );
        break;
      case 3:
        animatedValue.value = withTiming(
          containerWidth.current - switchWidth.current,
          { duration: 100 },
          (isFinished) => {
            if (isFinished && onPress) {
              runOnJS(onPress)?.("3");
              runOnJS(setActive)?.(3);
            }
          }
        );
        break;
      default:
        animatedValue.value = withTiming(0);
        break;
    }
  };

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
        onLayout={containerLayoutHandler}
        borderRadius={20}
        justifyContent={"space-between"}
        _dark={{
          bg: "gray.400",
        }}
      >
        <SwitchButton
          onPress={() => handlePress(1)}
          title={leftTitle || "Left"}
          isActive={active === 1}
        />
        <SwitchButton
          onPress={() => handlePress(2)}
          title={centerTitle || "Center"}
          isActive={active === 2}
        />

        <SwitchButton
          onPress={() => handlePress(3)}
          title={rightTitle || "Right"}
          isActive={active === 3}
        />

        <Animated.View
          onLayout={switchLayoutHandler}
          style={[rStyle, styles.active]}
        >
          <LinGradient h={"full"} w="full" />
        </Animated.View>
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
