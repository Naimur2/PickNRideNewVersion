import { Plus } from "@components/Icons/Icons";
import useImagePicker from "@hooks/use-image-picker";
import { setLoading } from "@store/features/ui/uiSlice";
import { Image, Pressable, Text, VStack } from "native-base";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Platform } from "react-native";

function UploadImg({
    setImage,
    imgTitle,
    imageLink,
    disabled,
    ...rest
}: {
    setImage: (image: string) => void;
    imageLink?: string;
    imgTitle?: string;
    disabled?: boolean;
}) {
    const {
        image: imageUrl,
        captureImage,
        file,
        isLoading,
    } = useImagePicker({
        useCamera: true,
    });

    let title = imageUrl ? imageUrl.split("/").pop() : null;
    title = imgTitle ? imgTitle : title;
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (file) {
            setImage?.(file?.base64);
        }
    }, [file]);

    const uri = React.useMemo(() => {
        if (imageLink) {
            return `data:image/png;base64,${imageLink}`;
        } else if (imageUrl) {
            return imageUrl;
        } else {
            return "";
        }
    }, [imageUrl]);

    useEffect(() => {
        dispatch(setLoading(isLoading));
    }, [isLoading]);

    return (
        <>
            <VStack space="2" w={"48%"} {...rest}>
                <Pressable
                    h={"120px"}
                    w="full"
                    borderWidth={Platform.OS === "ios" ? 1 : 0}
                    borderColor="gray.300"
                    borderRadius={35}
                    bg="#fff"
                    shadow="9"
                    alignItems={"center"}
                    justifyContent={"center"}
                    pointerEvents={disabled ? "none" : "auto"}
                    onPress={disabled ? undefined : captureImage}
                    position="relative"
                    opacity={disabled ? 0.9 : 1}
                    overflow={"hidden"}
                    _dark={{
                        bg: "gray.200",
                    }}
                >
                    <Plus
                        color={"light.200"}
                        _dark={{
                            color: "gray.100",
                        }}
                    />
                    {uri ? (
                        <Image
                            source={{ uri: uri }}
                            w="full"
                            h="full"
                            zIndex={-1}
                            position="absolute"
                            blurRadius={3}
                            alt={title}
                        />
                    ) : null}
                </Pressable>
                {title ? (
                    <Text
                        textAlign={"center"}
                        _dark={{
                            color: "#fff",
                        }}
                    >
                        {title}
                    </Text>
                ) : null}
            </VStack>
        </>
    );
}

export default React.memo(UploadImg);
