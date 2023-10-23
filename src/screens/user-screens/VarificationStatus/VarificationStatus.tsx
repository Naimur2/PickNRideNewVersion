import BackButton from "@components/BackButton/BackButton";
import HeaderTitle from "@components/HeaderTitle/HeaderTitle";
import Scroller from "@components/Scroller/Scroller";
import { useNavigation } from "@react-navigation/native";
import colors from "@theme/colors";
import { VStack, useColorMode } from "native-base";
import React from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import VerifyStatusCard from "./VerifyStatusCard/VerifyStatusCard";
import {
    useGetEmailMobileStatusApiQuery,
    useGetGetUserDocumentsStatusApiQuery,
    userDocumentApi,
} from "@store/api/v1/userDocumentApi/userDocumentApi";
import { RefreshControl } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

export interface INotificationsList {
    _id?: string;
    title: string;
    validDate?: Date;
    status?: string;
    verified?: boolean;
}

export default function VarificationStatus() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const colormode = useColorMode();
    const dispatch = useDispatch();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="Varification Status" />,
            headerTitleAlign: "center",
            headerLeft: () => (
                <BackButton
                    color={colormode.colorMode === "dark" ? "white" : "black"}
                />
            ),
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor:
                    colormode.colorMode === "dark"
                        ? colors.dark[100]
                        : colors.light[300],
            },
        });
    }, [navigation]);
    // APi
    const { data, isLoading, refetch } = useGetGetUserDocumentsStatusApiQuery(
        undefined,
        {
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true,
        }
    );
    const {
        data: phoneData,
        isLoading: phoneLoading,
        refetch: refetchPhone,
    } = useGetEmailMobileStatusApiQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
    //
    console.log("data", phoneData);

    // Extract the documentsStatus object
    const documentsStatus = data?.data?.documentsStatus || [];

    const onRefresh = async () => {
        dispatch(userDocumentApi.util.resetApiState());
        await refetch();
        await refetchPhone();
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
            refreshControl={
                <RefreshControl
                    refreshing={isLoading || phoneLoading}
                    onRefresh={onRefresh}
                />
            }
        >
            <VStack
                space={6}
                px="6"
                pb={8}
                h="full"
                maxWidth={scale(500)}
                mx="auto"
                w="full"
                pt={Platform.OS === "android" ? 55 : 0}
                bg="light.300"
                _dark={{
                    bg: "dark.100",
                }}
            >
                <VerifyStatusCard
                    key={"Email"}
                    verified={data?.data?.customerInfo?.is_email_verified}
                    status={
                        data?.data?.customerInfo?.is_email_verified
                            ? "Approved"
                            : "Send Email"
                    }
                    title={"Email"}
                    customerInfo={data?.data?.customerInfo}
                />
                <VerifyStatusCard
                    key={"Phone"}
                    verified={data?.data?.customerInfo?.is_mobile_verified}
                    status={
                        data?.data?.customerInfo?.is_mobile_verified
                            ? "Approved"
                            : "Send OTP"
                    }
                    title={"Phone"}
                    customerInfo={data?.data?.customerInfo}
                />
                {Object.entries(documentsStatus)?.map(([title, status]) => (
                    <VerifyStatusCard
                        key={title}
                        status={status}
                        title={title}
                    />
                ))}
            </VStack>
        </Scroller>
    );
}
