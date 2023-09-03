import CModal from "@components/CModal/CModal";
import { HStack, Button } from "native-base";
import React from "react";
import H3 from "@components/H3/H3";
import { fontSizes } from "@theme/typography";
import { scale } from "react-native-size-matters";

export default function YesNoModal({
    title,
    isOpen,
    onClose,
    onYes,
}: {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    onYes: () => void;
}) {
    return (
        <CModal onClose={onClose} isOpen={isOpen}>
            <H3 fontSize={fontSizes.lg} textAlign="center">
                {title}
            </H3>
            <HStack justifyContent={"space-between"} space="4">
                <Button
                    _text={{
                        fontWeight: 700,
                        fontSize: 11,
                        textTransform: "uppercase",
                        color: "primary.100",
                    }}
                    w={scale(88) + "px"}
                    borderRadius={14}
                    variant="outline"
                    borderColor={"primary.100"}
                    borderWidth={1.5}
                    _pressed={{
                        bg: "#ffffff80",
                    }}
                    onPress={onYes}
                >
                    Yes
                </Button>

                <Button
                    _text={{
                        fontWeight: 700,
                        fontSize: 11,
                        textTransform: "uppercase",
                        color: "#fff",
                    }}
                    bg="primary.100"
                    w={scale(88) + "px"}
                    borderRadius={14}
                    _pressed={{
                        bg: "primary.200",
                    }}
                    onPress={onClose}
                >
                    No
                </Button>
            </HStack>
        </CModal>
    );
}
