import Scroller from "@components/Scroller/Scroller";
import { useColorMode, VStack } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ImageBg from "@components/ImageBg/ImageBg";

function ScreenWithScrollImage({ children }: { children: React.ReactNode }) {
    const { colorMode } = useColorMode();
    const inset = useSafeAreaInsets();
    return (
        <ImageBg type={colorMode}>
            <VStack flexGrow={1}>
                <Scroller
                    contentStyle={{
                        flexGrow: 1,
                        paddingHorizontal: 30,
                        paddingTop: inset.top + 40,
                        paddingBottom: 20,
                    }}
                >
                    {children}
                </Scroller>
            </VStack>
        </ImageBg>
    );
}

export default React.memo(ScreenWithScrollImage);
