import Toggler from "@assets/svgs/Toggler";
import ImageBg from "@components/ImageBg/ImageBg";
import TopSection from "@components/TopSection/TopSection";
import UserAvatar from "@components/UserAvatar/UserAvatar";
import useShowModal from "@hooks/useShowModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { IAuthState } from "@store/features/auth/authSlice.types";
import { setCurrentLocation } from "@store/features/user-location/userLocationSlice";
import { selectAuth } from "@store/store";
import colors from "@theme/colors";
import * as Location from "expo-location";
import { Center, Pressable, ScrollView, useColorMode } from "native-base";
import React from "react";
import { Alert, Platform } from "react-native";
import { scale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import VeichleCards from "./VeichleCards/VeichleCards";

export default function Dashboard() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();
    const auth: IAuthState = useSelector(selectAuth);
    const [status, requestPermission] = Location.useBackgroundPermissions();
    const showModal = useShowModal();
    const dispatch = useDispatch();

    // API CALL END
    const [isModalVisible, setIsModalVisible] = React.useState(true);

    React.useLayoutEffect(() => {
        const navigationOptions: NativeStackNavigationOptions = {
            headerTitle: "",
            headerStyle: {
                alignItems: "center",
                backgroundColor:
                    colorMode === "dark"
                        ? colors.primary[100]
                        : colors.green[200],
            },
            headerLeft: () => (
                <Pressable onPress={() => navigation.openDrawer()}>
                    <Toggler
                        mx={4}
                        _dark={{
                            color: "#000",
                        }}
                        py={2}
                        px={4}
                    />
                </Pressable>
            ),
            headerRight: () => (
                <UserAvatar
                    avatarStyle={{
                        size: scale(35) + "px",
                    }}
                />
            ),
            headerShadowVisible: false,
        };
        navigation.setOptions(navigationOptions);
    }, [navigation, colorMode]);

    const setIsModalVisibleHandler = (value: boolean) => {
        setIsModalVisible(value);
        AsyncStorage.setItem("isModalVisible", value.toString());
    };

    // React.useEffect(() => {
    //     !(async function () {
    //         const hasForePermission =
    //             await Location.getForegroundPermissionsAsync();
    //         const hasBackPermission =
    //             await Location.getBackgroundPermissionsAsync();

    //         const res = await PermissionsAndroid.check(
    //             PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    //         );

    //         if (
    //             hasForePermission.status === "granted" &&
    //             hasBackPermission.status === "granted" &&
    //             res
    //         ) {
    //             AsyncStorage.getItem("isModalVisible").then((value) => {
    //                 if (value) {
    //                     setIsModalVisibleHandler(value === "true");
    //                 }
    //             });
    //         }
    //     })();
    // }, []);

    React.useEffect(() => {
        const checkPermissionsAndSetLocation = async () => {
            if (Platform.OS === "android") {
                const res = await Location.requestForegroundPermissionsAsync();
                if (res.status === "granted") {
                    const backRes =
                        await Location.isBackgroundLocationAvailableAsync();
                    if (backRes && status.status !== "granted") {
                        Alert.alert(
                            "We need to access your background location",
                            "Please allow location access from settings",
                            [
                                {
                                    text: "Cancel",
                                    onPress: () =>
                                        console.log("Cancel Pressed"),
                                    style: "cancel",
                                },
                                {
                                    text: "OK",
                                    onPress: () => {
                                        Location.requestBackgroundPermissionsAsync();
                                    },
                                },
                            ]
                        );
                    }
                }
            } else {
                const res = await Location.requestForegroundPermissionsAsync();

                if (res.status === "granted") {
                    const {
                        coords: { latitude, longitude },
                    } = await Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.BestForNavigation,
                    });
                    dispatch(setCurrentLocation({ latitude, longitude }));
                } else {
                    Alert.alert(
                        "Permission Denied",
                        "Please allow location access from settings",
                        [
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel",
                            },
                            {
                                text: "OK",
                                onPress: () => console.log("OK Pressed"),
                            },
                        ]
                    );
                }
            }
        };
        checkPermissionsAndSetLocation();
    }, []);

    // React.useEffect(() => {
    //     showModal("error", {
    //         title: "Error",
    //         message: "Please submit all of your documents to unlock your ride",
    //     });
    // }, []);

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
                flexGrow: 1,
            }}
        >
            <ImageBg type={colorMode} flexGrow={1}>
                <Center pb={5}>
                    <TopSection
                        title={`Good Evening ${auth?.f_name}!`}
                        subtitle="Select your ride"
                    />

                    <VeichleCards />
                </Center>
            </ImageBg>
            {/* <DashModal
                isOpen={isModalVisible}
                onClose={() => {
                    setIsModalVisibleHandler(false);
                }}
            /> */}
        </ScrollView>
    );
}
