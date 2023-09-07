import React, { Component } from "react";
import { Center, HStack, Image, VStack, Text } from "native-base";
import { scale } from "react-native-size-matters";
import { fontSizes } from "@theme/typography";
import { TCarType } from "@store/features/cars/carsSlice.types";
import { View, Dimensions, Animated } from "react-native";
const { width, height } = Dimensions.get("window");
export interface IVeichleCardProps {
  id?: string | number;
  image: any;
  title: string;
  distance: string;
  availableNumber: string;
  type: TCarType;
}

function VCard({ image, title, distance, availableNumber }: IVeichleCardProps) {
  return (
    <Animated.View
      style={{
        width: width,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        // paddingLeft: 5,
      }}
    >
      <VStack
        bg={"#ffffff"}
        // w={"90%"}
        mt={4}
        // ml={-4}
        alignItems="center"
        py="4"
        borderRadius={24}
        borderWidth={1}
        borderColor={"#ccc"}
      >
        <Image
          source={image}
          alt={"cicle"}
          height={scale(180) + "px"}
          width={scale(180) + "px"}
          resizeMode="contain"
        />

        <HStack w="full" mt={8} px={5} pb={2} alignItems={"center"}>
          <VStack mr={"auto"}>
            <Text
              color={"gray.100"}
              fontSize={13}
              fontWeight={500}
              maxW={["140px", "160px", "180px", "190px"]}
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              color={"primary.200"}
              fontWeight={700}
              fontSize={fontSizes.md}
            >
              {availableNumber} available
            </Text>
          </VStack>

          <Center
            p={"8px"}
            w={"128px"}
            bg={"primary.100"}
            borderRadius={24}
            ml="auto"
          >
            <Text fontSize={13} fontWeight={500} color="#fff">
              Distance {distance}
            </Text>
          </Center>
        </HStack>
      </VStack>
    </Animated.View>
  );
}

export default class VeichleCard extends Component {
  render() {
    return <VCard {...this.props} />;
  }
}
