import scooterBoyDark from "@assets/images/scooter-boy-dark.png";
import scooterBoy from "@assets/images/scooter-boy.png";
import BackButton from "@components/BackButton/BackButton";
import Balance from "@components/Balance/Balance";
import Card from "@components/Card/Card";
import HeaderTitle from "@components/HeaderTitle/HeaderTitle";
import Scroller from "@components/Scroller/Scroller";
import { useNavigation } from "@react-navigation/native";
import colors from "@theme/colors";
import { AlertDialog, Button, Image, useColorMode, VStack } from "native-base";
import React from "react";
import { Alert, Linking, Platform } from "react-native";
import { scale } from "react-native-size-matters";

import SettingsMenu, { ISettingsMenu } from "./SettingsMenu/SettingsMenu";
import ThemeToggler from "./ThemeToggler/ThemeToggler";
import { useDeleteUserProfileMutation } from "@store/api/v1/authApi/authApiSlice";
import { useDispatch } from "react-redux";
import { logout } from "@store/features/auth/authSlice";

export default function Settings() {
    const navigation = useNavigation();
    const [deleteUser, deleteUserLoading] = useDeleteUserProfileMutation();
    const dispatch = useDispatch();
    const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);
    const colormode = useColorMode();
    const headerColor =
        colormode.colorMode === "dark" ? colors.dark[100] : colors.light[300];

    const settingsMenus: ISettingsMenu[] = [
        {
            title: "Notifications",
            onPress: () => navigation.navigate("Notifications"),
        },
        {
            title: "Account Verification Status",
            onPress: () => navigation.navigate("VarificationStatus"),
        },
        {
            title: "Change Password",
            onPress: () =>
                navigation.navigate("ResetPassword", {
                    type: "ChangePassword",
                }),
        },
        {
            title: "Privacy Policy",
            onPress: async () => {
                await Linking.openURL("https://pickandride.qa/privacy_policy");
            },
        },
        {
            title: "Terms & Conditions",
            onPress: async () => {
                await Linking.openURL(
                    "https://pickandride.qa/terms_conditions"
                );
            },
        },
        {
            title: "Deactivate Account",
            onPress: () => setShowDeleteAlert(true),
        },
        // {
        //     title: "Report An Issue",
        //     onPress: () => navigation.navigate("ReportIssue"),
        // },
    ];

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="Settings" />,
            headerTitleAlign: "center",
            headerLeft: () => (
                <BackButton
                    color={colormode.colorMode === "dark" ? "white" : "black"}
                />
            ),
            headerRight: () => (
                <Balance iconColor="primary.100" textColor="gray.100" />
            ),
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: headerColor,
            },
        });
    }, [navigation, colormode.colorMode]);

    const handleDeleteUser = async () => {
        try {
            const response = await deleteUser(undefined).unwrap();
            dispatch(logout());
            Alert.alert(
                "Success",
                response?.message || "Account deleted successfully"
            );
        } catch (error) {
            console.log(error);
        }
    };

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
                <ThemeToggler />
                <Card py={3}>
                    {settingsMenus.map((menu, index) => (
                        <SettingsMenu py="3" key={index} {...menu} />
                    ))}
                </Card>

                <Image
                    alt="a boy with scotter"
                    source={scooterBoy}
                    _dark={{
                        source: scooterBoyDark,
                    }}
                    mx="auto"
                    height={scale(200) + "px"}
                    resizeMode="contain"
                    mt={6}
                />
            </VStack>
            <AlertDialog isOpen={showDeleteAlert} motionPreset="fade">
                <AlertDialog.Content>
                    <AlertDialog.Header fontSize="lg" fontWeight="bold">
                        Delete Account
                    </AlertDialog.Header>
                    <AlertDialog.Body>
                        Are you sure? You can't undo this action afterwards.
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button
                            onPress={() => {
                                setShowDeleteAlert(false);
                            }}
                            variant={"ghost"}
                        >
                            Cancel
                        </Button>
                        <Button
                            colorScheme="red"
                            ml="3"
                            onPress={() => {
                                setShowDeleteAlert(false);
                                handleDeleteUser();
                            }}
                        >
                            Delete
                        </Button>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </Scroller>
    );
}
