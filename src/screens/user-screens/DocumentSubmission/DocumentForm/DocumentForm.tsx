import { Pressable, VStack, useColorMode } from "native-base";
import React from "react";

import Collapsible from "react-native-collapsible";
import { scale } from "react-native-size-matters";
import H3 from "@components/H3/H3";
import { fontSizes } from "@theme/typography";
import IdSubmission from "../IdSubmission";
import LiscenseSubmissions from "../LiscenseSubmissions";
import SignatureSubmission from "../SignatureSubmission";
import VideoSubmission from "../VideoSubmission";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectCurrentForm } from "@store/features/auth/authSlice";
export type TCitizen = "Residence" | "Tourist";

function DocumentForm() {
    const current = useSelector(selectCurrentForm);

    const [residentType, setResidentType] =
        React.useState<TCitizen>("Residence");

    console.log("current", current);

    const colormode = useColorMode();

    const collapsableSections = [
        {
            id: 1,
            title: "Residency information",
            component: (
                <IdSubmission
                    residentType={residentType}
                    setResidentType={setResidentType}
                />
            ),
        },
        {
            id: 2,
            title: "Driver's license",
            component: <LiscenseSubmissions residentType={residentType} />,
        },
        {
            id: 3,
            title: "Selfie",
            component: <VideoSubmission residentType={residentType} />,
        },
        {
            id: 4,
            title: "Signature",
            component: <SignatureSubmission residentType={residentType} />,
        },
    ];

    return (
        <VStack w={scale(300) + "px"} mx="auto" py={4}>
            <H3 mt={4}>Documents</H3>

            {collapsableSections.map((section, index) => (
                <VStack key={section.id}>
                    <Pressable
                        py={4}
                        borderBottomColor={"#cccccc"}
                        borderBottomWidth={"1px"}
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        _pressed={{
                            opacity: 0.5,
                        }}
                    >
                        <H3 fontSize={fontSizes.md} mb={0}>
                            {section.title}
                        </H3>
                        <Entypo
                            name="chevron-down"
                            size={24}
                            color={
                                colormode.colorMode === "dark"
                                    ? "white"
                                    : "black"
                            }
                        />
                    </Pressable>

                    <Collapsible collapsed={index + 1 !== current}>
                        {section.component}
                    </Collapsible>
                </VStack>
            ))}
        </VStack>
    );
}

export default React.memo(DocumentForm);
