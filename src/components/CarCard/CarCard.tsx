import React from "react";

import { Button, HStack, Image, Pressable, Text, VStack } from "native-base";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import {
  selectSelectedVeichleType,
  setSelectedVeichleType,
} from "@store/features/cars/carsSlice";
import { useDispatch, useSelector } from "react-redux";

export interface ICarCardProp {
  subtitle?: string;
  title: string;
  distance: string;
  image: string;
  category: string;
  vehicle: any;
  totalCars: string | number;
  carPrice: any;
  onPress: () => void;
}

export default function CarCard({
  subtitle,
  title,
  distance,
  image,
  category,
  vehicle,
  totalCars,
  carPrice,
  onPress,
}: ICarCardProp) {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  //
  const handelSelect = () => {
    navigate("MapScreen", {
      veichle: vehicle,
    });
    dispatch(setSelectedVeichleType(category as any));
  };
  //

  return (
    <Pressable onPress={onPress} w="full">
      <VStack
        py={3}
        pr={4}
        bg="#fff"
        shadow="6"
        overflow="hidden"
        borderRadius={25}
        alignItems="center"
        maxW={"100%"}
      >
        <HStack>
          <Image
            source={{ uri: `data:image/jpeg;base64,${image}` }}
            alt="Renault"
            h={scale(100) + "px"}
            w={scale(250) + "px"}
            overflowX="hidden"
            resizeMode="contain"
            ml={-20}
          />
          <VStack justifyContent={"center"} maxW={"35%"} ml={6}>
            {subtitle ? (
              <Text color={"#77f81b"} fontSize={scale(10)} fontWeight={600}>
                {subtitle}
              </Text>
            ) : null}
            <Text
              w={scale(90) + "px"}
              color={"primary.200"}
              fontWeight={700}
              fontSize={scale(12)}
              textTransform={"capitalize"}
            >
              {title}
            </Text>
            <Text fontSize={scale(13)} color={"gray.100"}>
              Total Cars {totalCars}
            </Text>
            <Text fontSize={scale(13)} color={"gray.100"}>
              Distance {Number(distance).toFixed(2)} km
            </Text>
            <Button
              onPress={handelSelect}
              mt={2}
              px={1}
              py={2}
              width="90px"
              borderRadius={20}
              bg="primary.100"
              _pressed={{
                bg: "primary.200",
              }}
              _text={{
                color: "#fff",
                fontSize: scale(12),
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              Select
            </Button>
          </VStack>
        </HStack>
        <Text fontSize={scale(12)} color={"black"} fontWeight={500}>
          QAR {carPrice?.[0]?.price}
          {/* unlock + QAR 1.5/min */}
        </Text>
      </VStack>
    </Pressable>
  );
}
