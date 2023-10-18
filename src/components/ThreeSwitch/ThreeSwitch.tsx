import { HStack, VStack } from "native-base";
import React, { useEffect, useRef } from "react";
import { Animated, FlatList, StyleSheet } from "react-native";

import SwitchButton from "./coponents/SwitchButton";

interface ThreeSwitchProps {
  onPress?: (current: string) => void;
  currentIndex?: number;
  data?: any;
}

const ThreeSwitch = ({ onPress, currentIndex, data }: ThreeSwitchProps) => {
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const ITEM_WIDTH = 100;
  useEffect(() => {
    if (flatListRef.current) {
      // Calculate the scroll offset to center the active button
      const offset = currentIndex * ITEM_WIDTH - ITEM_WIDTH * 1.5;

      // Scroll to the calculated offset with animation
      Animated.spring(scrollX, {
        toValue: offset,
        useNativeDriver: false,
      }).start();

      // Scroll to the calculated offset immediately (optional)
      flatListRef.current.scrollToOffset({ offset, animated: false });
    }
  }, [currentIndex]);
  return (
    <VStack my={4} maxW={350} mt={4} shadow={"none"} borderRadius={20}>
      <HStack borderRadius={26}>
        <Animated.FlatList
          ref={flatListRef}
          data={data || []}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <SwitchButton
                onPress={() => onPress(index)}
                title={item?.category}
                isActive={currentIndex == index}
              />
            );
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
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
