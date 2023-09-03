import clockFill from "@assets/images/clock-fill.png";
import locationFilled from "@assets/images/location-filled.png";
import locationOutline from "@assets/images/location-outline.png";
import CModal from "@components/CModal/CModal";
import H3 from "@components/H3/H3";
import { Box, Center, HStack, Image, Text, VStack } from "native-base";
import React from "react";

import { ILatLng } from "@screens/MapScreen/MapScreen.types";
import { useGetAddressByCoordinatesQuery } from "@store/api/v3/mapsApiSlice";
import { Rating } from "react-native-ratings";
import { scale } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import MarkerBar from "../LocationMarker/LocationMarker";
import { fontSizes } from "@theme/typography";

export default function RideCompleteModal({
    isOpen,
    onClose,
    startLocation,
    endLocation,
    distanceTravelled,
    timeElapsed,
    amount = 0,
}: {
    isOpen: boolean;
    onClose: () => void;
    startLocation?: ILatLng;
    endLocation?: ILatLng;
    distanceTravelled?: number;
    timeElapsed?: number;
    amount?: number;
}) {
    const dispatch = useDispatch();

    const {
        data: startPosition,
        isLoading,
        error: errorStart,
    } = useGetAddressByCoordinatesQuery(
        {
            latitude: startLocation?.latitude,
            longitude: startLocation?.longitude,
        },
        {
            skip:
                startLocation?.latitude && startLocation?.longitude
                    ? false
                    : true,
        }
    );
    const {
        data: endPosition,
        isLoading: isLoadingEnd,
        error: errorEnd,
    } = useGetAddressByCoordinatesQuery(
        {
            latitude: endLocation?.latitude,
            longitude: endLocation?.longitude,
        },
        {
            skip:
                endLocation?.latitude && endLocation?.longitude ? false : true,
        }
    );

    const loc1 = startPosition?.results[0]?.formatted_address;
    const loc2 = endPosition?.results[0]?.formatted_address;

    console.log(isLoading, isLoadingEnd, errorStart, errorEnd);

    if (isLoading || isLoadingEnd) {
        return null;
    }

    return (
        <CModal
            isOpen={isOpen}
            p="0"
            _dark={{
                bg: "dark.100",
            }}
            onClose={onClose}
        >
            <VStack bg="primary.100" w="100%" p={2}>
                <Text
                    fontSize={scale(16)}
                    fontWeight={700}
                    textAlign={"center"}
                    color="#fff"
                >
                    Ride completed
                </Text>
            </VStack>

            <VStack
                mb={4}
                alignItems={"center"}
                space={4}
                justifyContent={"center"}
            >
                <MarkerBar />
                <H3 mb="0" pb={"0"} fontSize={scale(14)}>
                    Ride Parked Successfully
                </H3>
            </VStack>

            <Text
                fontSize={fontSizes["2xl"]}
                fontWeight={700}
                textAlign={"center"}
                color="#000"
                _dark={{
                    color: "#fff",
                }}
                my={4}
            >
                {amount} QAR
            </Text>

            <VStack w={"full"} px={8}>
                <HStack space={8}>
                    <Text
                        fontSize={scale(13)}
                        fontWeight={500}
                        color="gray.100"
                        _dark={{
                            color: "#fff",
                        }}
                        w="20%"
                    >
                        Start
                    </Text>
                    <HStack space={4} w="80%">
                        <Center
                            borderRadius={50}
                            h={"30px"}
                            w={"30px"}
                            bg="red.100"
                            borderWidth={2}
                            borderColor="#fff"
                        >
                            <Image
                                w="12px"
                                resizeMode="contain"
                                source={locationOutline}
                                alt="loc"
                                tintColor={"#fff"}
                            />
                        </Center>
                        <Text
                            fontSize={scale(13)}
                            fontWeight={500}
                            color="gray.100"
                            _dark={{
                                color: "#fff",
                            }}
                            maxW="150px"
                        >
                            {loc1}
                        </Text>
                    </HStack>
                </HStack>

                <HStack>
                    <VStack>
                        <Box
                            ml={"60%"}
                            mt={-4}
                            h="60px"
                            w="5px"
                            bg="primary.100"
                        />
                    </VStack>
                </HStack>

                <HStack space={8}>
                    <Text
                        fontSize={scale(13)}
                        fontWeight={500}
                        color="gray.100"
                        _dark={{
                            color: "#fff",
                        }}
                        w="20%"
                    >
                        End
                    </Text>
                    <HStack space={4} w={"80%"}>
                        <Center
                            borderRadius={50}
                            h={"30px"}
                            w={"30px"}
                            bg="primary.100"
                            borderWidth={2}
                            borderColor="#fff"
                        >
                            <Image
                                w="12px"
                                resizeMode="contain"
                                source={locationOutline}
                                alt="loc"
                                tintColor={"#fff"}
                            />
                        </Center>
                        <Text
                            fontSize={scale(13)}
                            fontWeight={500}
                            color="gray.100"
                            _dark={{
                                color: "#fff",
                            }}
                            maxW="150px"
                        >
                            {loc2}
                        </Text>
                    </HStack>
                </HStack>
            </VStack>

            <HStack mt={4} w="100%" py={4} pr={6}>
                <HStack
                    borderRadius={14}
                    py={2}
                    px={4}
                    bg={"primary.100"}
                    position="relative"
                    ml={1}
                    alignItems="center"
                    ml={"40px"}
                >
                    <VStack
                        h={"35px"}
                        w={"45px"}
                        shadow={9}
                        bg={"#fff"}
                        borderRadius={"10px"}
                        alignItems="center"
                        justifyContent="center"
                        ml={"-40px"}
                        mr={"8px"}
                    >
                        <Image
                            h="20px"
                            w="20px"
                            source={locationFilled}
                            alt="icon"
                            resizeMode="contain"
                        />
                    </VStack>
                    <VStack>
                        <Text
                            fontWeight={700}
                            fontSize={scale(16)}
                            color={"#fff"}
                        >
                            {distanceTravelled} km
                        </Text>
                        <Text
                            fontWeight={500}
                            fontSize={scale(10)}
                            color={"#fff"}
                        >
                            Distance
                        </Text>
                    </VStack>
                </HStack>
                <HStack
                    borderRadius={14}
                    py={2}
                    px={4}
                    bg={"primary.100"}
                    position="relative"
                    ml={"40px"}
                    alignItems="center"
                >
                    <VStack
                        h={"35px"}
                        w={"45px"}
                        shadow={9}
                        bg={"#fff"}
                        borderRadius={"10px"}
                        alignItems="center"
                        justifyContent="center"
                        ml={"-40px"}
                        mr={"8px"}
                    >
                        <Image
                            h="20px"
                            w="20px"
                            source={clockFill}
                            alt="icon"
                            resizeMode="contain"
                        />
                    </VStack>
                    <VStack>
                        <Text
                            fontWeight={700}
                            fontSize={scale(16)}
                            color={"#fff"}
                        >
                            {timeElapsed} min
                        </Text>
                        <Text
                            fontWeight={500}
                            fontSize={scale(10)}
                            color={"#fff"}
                        >
                            Time
                        </Text>
                    </VStack>
                </HStack>
            </HStack>

            <H3 pt={4} fontSize={scale(15) + "px"}>
                How was your trip?
            </H3>
            <VStack py={2} bg="#fff" w="full">
                <Rating
                    count={5}
                    defaultRating={3}
                    imageSize={20}
                    ratingColor="#52BF04"
                    style={{
                        backgroundColot: "transparent",
                    }}
                    ratingContainerStyle={{
                        backgroundColor: "transparent",
                    }}
                />
            </VStack>
        </CModal>
    );
}
