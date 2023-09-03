import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Image, Modal, Pressable, VStack } from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";
import SignatureBox from "./SignatureBox/SignatureBox";

function Signature({
    setSignatureValue,
    signatureValue,
}: {
    setSignatureValue: (value: string) => void;
    signatureValue: string;
}) {
    const [show, setShow] = React.useState(false);
    const [base64Image, setBase64Image] = React.useState<string>();

    const handleAddSignature = async (sign: string) => {
        try {
            const base64Data = sign.split(",")[1];

            const imagePath = FileSystem.cacheDirectory + "image.jpeg";
            // const imageData = base64.decode(base64Data);
            await FileSystem.writeAsStringAsync(imagePath, base64Data, {
                encoding: FileSystem.EncodingType.Base64,
            });
            // await MediaLibrary.createAssetAsync(imagePath);
            const info = await FileSystem.getInfoAsync(imagePath);
            setBase64Image(sign);

            setSignatureValue?.(info.uri);
            setShow(false);
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <VStack mt={2} space={2}>
            <Pressable onPress={() => setShow(true)} shadow={5}>
                <VStack
                    borderRadius={20}
                    h={"200px"}
                    w={scale(300) + "px"}
                    mt="2"
                    bg="white"
                    overflow="hidden"
                    alignItems="center"
                    justifyContent="center"
                >
                    {signatureValue ? (
                        <Image
                            source={{
                                uri: signatureValue,
                            }}
                            alt="signature"
                            h="full"
                            w="full"
                        />
                    ) : null}
                </VStack>
            </Pressable>
            <Modal isOpen={show} onClose={() => setShow(false)}>
                <SignatureBox
                    onSignature={(sig) => {
                        handleAddSignature(sig);
                    }}
                />
            </Modal>
        </VStack>
    );
}

export default React.memo(Signature);
