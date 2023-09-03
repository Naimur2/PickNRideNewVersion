import { useColorMode } from "native-base";
import React from "react";
import ImageBg from "@components/ImageBg/ImageBg";
import Scroller from "@components/Scroller/Scroller";

import OtpForm from "./OtpForm/OtpForm";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function OtpScreen({}) {
    const { colorMode } = useColorMode();
    const inset = useSafeAreaInsets();
    return (
        <Scroller
            contentStyle={{
                flexGrow: 1,
                paddingTop: inset.top + 20,
            }}
        >
            <ImageBg type={colorMode}>
                <OtpForm />
            </ImageBg>
        </Scroller>
    );
}
