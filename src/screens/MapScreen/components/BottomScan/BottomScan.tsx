import locate from "@assets/images/locate.png";
import scan from "@assets/images/scan.png";
import { ErrorOutline } from "@components/Icons/Icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Factory, HStack, Image, Pressable, VStack } from "native-base";
import React from "react";

import { Dimensions } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import useCameraPermissions from "../../../../hooks/useCameraPermissions";
import { useSelector } from "react-redux";
import { selectAuth } from "@store/store";
import { selectSelectedVeichleType } from "@store/features/cars/carsSlice";

function BottomScan({ onLeftPress }: { onLeftPress: () => void }) {
    const LinearGrad = Factory(LinearGradient);
    const { hasPermission, askCmeraPermission } = useCameraPermissions();
    const { height } = Dimensions.get("window");

    const veichleType = useSelector(selectSelectedVeichleType);

    console.log({ veichleType });

    const navigation = useNavigation();

    const handleNavigate = async () => {
        const hasPermission = await askCmeraPermission();
        if (!hasPermission) {
            alert("You need to give camera permission to use this feature");
            return;
        }

        if (veichleType === "car") {
            navigation.navigate("ScanQrCode");
        } else {
            navigation.navigate("BarcodeScanner");
        }
    };

    const insets = useSafeAreaInsets();
    return (
        <VStack space="6" w="full" position={"absolute"} bottom={0}>
            <LinearGrad
                colors={["#ffffff", "#ffffff40"]}
                start={[0, 1]}
                end={[0, 0]}
                pt={6}
                pb={24 + insets.bottom + "px"}
            >
                <HStack alignItems="flex-end" px={4}>
                    <ErrorOutline onPress={onLeftPress} />
                    <Pressable mx={"auto"} onPress={handleNavigate}>
                        <Image source={scan} alt="scan" />
                    </Pressable>
                    <Image source={locate} alt="locate" />
                </HStack>
            </LinearGrad>
        </VStack>
    );
}

export default React.memo(BottomScan);
