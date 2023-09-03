import BackButton from "@components/BackButton/BackButton";
import {
    NativeStackNavigationOptions,
    createNativeStackNavigator,
} from "@react-navigation/native-stack";
import AddCards from "@screens/auth-screens/AddCards/AddCards";
import Login from "@screens/auth-screens/Login/Login";
import OtpScreen from "@screens/auth-screens/OtpScreen/OtpScreen";
import Register from "@screens/auth-screens/Register/Register";
import SelectArrivalDate from "@screens/auth-screens/SelectArrivalDate/SelectArrivalDate";
import SelectCitizenShip from "@screens/auth-screens/SelectCitizenShip/SelectCitizenShip";
import SplashSecond from "@screens/auth-screens/SplashSecond/SplashSecond";
import SplashThird from "@screens/auth-screens/SplashThird/SplashThird";
import { useColorMode } from "native-base";
import React from "react";

interface IStackScreenProps extends NativeStackNavigationOptions {
    colorMode: "light" | "dark";
}

export const authScreenOptions: (props: any) => IStackScreenProps = ({
    colorMode,
}: {
    colorMode: "light" | "dark";
}) => {
    return {
        headerTitle: "",
        headerTintColor: colorMode === "light" ? "black" : "white",
        headerLeft: () => <BackButton />,
        headerShadowVisible: false,
        headerTransparent: true,
        animation: "slide_from_left",
    };
};

export default function AuthRoute() {
    const Stack = createNativeStackNavigator();
    const { colorMode } = useColorMode();

    return (
        <Stack.Navigator
            screenOptions={(props: any) =>
                authScreenOptions({ ...props, colorMode })
            }
            initialRouteName="SplashSecond"
        >
            <Stack.Screen
                options={{
                    headerShown: false,
                    headerTransparent: true,
                }}
                name="SplashSecond"
                component={SplashSecond}
            />
            {/* <Stack.Screen name="SplashThird" component={SplashThird} /> */}
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />

            <Stack.Screen
                name="SelectCitizenShip"
                component={SelectCitizenShip}
            />
            <Stack.Screen
                name="SelectArrivalDate"
                component={SelectArrivalDate}
            />
            <Stack.Screen
                name="AddCards"
                component={AddCards}
                options={{
                    headerBackVisible: false,
                }}
            />
        </Stack.Navigator>
    );
}
