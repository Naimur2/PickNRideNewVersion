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

export interface INotificationsList {
    _id?: string;
    title: string;
    validDate: Date;
    status: string;
}

const varificationList: INotificationsList[] = [
    {
        _id: 1,
        title: "Qatar",
        validDate: new Date(),
        status: "approved",
    },
    {
        _id: 2,
        title: "UAE",
        validDate: new Date(),
        status: "pending",
    },
    {
        _id: 3,
        title: "Saudi",
        validDate: new Date(),
        status: "rejected",
    },
    {
        _id: 4,
        title: "Dubai",
        validDate: new Date(),
        status: "expired",
    },
];

export default function VarificationStatus() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const colormode = useColorMode();

    const [varifyStatusList, setVarifyStatusList] =
        React.useState(varificationList);

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
                w="full"
                pt={Platform.OS === "android" ? 55 : 0}
            >
                {varifyStatusList?.map((item) => (
                    <VerifyStatusCard
                        key={item._id}
                        status={item.status}
                        title={item.title}
                        validDate={item.validDate}
                    />
                ))}
            </VStack>
        </Scroller>
    );
}
