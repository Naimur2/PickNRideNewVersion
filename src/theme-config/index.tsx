import {
    Montserrat_100Thin,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light,
    Montserrat_300Light_Italic,
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black,
    Montserrat_900Black_Italic,
    useFonts,
} from "@expo-google-fonts/montserrat";

import * as SplashScreen from "expo-splash-screen";

import { NativeBaseProvider, StatusBar } from "native-base";
import React from "react";
import theme from "./config";

import SplashLoader from "@layouts/SplashScreen";

SplashScreen.preventAutoHideAsync();

export default function ThemeConFig({
    children,
}: {
    children: React.ReactNode;
}) {
    let [fontsLoaded] = useFonts({
        Montserrat_100Thin,
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
        Montserrat_700Bold,
        Montserrat_800ExtraBold,
        Montserrat_900Black,
        Montserrat_100Thin_Italic,
        Montserrat_200ExtraLight_Italic,
        Montserrat_300Light_Italic,
        Montserrat_400Regular_Italic,
        Montserrat_500Medium_Italic,
        Montserrat_600SemiBold_Italic,
        Montserrat_700Bold_Italic,
        Montserrat_800ExtraBold_Italic,
        Montserrat_900Black_Italic,
    });

    const [showSplash, setShowSplash] = React.useState(true);

    React.useEffect(() => {
        const fontsChecker = async () => {
            if (fontsLoaded) {
                await SplashScreen.hideAsync();
                const timer = setTimeout(() => {
                    setShowSplash(false);
                }, 10000);
                return () => {
                    clearTimeout(timer);
                };
            }
        };
        fontsChecker();
    }, [fontsLoaded]);

    return (
        <NativeBaseProvider theme={theme} isSSR={false}>
            <StatusBar backgroundColor={"#fff"} />
            {!fontsLoaded || showSplash ? <SplashLoader /> : children}
        </NativeBaseProvider>
    );
}
