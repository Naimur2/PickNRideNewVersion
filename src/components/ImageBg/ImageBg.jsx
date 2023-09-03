import { Factory } from "native-base";
import React from "react";
import { ImageBackground } from "react-native";
import imageeBg from "@assets/images/background-map.png";
import imageeBgDark from "@assets/images/background-map-dark.png";
import imageeBgLight from "@assets/images/background-map-light.png";

const ImageBack = Factory(ImageBackground);

const DarkImageBg = ({ children, ...rest }) => {
    return (
        <ImageBack
            tintColor={"amber.100"}
            source={imageeBgDark}
            flex="1"
            {...rest}
        >
            {children}
        </ImageBack>
    );
};

const LightImageBg = ({ children, ...rest }) => {
    return (
        <ImageBack
            tintColor={"amber.100"}
            source={imageeBgLight}
            flex="1"
            {...rest}
        >
            {children}
        </ImageBack>
    );
};

const DefaultImageBg = ({ children, ...rest }) => {
    return (
        <ImageBack tintColor={"amber.100"} source={imageeBg} flex="1" {...rest}>
            {children}
        </ImageBack>
    );
};

function ImageBg({ children, type, ...rest }) {
    const Background = type && type === "dark" ? DarkImageBg : LightImageBg;

    return type ? (
        <Background {...rest}>{children}</Background>
    ) : (
        <DefaultImageBg {...rest}>{children}</DefaultImageBg>
    );
}

export default React.memo(ImageBg);
