import LottieView from "lottie-react-native";
import { Center } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import loader from "@assets/lottie/splash.json";

const SplashLoader = () => {
    const lottieRef = React.useRef<LottieView>(null);

    React.useEffect(() => {
        lottieRef.current?.play();
    }, []);

    return (
        <Center flex="1" w="full" h="full">
            <LottieView
                ref={lottieRef}
                autoPlay
                loop
                source={loader}
                style={{
                    width: Dimensions.get("window").width / 2,
                    height: Dimensions.get("window").height / 2,
                }}
            />
        </Center>
    );
};

export default React.memo(SplashLoader);
