import React from "react";
import { HStack, Pressable } from "native-base";
import { Entypo, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import TorchBtn from "../TorchBtn/TorchBtn";

export default function CaptureBtns({
    takePicture,
    handleReset,
    handleSubmit,
    showTakePictureBtn,
    hideButtons,
    toggleTorch,
}: {
    takePicture: () => void;
    handleReset: () => void;
    handleSubmit: () => void;
    showTakePictureBtn: boolean;
    hideButtons: boolean;
    toggleTorch: () => void;
}) {
    if (hideButtons) return null;

    return (
        <HStack space={4} alignItems={"center"} justifyContent={"center"}>
            {showTakePictureBtn ? (
                <>
                    <Pressable
                        onPress={takePicture}
                        rounded={"full"}
                        py={4}
                        px={4}
                        bg={"#fff"}
                    >
                        <Entypo name="camera" size={24} color="black" />
                    </Pressable>
                    <TorchBtn onPress={toggleTorch} />
                </>
            ) : (
                <>
                    <Pressable
                        onPress={handleReset}
                        rounded={"full"}
                        py={4}
                        px={4}
                        bg={"#fff"}
                    >
                        <MaterialCommunityIcons
                            name="camera-retake"
                            size={24}
                            color="black"
                        />
                    </Pressable>
                    {/* <Pressable
                        onPress={handleSubmit}
                        rounded={"full"}
                        py={4}
                        px={4}
                        bg={"#fff"}
                    >
                        <AntDesign name="checkcircle" size={24} color="black" />
                    </Pressable> */}
                </>
            )}
        </HStack>
    );
}
