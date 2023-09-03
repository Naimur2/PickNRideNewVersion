import BackButton from "@components/BackButton/BackButton";
import HeaderTitle from "@components/HeaderTitle/HeaderTitle";
import Scroller from "@components/Scroller/Scroller";
import { useNavigation } from "@react-navigation/native";
import colors from "@theme/colors";
import { useColorMode } from "native-base";
import React from "react";

export interface ISelection {
    _id: string;
    icon: string;
    title: string;
}

const selections: ISelection[] = [
    {
        _id: 0,
        title: "Veichle",
        icon: "veichle",
    },
    {
        _id: 1,
        title: "Lock",
        icon: "lock",
    },
    {
        _id: 2,
        title: "Mobile App",
        icon: "mobileApp",
    },
    {
        _id: 3,
        title: "Other",
        icon: "search",
    },
];

export default function Support() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="Support" />,
            headerTitleAlign: "center",
            headerLeft: () => (
                <BackButton color={colorMode === "dark" ? "white" : "black"} />
            ),
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor:
                    colorMode === "dark" ? colors.dark[100] : colors.light[300],
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
        ></Scroller>
    );
}
