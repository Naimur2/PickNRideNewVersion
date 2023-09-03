import * as Location from "expo-location";
import { LocationPermissionResponse } from "expo-location";
import { Alert, Platform } from "react-native";
import { useState } from "react";
import * as React from "react";

export default function useLocationPermissions(): {
    hasForeGroundPermissions: boolean | undefined;
    checkPermissions: () => Promise<void>;
    hasBackGroundPermissions: boolean | undefined;
} {
    const [hasBackGroundPermissions, setHasBackGroundPermissions] =
        useState(false);
    const [hasForeGroundPermissions, setHasForeGroundPermissions] =
        useState(false);

    const checkPermissions = async (): Promise<void> => {
        if (!hasForeGroundPermissions) {
            let { status, granted } =
                await Location.requestForegroundPermissionsAsync();
            const isForGranted = status === "granted" && granted;
            setHasForeGroundPermissions(isForGranted);
            if (!isForGranted) {
                alert("Permission to access location was denied");
                return;
            }

            if (isForGranted && Platform.OS === "android") {
                const backLocPerStatus =
                    await Location.getBackgroundPermissionsAsync();
                console.log(backLocPerStatus);
                if (
                    !backLocPerStatus.granted &&
                    backLocPerStatus.status !== "granted"
                ) {
                    Alert.alert(
                        "Require Background Location",
                        "Please enable background location to use this app",
                        [
                            {
                                text: "OK",
                                onPress: async () => {
                                    const backLocPerStatus =
                                        await Location.requestBackgroundPermissionsAsync();
                                    setHasBackGroundPermissions(
                                        backLocPerStatus.granted &&
                                            backLocPerStatus.status ===
                                                "granted"
                                    );
                                },
                            },
                        ]
                    );
                    return;
                } else {
                    setHasBackGroundPermissions(
                        backLocPerStatus.granted &&
                            backLocPerStatus.status === "granted"
                    );
                }
            }
        }
    };

    React.useEffect(() => {
        (async () => {
            const backStatus = await Location.getBackgroundPermissionsAsync();
            const foreStatus = await Location.getForegroundPermissionsAsync();
            setHasBackGroundPermissions(
                backStatus.granted && backStatus.status === "granted"
            );
            setHasForeGroundPermissions(
                foreStatus.granted && foreStatus.status === "granted"
            );
        })();
    }, []);

    return {
        hasBackGroundPermissions,
        checkPermissions,
        hasForeGroundPermissions,
    };
}
