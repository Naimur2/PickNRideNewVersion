import { Pressable } from "native-base";
import React from "react";

interface ICard {
  onPress?: () => void;
  children: React.ReactNode;
}

export default function Card({ children, onPress, ...rest }: ICard) {
  return (
    <Pressable
      bg="#fff"
      py="5"
      px="6"
      borderRadius={"25px"}
      shadow={7}
      onPress={onPress}
      _dark={{
        bg: "gray.200",
      }}
      {...rest}
    >
      {children}
    </Pressable>
  );
}
