import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Factory, HStack, Text, VStack } from "native-base";
import React from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import Balance from "@components/Balance/Balance";
import { Instagram, Whatsapp } from "@components/Icons/Icons";
import Scroller from "@components/Scroller/Scroller";
import UserAvatar from "@components/UserAvatar/UserAvatar";

import { logout } from "@store/features/auth/authSlice";
import DrawerBtn from "./components/DraweBtn/DrawerBtn";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@store/store";
import { IAuthState } from "../../redux/features/auth/authSlice.types";
import { formatCountSuffix } from "../../utils/formatCountSuffix";
import { clearCarTrip } from "@store/features/car-trip/carTripSlice";
import { clearDocument } from "@store/features/document/documentSlice";
import { IMyFatooraRouteParams } from "../MyFatooraScreens/types/myfatoora.interface";

interface IDrawerMenuItem {
    title: string;
    onPress: () => void;
}

export default function CustomDrawer() {
    const Lg = Factory(LinearGradient);
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();

    const auth = useSelector(selectAuth);

    const { height } = useWindowDimensions();

    const drawermenu: IDrawerMenuItem[] = [
        {
            title: "Home",
            onPress: () => navigation.navigate("Dashboard" as never),
        },
        {
            title: "Account",
            onPress: () => navigation.navigate("Account" as never),
        },
        {
            title: "Pricing",
            onPress: () => navigation.navigate("Pricing" as never),
        },
        {
            title: "Ride History",
            onPress: () => navigation.navigate("RideHistory" as never),
        },
        {
            title: "Wallet",
            onPress: () =>
                navigation.navigate("MFPayment", {
                    paymentFor: "recharge",
                } as IMyFatooraRouteParams),
        },
        {
            title: "Cars",
            onPress: () => navigation.navigate("Cars" as never),
        },

        {
            title: "Settings",
            onPress: () => navigation.navigate("Settings" as never),
        },
    ];

    return (
        <>
            <Scroller
                contentStyle={{
                    flexGrow: 1,
                }}
            >
                <Lg
                    colors={["#52BF04", "#52BE04", "#038C0C"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    flex="1"
                    py="4"
                    px={7}
                    height={height}
                >
                    <HStack
                        mt={4 + insets.top + "px"}
                        alignItems="center"
                        justifyContent={"space-between"}
                    >
                        <UserAvatar />
                        <Balance
                            balance={formatCountSuffix(auth.wallet as number)}
                            currency={"QAR"}
                        />
                    </HStack>
                    <VStack mt={10}>
                        <Text
                            color={"#fff"}
                            fontSize={scale(13)}
                            fontWeight={600}
                        >
                            Welcome Back
                        </Text>
                        <Text
                            lineHeight={45}
                            color={"#fff"}
                            fontSize={scale(34)}
                            fontWeight={700}
                            adjustsFontSizeToFit
                            numberOfLines={1}
                            maxFontSizeMultiplier={1.5}
                            textTransform={"capitalize"}
                        >
                            {auth?.f_name}
                        </Text>
                    </VStack>
                    <VStack mt={3}>
                        {drawermenu.map((item, index) => (
                            <DrawerBtn
                                title={item.title}
                                onPress={item.onPress}
                                key={index.toString() + item.title}
                            />
                        ))}
                    </VStack>
                    <VStack mt={4}>
                        <Button
                            variant={"outline"}
                            _text={{
                                color: "#fff",
                                fontSize: scale(13),
                                fontWeight: 700,
                                textTransform: "uppercase",
                            }}
                            borderWidth={3}
                            borderRadius={16}
                            borderColor={"#fff"}
                            onPress={() => {
                                dispatch(clearDocument());
                                dispatch(clearCarTrip());
                                dispatch(logout());
                            }}
                        >
                            SIGN OUT
                        </Button>
                    </VStack>
                    <HStack space={4} mt={6} mb={4}>
                        <Whatsapp color={"#fff"} />
                        <Instagram color={"#fff"} />
                    </HStack>
                </Lg>
            </Scroller>
        </>
    );
}
