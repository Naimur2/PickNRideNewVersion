import car from "@assets/images/car-small.png";
import cycle from "@assets/images/cycle-small.png";
import scooter from "@assets/images/veichle.png";
import { Box, Image, Pressable, VStack } from "native-base";
import React from "react";
import { TCarType } from "@store/features/cars/carsSlice.types";

const ScooterImage = ({ imageWidth }: { imageWidth: number }) => (
    <Image
        w={imageWidth + "px"}
        h={imageWidth + "px"}
        resizeMode="contain"
        source={scooter}
        alt="cycle"
        tintColor={"#fff"}
    />
);
const CycleImage = ({ imageWidth }: { imageWidth: number }) => (
    <Image
        w={imageWidth + "px"}
        h={imageWidth + "px"}
        resizeMode="contain"
        source={cycle}
        alt="cycle"
        tintColor={"#fff"}
    />
);

const CarImage = ({ imageWidth }: { imageWidth: number }) => (
    <Image
        w={imageWidth + "px"}
        h={imageWidth + "px"}
        resizeMode="contain"
        source={car}
        alt="cycle"
        tintColor={"#fff"}
    />
);

const images = {
    car: CarImage,
    cycle: CycleImage,
    scooter: ScooterImage,
};

function ViichleCircle({
    type,
    onPress,
    isActive,
    imageWidth = 14,
    ...rest
}: {
    type: TCarType;
    isActive: boolean;
    onPress: () => void;
    imageWidth?: number;
}) {
    const ImageToRender = images[type] || ScooterImage;
    return (
        <VStack alignItems={"center"} space="1.5">
            <Pressable
                bg={isActive ? "primary.100" : "#CAE5B7"}
                borderWidth={3}
                borderColor="#fff"
                p="8px"
                borderRadius={50}
                {...rest}
                onPress={onPress}
            >
                <ImageToRender imageWidth={imageWidth} />
            </Pressable>
            {isActive ? (
                <Box bg="primary.100" h="4px" w="6" borderRadius={4} />
            ) : null}
        </VStack>
    );
}

export default React.memo(ViichleCircle);
