import {
    Button,
    Factory,
    HStack,
    Modal,
    Spinner,
    Text,
    Toast,
    useColorMode,
    VStack,
} from "native-base";
import React from "react";

import carSmall from "@assets/images/car-small.png";
import motor from "@assets/images/motor.png";
import ringBell from "@assets/images/ring-bell.png";
import CarDescriptionCard from "../../../CarDescriptionCard/CarDescriptionCard";

import ErrorToast from "@components/ErrorToast/ErrorToast";
import WarningModal from "@components/WarningModal/WarningModal";
import {
    useExecuteCarCommandMutation,
    useLockUnlockMutation,
} from "@store/api/v2/tripApi/tripApiSlice";
import {
    selectCarTripInfo,
    setIsLocked,
} from "@store/features/car-trip/carTripSlice";
import { ICarTripState } from "@store/features/car-trip/carTripSlice.types";
import { Center } from "native-base";
import { Dimensions, Image } from "react-native";
import ActionSheet, {
    SheetManager,
    SheetProps,
} from "react-native-actions-sheet";
import SwitchToggle from "react-native-switch-toggle";
import { useDispatch, useSelector } from "react-redux";

import LoadingView from "@components/LoadingView/LoadingView";
import { useNavigation } from "@react-navigation/native";
import { setStartOrEndRide } from "@store/features/ui/uiSlice";
import { selectIsLocked } from "@store/features/car-trip/carTripSlice";
import colors from "../../../../../../theme-config/colors";
import { fontConfig } from "../../../../../../theme-config/fontConfig";
import YesNoModal from "../YesNoModal/YesNoModal";
import { selectHasStartedJourney } from "../../../../../../redux/features/car-trip/carTripSlice";
import useShowModal from "@hooks/useShowModal";

const images = {
    carSmall,
    motor,
};

interface ICarDetails extends SheetProps {
    carId: string;
    type?: "carSmall" | "motor";
    avaiableDistance: string;
    availeTime: string;
    availableBattery: string;
    sheetId: string;
    hasStartedJourney: boolean;
    tripDetails?: any;
}

function CarDetailsSheet({
    carId,
    type,
    avaiableDistance,
    availeTime,
    availableBattery,
    sheetId,
    hasStartedJourney,
    tripDetails,
    ...rest
}: ICarDetails) {
    const RnImage = Factory(Image);
    const dispatch = useDispatch();
    const showModal = useShowModal();

    console.log("tripDetails", tripDetails);

    const [loadingModalVisible, setLoadingModalVisible] = React.useState(false);

    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const isLocked = useSelector(selectIsLocked);

    const [setLockStatus, lockResult] = useLockUnlockMutation();
    const [executeComannd, executionResult] = useExecuteCarCommandMutation();

    const navigation = useNavigation();

    const { colorMode } = useColorMode();

    const [isYesNoModalVisible, setIsYesNoModalVisible] = React.useState(false);

    const onEndRide = async () => {
        if (!isLocked) {
            showModal("warning", {
                title: "Warning",
                message: "Please lock the car before ending the ride",
            });
        } else {
            if (tripDetails) {
                setIsYesNoModalVisible(false);
                dispatch(setStartOrEndRide("end"));
                navigation.navigate(
                    "StartEndRide" as never,
                    {
                        data: tripDetails,
                        type: "END",
                    } as any
                );
            } else {
                showModal("warning", {
                    title: "Warning",
                    message: "Please try again later",
                });

                setIsYesNoModalVisible(false);
            }
        }
    };

    const handleSuccessfulLock = async (data, currentStatus: boolean) => {
        if (!data?.status) {
            const ids = data?.commandStatus.map((item) => item.id);
            const commandResult = await executeComannd({ ids }).unwrap();
            if (commandResult?.succeeded) {
                const hasTimedOut =
                    commandResult?.data?.map((cmd) => cmd.status === 3).length >
                    0;
                if (hasTimedOut) {
                    // swipeHandlerRef.current?.resetStatus(!currentStatus);
                    showModal("warning", {
                        title: "Warning",
                        message: "Please try again later",
                    });
                } else {
                    dispatch(setIsLocked(currentStatus));
                    setIsModalVisible(true);
                }
            }
        } else {
            dispatch(setIsLocked(currentStatus));
            setIsModalVisible(true);
        }
    };

    const handleLockUnlock = async (status: boolean) => {
        setLoadingModalVisible(true);
        console.warn("status", {
            tripToken: tripDetails?.tripToken as string,
            lock: status,
        });

        try {
            const res = await setLockStatus({
                tripToken: tripDetails?.tripToken as string,
                lock: status,
            }).unwrap();

            if (res.succeeded) {
                await handleSuccessfulLock(res.data, status);
                setLoadingModalVisible(false);
            } else {
                // swipeHandlerRef.current?.resetStatus(!status);
                showModal("error", {
                    title: "Error",
                    message: "Please try again later",
                });

                setLoadingModalVisible(false);
            }
        } catch (error) {
            console.log("error", error);
            showModal("error", {
                title: "Error",
                message: "Please try again later",
            });
            setLoadingModalVisible(false);
        }
    };

    const isLoading =
        lockResult.isLoading ||
        executionResult.isLoading ||
        loadingModalVisible;

    const switchWidth = Dimensions.get("window").width - 100;

    if (!hasStartedJourney) {
        return <></>;
    }

    return (
        <>
            <ActionSheet
                id={sheetId}
                closable={false}
                backgroundInteractionEnabled={true}
                containerStyle={{
                    backgroundColor: colorMode === "light" ? "#fff" : "#000",
                }}
                {...rest}
            >
                <VStack w="full" p="4">
                    <HStack space="6" w="full" p={4} alignItems="flex-end">
                        <RnImage
                            source={images[type] || carSmall}
                            alt="car-small"
                            resizeMode="contain"
                            w="120px"
                            h="80px"
                            tintColor={"#000"}
                            _dark={{ tintColor: "primary.100" }}
                        />
                        <Text fontWeight={600} fontSize={13}>
                            ID: {carId}
                        </Text>
                        <HStack space="2" w="full" px={4} alignItems="flex-end">
                            <RnImage
                                w="16px"
                                h="18px"
                                resizeMode="contain"
                                source={ringBell}
                                alt="ring bell"
                            />
                            <Text fontWeight={600} fontSize={13}>
                                Ring
                            </Text>
                        </HStack>
                    </HStack>
                    <CarDescriptionCard
                        bettaryTitle={availableBattery}
                        locationTitle={avaiableDistance}
                        timeTitle={availeTime}
                        px={8}
                    />
                    <Text
                        textAlign={"center"}
                        color={"gray.100"}
                        fontWeight={700}
                        fontSize={13}
                        _dark={{
                            color: "#fff",
                        }}
                    >
                        3 km 5 QAR
                    </Text>

                    <Center py={4}>
                        <SwitchToggle
                            switchOn={isLocked}
                            onPress={() => handleLockUnlock(!isLocked)}
                            containerStyle={{
                                marginTop: 16,
                                width: switchWidth,
                                height: 48,
                                borderRadius: 25,
                                padding: 5,
                            }}
                            buttonTextStyle={{
                                color: "#000",
                                fontWeight: "bold",
                                fontSize: 16,
                                fontFamily: fontConfig.Montserrat[700].normal,
                            }}
                            circleColorOn="#fff"
                            circleColorOff="#fff"
                            backgroundColorOn="red"
                            backgroundColorOff={colors.primary[100]}
                            circleStyle={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        />

                        <Text mt={2} fontWeight={"bold"}>
                            {!isLocked ? "Press to lock" : "Press to unlock"}
                        </Text>
                    </Center>
                    {isLocked ? (
                        <VStack mt={4} mb={5} w={"full"} space="4">
                            <Button
                                bg="red.100"
                                _pressed={{ bg: "red.800" }}
                                w="120px"
                                borderRadius={30}
                                mx="auto"
                                _text={{
                                    color: "white",
                                    fontWeight: "700",
                                    fontSize: 13,
                                    textTransform: "uppercase",
                                }}
                                color={"#fff"}
                                onPress={() => {
                                    if (!isLocked) {
                                        alert("Please lock the car first");
                                    } else {
                                        SheetManager.hide("carDetailsSheet");
                                        setIsYesNoModalVisible(true);
                                    }
                                }}
                            >
                                End Ride
                            </Button>
                        </VStack>
                    ) : null}
                </VStack>
                {isModalVisible ? (
                    <WarningModal
                        setIsVisible={() => setIsModalVisible(false)}
                        isVisible={isModalVisible}
                        variant={isLocked ? "locked" : "unlocked"}
                    />
                ) : null}
            </ActionSheet>
            <YesNoModal
                isOpen={isYesNoModalVisible}
                onClose={() => {
                    setIsYesNoModalVisible(false);
                }}
                title={"Are you sure you want to end the ride?"}
                onYes={onEndRide}
            />
            <Modal isOpen={isLoading}>
                <Center h="full" w="full" bg="#ffffff60">
                    <LoadingView />
                    <Spinner size="lg" color={colors.primary[100]} />
                    <Text color={"#000"} fontWeight={700} mt={4}>
                        Wait a moment
                    </Text>
                </Center>
            </Modal>
        </>
    );
}

export default React.memo(CarDetailsSheet);
