import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  Easing,
  withRepeat,
  withSequence,
} from "react-native-reanimated";

interface SwipeableCardProps {
  item?: string;
  index?: number;
  currentIndex?: Animated.SharedValue<number>;
}

const VeichleSwipeableCard: React.FC<SwipeableCardProps> = ({
  item,
  index,
  currentIndex,
}) => {
  const translateX = useSharedValue(0);

  translateX.value = withRepeat(
    withSequence(
      withSpring(0, { damping: 2, stiffness: 80 }),
      withSpring(0, { damping: 2, stiffness: 80 })
    ),
    -1,
    true
  );

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = translateX.value.interpolate({
      inputRange: [-100, 0, 100],
      outputRange: [0.5, 1, 0.5],
    });

    return {
      transform: [{ translateX: translateX.value }],
      opacity,
    };
  });

  return (
    <PanGestureHandler
      onGestureEvent={() => {
        currentIndex.value = index;
      }}
    >
      <Animated.View style={[styles.card, animatedStyle]}>
        <Text>{item}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: "10%",
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default VeichleSwipeableCard;
