import Lock from "@assets/svgs/Lock";
import MobileApp from "@assets/svgs/MobileApp";
import Search from "@assets/svgs/Search";
import Veichle from "@assets/svgs/Veichle";
import React from "react";
import car from "@assets/images/car-small.png";
import colors from "@theme/colors";
import { Factory, Text, VStack, Image } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import CarMarker from "@assets/svgs/CarMarker";

const CarImage = ({ imageWidth }: { imageWidth: number }) => (
  <Image
    w={imageWidth + "px"}
    h={imageWidth + "px"}
    resizeMode="contain"
    source={car}
    alt="cycle"
    tintColor={"#cacaca"}
  />
);

export default function TopSelection({
  iconName,
  isActive,
  title,
  onPress,
}: {
  iconName: string;
  isActive: boolean;
  title: string;
  onPress: () => void;
}) {
  const icons = {
    veichle: CarMarker,
    lock: Lock,
    mobileApp: MobileApp,
    search: Search,
  };

  const Icon = icons[iconName];

  const Touchable = Factory(TouchableOpacity);

  return (
    <Touchable w={"24%"} onPress={onPress}>
      <VStack
        bg={isActive ? colors.primary[100] : "transparent"}
        alignItems={"center"}
        justifyContent={"center"}
        h={"120px"}
        borderRadius={"25px"}
      >
        {title?.toLocaleLowerCase() === "veichle" ? (
          <Image
            w={"55px"}
            h={"60px"}
            resizeMode="contain"
            source={car}
            alt="cycle"
            tintColor={isActive ? "white" : "light.100"}
          />
        ) : (
          <Icon
            color={isActive ? "white" : "light.100"}
            mb={4}
            _dark={{
              color: isActive ? "white" : "gray.400",
            }}
          />
        )}
        <Text
          fontSize={11}
          fontWeight={600}
          color={isActive ? "white" : "light.100"}
          _dark={{
            color: isActive ? "white" : "gray.400",
          }}
        >
          {title}
        </Text>
      </VStack>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: "24%",
    backgroundColor: colors.primary[100],
    paddingVertical: 25,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
});
