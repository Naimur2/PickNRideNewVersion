import { Box, HStack, Image, Text, VStack, Pressable } from "native-base";
import React from "react";
import Card from "@components/Card/Card";
import Station, { IStation } from "../Station/Station";

import { scale } from "react-native-size-matters";
import clock from "@assets/images/clock.png";
import locationOutline from "@assets/images/location-outline.png";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "@theme/colors";
import { useNavigation } from "@react-navigation/native";

export interface IHistoryCard {
  _id: string;
  starting: IStation;
  destination: IStation;
  duration: string;
  fair: number;
  distance: number;
  rideId: string;
}
function HistoryCard({
  starting,
  destination,
  duration,
  fair,
  distance,
  rideId,
}: IHistoryCard) {
  const navigation = useNavigation();

  return (
    <>
      <VStack px="4">
        <Card py="0" px="0" overflow="hidden" my="2">
          <Pressable
            onPress={() =>
              navigation.navigate("Receipt", {
                tripId: rideId,
              })
            }
          >
            <HStack position={"relative"}>
              <VStack w="12%" alignItems={"center"} bg="primary.100">
                <Box mt={6} w="4" h="4" borderRadius={16} bg="#B6E495" />
                <Box
                  top={6}
                  w="4"
                  h="4"
                  bg="primary.100"
                  position={"absolute"}
                  right={-8}
                  style={{
                    transform: [{ rotate: "45deg" }],
                  }}
                />
                <Box
                  top={"90px"}
                  w="4"
                  h="4"
                  bg="primary.100"
                  position={"absolute"}
                  right={-8}
                  style={{
                    transform: [{ rotate: "45deg" }],
                  }}
                />

                <VStack space="1">
                  <Box w="3px" h="5px" bg="#B6E495" />
                  <Box w="3px" h="5px" bg="#B6E495" />
                  <Box w="3px" h="5px" bg="#B6E495" />
                  <Box w="3px" h="5px" bg="#B6E495" />
                  <Box w="3px" h="5px" bg="#B6E495" />
                  <Box w="3px" h="5px" bg="#B6E495" />
                </VStack>

                <Box w="4" h="4" borderRadius={16} bg="light.100" />
              </VStack>
              <VStack w="88%">
                <VStack p={4} space={8}>
                  <Station
                    locationName={starting?.locationName}
                    time={starting?.time}
                  />
                  <Station
                    locationName={destination?.locationName}
                    time={destination?.time}
                    fair={fair}
                  />
                </VStack>
                <HStack
                  px="4"
                  py="4"
                  bg="#EBF7E2"
                  w="100%"
                  justifyContent={"space-between"}
                >
                  <HStack alignItems={"center"} space="1.5">
                    <Image
                      w="18px"
                      h="18px"
                      resizeMode="contain"
                      source={locationOutline}
                      alt="loc"
                      tintColor={"primary.100"}
                    />
                    <Text color={"#000"} fontSize={scale(12)} fontWeight="500">
                      {distance}
                    </Text>
                  </HStack>
                  <HStack alignItems={"center"} space="1.5">
                    <HStack alignItems={"center"} space="1.5" mr={2}>
                      <Image
                        w="18px"
                        h="18px"
                        resizeMode="contain"
                        source={clock}
                        alt="loc"
                      />
                      <Text
                        color={"#000"}
                        fontSize={scale(12)}
                        fontWeight="500"
                      >
                        {duration}
                      </Text>
                    </HStack>
                    <Pressable
                      onPress={() =>
                        navigation.navigate("ReportIssue", {
                          tripId: rideId,
                        })
                      }
                    >
                      <FontAwesome5
                        name="font-awesome-flag"
                        size={18}
                        color={colors.primary[100]}
                      />
                    </Pressable>
                  </HStack>
                </HStack>
              </VStack>
            </HStack>
          </Pressable>
        </Card>
      </VStack>
    </>
  );
}

export default React.memo(HistoryCard);
