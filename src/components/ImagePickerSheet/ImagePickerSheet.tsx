import { Center, Factory, HStack, Text, Actionsheet } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import useImagePicker from "@hooks/use-image-picker";
import Camera from "@assets/svgs/Camera";
import { UploadIcon } from "../Icons/Icons";
import { useDispatch } from "react-redux";
import { setLoading } from "@store/features/ui/uiSlice";

interface IPickerSheet {
    isOpen: boolean;
    onClose: () => void;
    setImage: (image: any) => void;
    hideFromGallery?: boolean;
    backCameraOnly?: boolean;
}

const ImagePickerSheet = ({
    setImage,
    isOpen,
    onClose,
    hideFromGallery,
    backCameraOnly,
}: IPickerSheet) => {
    const dispatch = useDispatch();
    const { image, pickImage, captureImage } = useImagePicker({
        useCamera: backCameraOnly,
    });
    const Button = Factory(TouchableOpacity);

    React.useEffect(() => {
        if (image) {
            setImage?.(image);
        }
    }, [image]);

    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content
                _dragIndicator={{
                    bg: "light.200",
                    borderRadius: 20,
                }}
                bg="#fff"
            >
                <HStack
                    space={8}
                    w="full"
                    pt={4}
                    px={4}
                    pb={6}
                    alignItems="center"
                    justifyContent="flex-start"
                >
                    {!hideFromGallery ? (
                        <Button onPress={pickImage}>
                            <Center>
                                <UploadIcon
                                    mb="10px"
                                    color="primary.100"
                                    iconSize={26}
                                />
                                <Text
                                    color={"#000"}
                                    fontWeight={600}
                                    fontSize={15}
                                >
                                    From File
                                </Text>
                            </Center>
                        </Button>
                    ) : null}
                    <Button onPress={captureImage}>
                        <Center>
                            <Camera
                                mb="10px"
                                size={24}
                                color="primary.100"
                                iconSize={26}
                            />
                            <Text color={"#000"} fontWeight={600} fontSize={15}>
                                Camera
                            </Text>
                        </Center>
                    </Button>
                </HStack>
            </Actionsheet.Content>
        </Actionsheet>
    );
};

export default ImagePickerSheet;
