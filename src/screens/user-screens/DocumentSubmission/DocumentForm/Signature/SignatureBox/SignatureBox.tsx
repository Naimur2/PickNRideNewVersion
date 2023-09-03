import React from "react";
import SignatureScreen from "react-native-signature-canvas";
import { scale } from "react-native-size-matters";
import { VStack, Text, Divider } from "native-base";

export default function SignatureBox({
    onSignature,
}: {
    onSignature: (signature: string) => void;
}) {
    const ref = React.useRef();
    // Called after ref.current.readSignature() reads a non-empty base64 string
    const handleOK = (signature) => {
        onSignature(signature);
    };

    // Called after ref.current.readSignature() reads an empty string
    const handleEmpty = () => {
        console.log("Empty");
    };

    // Called after ref.current.clearSignature()
    const handleClear = () => {
        console.log("clear success!");
    };

    // Called after end of stroke
    const handleEnd = () => {
        ref.current.readSignature();
    };

    // Called after ref.current.getData()
    const handleData = (data) => {
        console.log(data);
    };
    return (
        <VStack p={4} bg={"#fff"} borderRadius={20} overflow={"hidden"}>
            <Text fontSize={17} fontWeight={"600"} textAlign={"center"}>
                Signature
            </Text>

            <Divider my={1} />

            <VStack h={200} w={scale(290)}>
                <SignatureScreen
                    ref={ref}
                    onEnd={handleEnd}
                    onOK={handleOK}
                    onEmpty={handleEmpty}
                    onClear={handleClear}
                    onGetData={handleData}
                    autoClear={true}
                    descriptionText={"fhsefddd"}
                    bgHeight={190}
                    bgWidth={scale(290)}
                    backgroundColor={"#fff"}
                    imageType="image/jpeg"
                    androidHardwareAccelerationDisabled={false}
                    webStyle={`
                            .m-signature-pad--body {
                                border:none;
                                background-color: #fff;
            
                                overflow: hidden;
                              }
                              .m-signature-pad--body{
                                border:none;
                                box-shadow: none;
            
                                overflow: hidden;
                              }
                              .m-signature-pad {
                                border:none;
            
                                overflow: hidden;
                                box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
                              }
                            `}
                    style={{
                        borderWidth: 0,
                    }}
                />
            </VStack>
        </VStack>
    );
}
