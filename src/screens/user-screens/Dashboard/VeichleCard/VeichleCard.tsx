import { TCarType } from "@store/features/cars/carsSlice.types";
import { fontSizes } from "@theme/typography";
import { Center, HStack, Image, Text, VStack } from "native-base";
import React, { Component, useState } from "react";
import { Animated, Dimensions } from "react-native";
import { scale } from "react-native-size-matters";

const { width, height } = Dimensions.get("window");
export interface IVeichleCardProps {
    id?: string | number;
    image: any;
    title: string;
    distance: string;
    availableNumber: string;
    type: TCarType;
    item?: any;
}
interface Location {
    latitude: number;
    longitude: number;
}

function VCard({
    image,
    title,
    distance,
    availableNumber,
    item,
}: IVeichleCardProps) {
    const [currentLocation, setCurrentLocation] = useState<Location | null>(
        null
    );
    const [destinationLocation, setDestinationLocation] = useState<Location>({
        latitude: 25.337032,
        longitude: 51.4713024,
    });
    // useEffect(() => {
    //   // Get your current location
    //   Geolocation.getCurrentPosition(
    //     (position) => {
    //       const { latitude, longitude } = position.coords;
    //       setCurrentLocation({ latitude, longitude });
    //     },
    //     (error) => {
    //       console.error(error.message);
    //     },
    //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    //   );

    //   // Configure your reverse geocoding API key (you need to obtain one)
    //   Geocoding.init(config.MAPS_API);
    // }, []);

    // useEffect(() => {
    //   if (currentLocation) {
    //     // Calculate distance in meters
    //     const distanceInMeters = Geolib.getDistance(
    //       currentLocation,
    //       destinationLocation
    //     );

    //     // Convert distance to kilometers
    //     const distanceInKilometers = distanceInMeters / 1000;

    //     // Reverse geocoding to get location name
    //     Geocoding.from(currentLocation.latitude, currentLocation.longitude)
    //       .then((json) => {
    //         const locationName = json.results[0].formatted_address;
    //         console.log("Distance (km):", distanceInKilometers);
    //         console.log("Location Name:", locationName);
    //       })
    //       .catch((error) => {
    //         console.error("Error fetching location name:", error);
    //       });
    //   }
    // }, [currentLocation, destinationLocation]);
    // //
    // console.log("currentLocation", currentLocation);

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
                maxWidth={scale(500)}
                mx="auto"
            >
                <Image
                    source={{ uri: `data:image/jpeg;base64,${image}` }}
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
                            Distance {distance}km
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
