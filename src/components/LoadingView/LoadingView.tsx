import loader from "@assets/lottie/pic-loading.json";
import LottieView from "lottie-react-native";
import React from "react";
import { Dimensions } from "react-native";

export default function LoadingView() {
    return (
        <LottieView
            style={{
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height / 2,
            }}
            source={loader}
            autoPlay
            loop
        />
    );
}
