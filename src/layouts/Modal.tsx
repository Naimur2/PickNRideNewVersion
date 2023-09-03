import {
    hideCurrentModal,
    isCurrentModalOpen,
    selectCurrentModal,
} from "@store/features/ui/uiSlice";
import { Center, Factory, Text, VStack, useColorMode } from "native-base";
import React from "react";
import Modal from "react-native-modal";
import { scale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";

import confirm from "@assets/lottie/confirm.json";
import error from "@assets/lottie/error.json";
import info from "@assets/lottie/info.json";
import success from "@assets/lottie/success.json";
import warning from "@assets/lottie/warning.json";
import LottieView from "lottie-react-native";

const variant = {
    error: error,
    success: success,
    info: info,
    warning: warning,
    confirm: confirm,
};

export default function WModal() {
    const isModalVisible = useSelector(isCurrentModalOpen);
    const currentModal = useSelector(selectCurrentModal);
    const dispatch = useDispatch();
    const { colorMode } = useColorMode();
    const UModal = Factory(Modal);

    const handleClose = () => {
        dispatch(hideCurrentModal());
    };

    const lottieFile = variant[currentModal?.name || "confirm"];

    if (!isModalVisible || !currentModal || !lottieFile) return null;

    return (
        <UModal
            isVisible={isModalVisible}
            backdropColor={colorMode === "dark" ? "#000" : "#fff"}
            propagateSwipe={true}
            onSwipeComplete={handleClose}
            swipeDirection={["left", "right"]}
            onBackdropPress={handleClose}
            onDismiss={handleClose}
            shouldRasterizeIOS
        >
            <VStack
                bg="#fff"
                w="320px"
                h="320px"
                borderRadius={20}
                overflow={"hidden"}
                shadow="lg"
                alignItems={"center"}
                justifyContent={"center"}
                mx={"auto"}
            >
                <VStack space="2" justifyContent={"center"} alignItems="center">
                    <Center>
                        <LottieView
                            autoPlay
                            loop={false}
                            source={lottieFile}
                            style={{
                                width: 200,
                                height: 100,
                            }}
                        />
                    </Center>

                    <Text mt={2} fontSize={20} fontWeight={600} color="#000">
                        {currentModal?.props?.title || "Pending"}
                    </Text>
                    <Text
                        textAlign={"center"}
                        fontSize={scale(13)}
                        color={"light.100"}
                        maxW={250}
                        fontWeight={"500"}
                    >
                        {currentModal?.props?.message ||
                            "Your request is pending"}
                    </Text>
                </VStack>
            </VStack>
        </UModal>
    );
}
