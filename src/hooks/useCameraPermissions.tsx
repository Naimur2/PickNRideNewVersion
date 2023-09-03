import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import React from "react";
import { Text, View } from "react-native";

interface CheckCameraPermission {
    hasPermission: boolean;
    askCmeraPermission: () => Promise<boolean>;
}

type CheckCameraPermissionType = () => CheckCameraPermission;

export default function useCameraPermissions(): CheckCameraPermission {
    const [hasPermission, setHasPermission] = React.useState<boolean>(false);

    const askCmeraPermission = async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const microphonePermission =
            await Camera.requestMicrophonePermissionsAsync();
        const mediaLibraryPermission =
            await MediaLibrary.requestPermissionsAsync();

        const hasCameraPermission =
            cameraPermission.status === "granted" &&
            microphonePermission.status === "granted" &&
            mediaLibraryPermission.status === "granted";

        setHasPermission(hasCameraPermission);

        return hasCameraPermission;
    };
    return { hasPermission, askCmeraPermission };
}
