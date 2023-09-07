import ImageBg from "@components/ImageBg/ImageBg";
import Scroller from "@components/Scroller/Scroller";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  useAppleSignInMutation,
  useGoogleSignInMutation,
} from "@store/api/v2/authorizationApi";
import { fontSizes } from "@theme/typography";
import { IAuthState } from "@store/features/auth/authSlice.types";
import { selectAuth } from "@store/store";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { HStack, Text, VStack, useColorMode } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import SignInInputForm from "./SignInInputForm/SignInInputForm";
import SocialButton from "./SocialButton/SocialButton";
import { login } from "@store/features/auth/authSlice";

export default function Login() {
  const { colorMode } = useColorMode();
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [urlString, setUrlString] = React.useState("");

  const [googleSignInFn, googleSignInResult] = useGoogleSignInMutation();
  const [appleSignInFn, appleSignInInResult] = useAppleSignInMutation();

  React.useEffect(() => {
    Linking.addEventListener("url", handleOpenURL);

    return () => {
      Linking.removeEventListener("url", handleOpenURL);
    };
  }, []);

  const googleSignIn = async () => {
    try {
      const data = await googleSignInFn(undefined).unwrap();
      const { authUrl } = data?.data;
      console.log("Auth Url", authUrl);
      const redirectUrl = authUrl?.split("redirect_uri=")[1];
      console.log("Redirect", redirectUrl);
      const baseUrl = authUrl?.split("redirect_uri=")[0].replace(" ", "%20");
      const authUrlWithoutSpace = authUrl?.replace(" ", "%20");
      const linkingUrl = Linking.createURL(redirectUrl, {
        scheme: "picknride",
      });
      const baseUrlWithlinkingUrl = baseUrl + "redirect_uri=" + linkingUrl;

      const info = await WebBrowser.openAuthSessionAsync(
        authUrlWithoutSpace,
        redirectUrl
      );

      // If the user successfully signed in and redirected back
      if (info.type === "success") {
        // Close the browser
        WebBrowser.dismissBrowser();

        // Extract the data from the URL or perform any necessary actions

        console.log(url);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleOpenURL = async (event: any) => {
    const url = event.url;
    if (url.includes("picknride://") && url.includes("token=")) {
      const query = url.split("?")[1];
      const data = query.split("&");
      const loginData = data?.reduce((acc: any, curr: any) => {
        const [key, value] = curr.split("=");
        const regex = /%20/gi;
        const keyString = key.replace(regex, " ");
        const valueString = value.replace(regex, " ");
        acc[keyString] = valueString;
        return acc;
      }, {});

      console.log("Login Data:", loginData); // Log the extracted login data
    }
  };

  function extractQueryParameters(url: any): Record<any, any> {
    const queryString = url.split("?")[1];
    if (!queryString) {
      return {};
    }

    const parameterPairs = queryString.split("&");
    const parameters: Record<string, string> = {};

    parameterPairs.forEach((pair) => {
      const [key, value] = pair.split("=");
      if (key && value) {
        const decodedKey = decodeURIComponent(key);
        const decodedValue = decodeURIComponent(value);
        parameters[decodedKey] = decodedValue;
      }
    });

    return parameters;
  }

  const appleSignIn = async () => {
    try {
      const data = await appleSignInFn(undefined).unwrap();
      const { authUrl } = data?.data;
      if (authUrl) {
        const authUrlWithoutSpace = authUrl?.replace(" ", "%20");
        const result = await WebBrowser.openAuthSessionAsync(
          authUrlWithoutSpace,
          "picknride://"
        );
        console.log("data from apple(auth url)");
        const appleUrlData = extractQueryParameters(result.url);
        if (appleUrlData?.token) {
          try {
            dispatch(login(appleUrlData));
            const auth = useSelector(selectAuth) as IAuthState;
            console.log("auth---+++++++--: " + JSON.stringify(auth));
          } catch (error) {
            console.log("Error storing authentication token:", error);
          }
        }
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBg type={colorMode}>
      <Scroller
        contentStyle={{
          flexGrow: 1,
          paddingHorizontal: 30,
          paddingTop: inset.top + 20,
          paddingBottom: 20,
        }}
      >
        <VStack alignItems={"center"} space="4">
          <Text
            mt={scale(30) + "px"}
            color="primary.200"
            fontSize={fontSizes.md}
            fontWeight="bold"
          >
            Login
          </Text>
          <Text
            color="gray.100"
            fontSize={scale(13) + "px"}
            fontWeight="500"
            w={scale(170) + "px"}
            textAlign={"center"}
            _dark={{
              color: "light.200",
            }}
          >
            Enter your login details toaccess your account
          </Text>
        </VStack>

        <SignInInputForm />

        <VStack space={4} mt={6}>
          <SocialButton type={"apple"} onPress={appleSignIn} />
          <SocialButton type={"google"} onPress={googleSignIn} />
        </VStack>

        <HStack my={4} alignItems={"center"} justifyContent="center" space={2}>
          <Text
            color={"gray.100"}
            fontWeight={500}
            fontSize={scale(13) + "px"}
            _dark={{
              color: "light.100",
            }}
          >
            Need an account?
          </Text>
          <Text
            onPress={() => navigation.navigate("Register")}
            color={"gray.200"}
            fontWeight={500}
            fontSize={scale(13) + "px"}
            _dark={{
              color: "light.100",
            }}
          >
            Sign Up
          </Text>
        </HStack>
      </Scroller>
    </ImageBg>
  );
}
