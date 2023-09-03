import ImageBg from "@components/ImageBg/ImageBg";
import Scroller from "@components/Scroller/Scroller";
import TopSection from "@components/TopSection/TopSection";
import { useNavigation, useRoute } from "@react-navigation/native";
import colors from "@theme/colors";
import { useColorMode } from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";
import UserAvatar from "@components/UserAvatar/UserAvatar";
import DocumentForm from "./DocumentForm/DocumentForm";

export default function DocumentSubmission() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();
    const parmas = useRoute().params;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerStyle: {
                alignItems: "center",
                backgroundColor:
                    colorMode === "dark"
                        ? colors.primary[100]
                        : colors.green[200],
            },
            headerShadowVisible: false,
            headerRight: () => (
                <UserAvatar
                    avatarStyle={{
                        size: scale(35) + "px",
                    }}
                />
            ),
        });
    }, [navigation]);

    return (
        <ImageBg type={colorMode}>
            <Scroller
                h="full"
                contentStyle={{
                    alignItems: "center",
                    flexGrow: 1,
                }}
            >
                <TopSection
                    title="Document Submission"
                    subtitle="Please submit documents below to unlock Car rental option"
                />
                <DocumentForm />
            </Scroller>
        </ImageBg>
    );
}
