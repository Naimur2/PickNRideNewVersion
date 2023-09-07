import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ButtonListProps {
  buttons: string[];
  currentIndex: number;
  onPress: (index: number) => void;
}

const VeichleButtonList: React.FC<ButtonListProps> = ({
  buttons,
  currentIndex,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <Text
          key={index}
          style={[
            styles.button,
            currentIndex === index ? styles.activeButton : null,
          ]}
          onPress={() => onPress(index)}
        >
          {button}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "10%",
  },
  button: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#333",
  },
  activeButton: {
    backgroundColor: "#007AFF",
    color: "white",
  },
});

export default VeichleButtonList;
