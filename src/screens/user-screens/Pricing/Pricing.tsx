import { useNavigation } from "@react-navigation/native";
import { HStack, Image, useColorMode, VStack } from "native-base";
import React from "react";
import { Platform, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import boyWithSooterDark from "@assets/images/boy-with-scooter-dark.png";
import boyWithSooter from "@assets/images/boy-with-scooter.png";
import BackButton from "@components/BackButton/BackButton";
import Balance from "@components/Balance/Balance";
import GradientBtn from "@components/GradientBtn/GradientBtn";
import HeaderTitle from "@components/HeaderTitle/HeaderTitle";
import Scroller from "@components/Scroller/Scroller";
import colors from "@theme/colors";
import PriceCard from "./PriceCard/PriceCard";

export default function Pricing() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const colormode = useColorMode();
    const windowHeight = useWindowDimensions().height;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="Pricing" />,
            headerTitleAlign: "center",
            headerRight: () => (
                <Balance iconColor="primary.100" textColor="gray.100" />
            ),
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor:
                    colormode.colorMode === "dark"
                        ? colors.dark[100]
                        : colors.light[300],
            },
            headerLeft: () => (
                <BackButton
                    color={colormode.colorMode === "dark" ? "white" : "black"}
                />
            ),
        });
    }, [navigation]);

    return (
        <Scroller
            contentStyle={{
                flexGrow: 1,
            }}
            bg="light.300"
            _dark={{
                bg: "dark.100",
            }}
        >
            <VStack
                space={6}
                mt={4}
                px="6"
                pb={8}
                h="full"
                maxWidth={scale(500)}
                mx="auto"
                pt={Platform.OS === "android" ? 55 : 0}
            >
                <HStack my={8} w="full" justifyContent={"space-between"}>
                    <PriceCard
                        type="lock"
                        header="QAR 3"
                        subtitle="Unlock Charge"
                    />
                    <PriceCard
                        type="clock"
                        header="QAR 1.65"
                        subtitle="/Minute"
                    />
                </HStack>
                <Image
                    mt={4}
                    source={boyWithSooter}
                    alt="boy w s"
                    _dark={{
                        source: boyWithSooterDark,
                    }}
                    height={windowHeight * 0.4}
                    resizeMode="cover"
                />
                <GradientBtn title="UPDATE PROFILE" mx="auto" />
            </VStack>
        </Scroller>
    );
}
