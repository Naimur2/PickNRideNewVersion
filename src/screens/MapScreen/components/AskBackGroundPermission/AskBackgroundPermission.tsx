import CModal from "@components/CModal/CModal";
import GradientBtn from "@components/GradientBtn/GradientBtn";
import {
    selectHasBackgroundLocationPermission,
    setHasBackgroundLocationPermission,
} from "@store/features/user-location/userLocationSlice";
import { fontSizes } from "@theme/typography";
import * as Location from "expo-location";
import { LocationPermissionResponse } from "expo-location";
import { Text, VStack } from "native-base";
import * as React from "react";
import { Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
export default function AskBackgroundPermission() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = React.useState(false);

    const hasBackgroundPermission = useSelector(
        selectHasBackgroundLocationPermission
    );

    const [status, requestPermission] = Location.useBackgroundPermissions();

    const handleGetBackgrondLocationPermission = async () => {
        const locationStatus: LocationPermissionResponse =
            await requestPermission();
        const hasBackgroundLocationPermission =
            locationStatus.granted && locationStatus.status === "granted";

        if (hasBackgroundLocationPermission && !hasBackgroundPermission) {
            console.log({ hasBackgroundLocationPermission });
            dispatch(
                setHasBackgroundLocationPermission(
                    hasBackgroundLocationPermission
                )
            );
        }
    };

    console.log(hasBackgroundPermission);
    return (
        <CModal
            isOpen={!hasBackgroundPermission && Platform.OS !== "ios"}
            onClose={() => {
                setShowModal(false);
                handleGetBackgrondLocationPermission();
            }}
        >
            <VStack space={5} justifyContent="center" alignItems="center">
                <Text
                    fontWeight={"semibold"}
                    fontSize={fontSizes.sm}
                    textAlign={"center"}
                >
                    To achieve location tracking in background, you need to
                    enable background location permission in your device
                </Text>
                <GradientBtn
                    title="Enable"
                    onPress={handleGetBackgrondLocationPermission}
                />
            </VStack>
        </CModal>
    );
}
