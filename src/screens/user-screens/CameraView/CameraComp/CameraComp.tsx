import { useNavigation } from "@react-navigation/native";
import { setDocumentVideo } from "@store/features/document/documentSlice";
import { Camera } from "expo-camera";
import { Face } from "expo-camera/build/Camera.types";
import * as FaceDetector from "expo-face-detector";
import { Button, Modal, Text, VStack } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import CameraModalComp from "../CameraModalComp/CameraModalComp";
import CameraTimer from "../CameraTimer/CameraTimer";

export default function CameraComp() {
    let cameraRef = React.useRef<Camera | undefined>();
    const [timer, setTimer] = React.useState(0);
    const [show, setShow] = React.useState(true);
    const [video, setVideo] = React.useState<string>();
    const [isLoading, setIsLoading] = React.useState(false);
    const dispatch = useDispatch();

    const [faceData, setFaceData] = React.useState<Face | null>(null);
    const [warning, setWarning] = React.useState<string | null>(null);

    const navigation = useNavigation();

    const [isRecording, setIsRecording] = React.useState(false);

    let recordVideo = async () => {
        setIsLoading(true);
        let options = {
            quality: "1080p",
            maxDuration: 10,
            mute: false,
        };

        try {
            if (cameraRef.current) {
                const recordedVideo = await cameraRef.current.recordAsync(
                    options
                );
                setIsRecording(true);
                setVideo(recordedVideo.uri);
                setIsLoading(false);
            }
        } catch (error) {
            alert(error.message);
            setIsLoading(false);
        }
    };

    let stopRecording = () => {
        if (cameraRef.current) {
            setIsRecording(false);
            cameraRef.current.stopRecording();
        }
    };

    React.useEffect(() => {
        if (video && timer > 10) {
            stopRecording();

            dispatch(setDocumentVideo(video));
            console.log("video", video);
            navigation.navigate("DocumentSubmission", {
                video: video,
            });
        }
    }, [video, faceData, timer]);

    // React.useEffect(() => {
    //     if (isRecording && timer === 10) {
    //         stopRecording();
    //     }
    // }, [isRecording, timer]);

    React.useEffect(() => {
        if (isRecording) {
            const couter = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
            return () => clearInterval(couter);
        }
        if (!isRecording) {
            setTimer(0);
        }
    }, [isRecording]);

    const handleClose = async () => {
        setShow(false);
    };

    const handleFacesDetected = ({ faces }: { faces: Face[] }) => {
        if (faces.length === 0) {
            setWarning("Please keep your face straight and blink your eyes");
            setFaceData(null);
        } else {
            const currentFace = faces[0];
            setWarning(null);
            setFaceData(currentFace);
            // const eyesShut =
            //     currentFace.rightEyeOpenProbability < 0.4 &&
            //     currentFace.leftEyeOpenProbability < 0.4;

            // const winking =
            //     !eyesShut &&
            //     (currentFace.rightEyeOpenProbability < 0.4 ||
            //         currentFace.leftEyeOpenProbability < 0.4);

            // if (!winking) {
            //     setWarning(
            //         "Please keep your face straight and blink your eyes"
            //     );
            //     setFaceData(null);
            // } else {
            //     setWarning(null);
            //     setFaceData(currentFace);
            // }
        }
    };

    return (
        <VStack flex={1} position="relative">
            <Modal isOpen={show}>
                <CameraModalComp onCloseModal={handleClose} />
            </Modal>
            <Camera
                type={Camera.Constants.Type.front}
                onFacesDetected={handleFacesDetected}
                faceDetectorSettings={{
                    mode: FaceDetector.FaceDetectorMode.fast,
                    detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                    runClassifications:
                        FaceDetector.FaceDetectorClassifications.none,
                    minDetectionInterval: 100,
                    tracking: true,
                }}
                style={styles.container}
                ref={cameraRef as any}
            >
                <VStack flex={1} alignItems="center" position={"relative"}>
                    <CameraTimer isRecording={isRecording} time={timer} />

                    {warning ? (
                        <Text px={4} mt={"5"} color={"#fff"} textAlign="center">
                            {warning}
                        </Text>
                    ) : null}
                    {isLoading ? (
                        <Text
                            px={4}
                            mt={"5"}
                            fontWeight={"600"}
                            color={"#fff"}
                            textAlign="center"
                        >
                            Preparing camera, please wait...
                        </Text>
                    ) : null}

                    <VStack
                        h="100px"
                        w="100px"
                        p="2"
                        mt="auto"
                        mb={100}
                        alignItems="center"
                        justifyContent="center"
                        borderWidth={2}
                        borderColor={"#fff"}
                        borderRadius="120"
                    >
                        <Button
                            h="100%"
                            w="100%"
                            bg={isRecording || isLoading ? "red.500" : "#fff"}
                            onPress={
                                !isRecording && !isLoading ? recordVideo : null
                            }
                            borderRadius={50}
                        />
                    </VStack>
                </VStack>
            </Camera>
        </VStack>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        marginBottom: 100,
    },
    video: {
        flex: 1,
        alignSelf: "stretch",
    },
});
