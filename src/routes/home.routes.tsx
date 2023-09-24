import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPassword from "@screens/auth-screens/ForgotPassword/ForgotPassword";
import ForgotPasswordOtp from "@screens/auth-screens/ForgotPasswordOtp/ForgotPasswordOtp";
import SelectAuthOtpType from "@screens/auth-screens/SelectAuthOtpType/SelectAuthOtpType";
import { IAuthState } from "@store/features/auth/authSlice.types";
import { selectAuth } from "@store/store";
import React from "react";
import { useSelector } from "react-redux";
import ResetPassword from "../screens/auth-screens/ResetPassword/ResetPassword";
import AuthRoute, { authScreenOptions } from "./auth.routes";
import DrawerRoute from "./drawer.routes";
import { useColorMode } from "native-base";
import RedirectionWebview from "@screens/common/RedirectionWebview";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function HomeRoutes() {
  const { colorMode } = useColorMode();
  const auth = useSelector(selectAuth) as IAuthState;
  // console.log("auth-----: " + JSON.stringify(auth))
  const authToken = AsyncStorage.getItem("authToken");

  return (
    <Stack.Navigator>
      {auth?.token ? (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DrawerScreens"
          component={DrawerRoute}
        />
      ) : (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="AuthScreens"
          component={AuthRoute}
        />
      )}
      <Stack.Group
        screenOptions={(props: any) =>
          authScreenOptions({ ...props, colorMode })
        }
      >
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="ForgotPasswordOtp" component={ForgotPasswordOtp} />
        <Stack.Screen name="SelectAuthOtpType" component={SelectAuthOtpType} />
      </Stack.Group>
      <Stack.Screen
        name="RedirectionWebview"
        component={RedirectionWebview}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
