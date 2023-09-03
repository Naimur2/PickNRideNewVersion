import { useNavigation } from "@react-navigation/native";

import BackButton from "@components/BackButton/BackButton";
import React from "react";
import { StyleSheet } from "react-native";
import CameraComp from "./CameraComp/CameraComp";

export default function CameraView() {
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <BackButton color={"#fff"} />,
            headerTransparent: true,
            headerShown: false,
        });
    }, [navigation]);

    return <CameraComp />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "transparent",
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: "flex-end",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
});
