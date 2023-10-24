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
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@store/store";
import { selectSelectedVeichleType } from "@store/features/cars/carsSlice";
import useCheckVerification from "@hooks/useCheckVerification";
import WarningModal from "@components/WarningModal/WarningModal";
import { setVerifyModal } from "@store/features/ui/uiSlice";

function BottomScan({
    onLeftPress,
    handleLocate,
}: {
    onLeftPress: () => void;
    handleLocate: () => void;
}) {
    const LinearGrad = Factory(LinearGradient);
    const { hasPermission, askCmeraPermission } = useCameraPermissions();
    const { height } = Dimensions.get("window");
    const navigation = useNavigation();
    const { checkVerification } = useCheckVerification();
    const dispatch = useDispatch();

    const veichleType = useSelector(selectSelectedVeichleType);

    const handleNavigate = async () => {
        const verified = await checkVerification();
        if (verified) {
            const hasPermission = await askCmeraPermission();
            if (!hasPermission) {
                alert("You need to give camera permission to use this feature");
                return;
            }

            // if (veichleType === "car") {
            // } else {
            // }
            navigation.navigate("ScanQrCode");
        } else {
            dispatch(setVerifyModal(true));
        }
        // navigation.navigate("BarcodeScanner");
    };

    const memorizedHandleNavigate = React.useMemo(
        () => handleNavigate,
        [handleNavigate]
    );

    const insets = useSafeAreaInsets();
    //

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
                    <Pressable mx={"auto"} onPress={memorizedHandleNavigate}>
                        <Image source={scan} alt="scan" />
                    </Pressable>
                    <Pressable onPress={handleLocate}>
                        <Image source={locate} alt="locate" />
                    </Pressable>
                </HStack>
            </LinearGrad>
        </VStack>
    );
}

export default React.memo(BottomScan);
