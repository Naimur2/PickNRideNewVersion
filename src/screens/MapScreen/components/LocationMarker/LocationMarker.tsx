import carImage from "@assets/images/car-small.png";
import { Image, VStack } from "native-base";
import { IVeichle } from "../../MapScreen.types";

interface IMarker {
    fuelPercentage: number;
    type: "scooter" | "park" | "cycle" | "car";
    imageStyle?: any;
}

const MarkerBar = ({ fuelStatus, fuelIndicator }: IVeichle) => {
    console.log({ fuelStatus, fuelIndicator });
    const background = "green";

    const bg = {
        green: "#7EFC0070",
        yellow: "#FFFF00",
        red: "#FF0000",
    };

    return (
        <VStack
            position={"relative"}
            bg={(bg[background] as string) || "amber.100"}
            h="46px"
            w="46px"
            borderRadius="full"
            p="4px"
        >
            <VStack
                alignItems={"center"}
                justifyContent={"center"}
                rounded={"full"}
                bg="#fff"
                w="full"
                h="full"
            >
                <Image
                    alt="car"
                    source={carImage}
                    h="24px"
                    w="24px"
                    resizeMode="contain"
                />
            </VStack>
        </VStack>
    );
};

export default MarkerBar;
