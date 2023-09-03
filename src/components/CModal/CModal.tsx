import { Factory, useColorMode, VStack } from "native-base";
import React from "react";
import Modal from "react-native-modal";

interface IContext {
    translateX: number;
    translateY: number;
}

export default function CModal({
    isOpen,
    onClose,
    children,
    modalStyle,
    ...rest
}: {
    isOpen: boolean;
    onClose: (isVisible: boolean) => void;
    children: React.ReactNode;
    modalStyle?: any;
}) {
    const UModal = Factory(Modal);

    const { colorMode } = useColorMode();

    return (
        <UModal
            isVisible={isOpen}
            backdropColor={colorMode === "dark" ? "#000" : "#fff"}
            propagateSwipe={true}
            onSwipeComplete={onClose}
            swipeDirection={["left", "right"]}
            {...modalStyle}
        >
            <VStack
                bg="#fff"
                w={["320px", "320px", "420px", "520px", "620px"]}
                borderRadius={20}
                overflow={"hidden"}
                shadow="lg"
                alignItems={"center"}
                justifyContent={"center"}
                p="4"
                mx={"auto"}
                {...rest}
            >
                {children}
            </VStack>

            {/* <Touchable onPress={onClose}>
                <Center
                    _dark={{ bg: "#fff" }}
                    mt={20}
                    h="9"
                    w="9"
                    bg="#000"
                    borderRadius={50}
                >
                    <CloseIcon
                        color="#fff"
                        _dark={{
                            color: "#000",
                        }}
                    />
                </Center>
            </Touchable> */}
        </UModal>
    );
}
