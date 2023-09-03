import GradientBtn from "@components/GradientBtn/GradientBtn";
import WarningModal from "@components/WarningModal/WarningModal";
import config from "@config";
import useShowModal from "@hooks/useShowModal";
import { useNavigation } from "@react-navigation/native";
import { IMyFatooraRouteParams } from "@screens/MyFatooraScreens/types/myfatoora.interface";
import { useValidateCarTripRequestMutation } from "@store/api/v2/tripApi/tripApiSlice";
import { setCurrentForm } from "@store/features/auth/authSlice";
import { setStartOrEndRide } from "@store/features/ui/uiSlice";
import * as Location from "expo-location";
import { useFormik } from "formik";
import { Center, FormControl, Input, Modal, Text, VStack } from "native-base";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { IValidateCarTripData } from "./ScanQrCode.types";

export default function ManualEntry({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const navigation = useNavigation();
    const showModal = useShowModal();
    const dispatch = useDispatch();
    const [showWarningModal, setShowWarningModal] =
        React.useState<boolean>(false);
    const [validateCarTrip, validationResult] =
        useValidateCarTripRequestMutation();

    const [warningVariant, setWarningVariant] = useState<
        "approved" | "pending" | "rejected" | "expired" | "required"
    >("approved");

    const handleNavigation = (tripData: IValidateCarTripData | null) => {
        if (!config.DEV_MODE && tripData) {
            onClose?.();
            dispatch(setStartOrEndRide("start"));
            navigation.navigate("StartEndRide", {
                data: tripData,
                type: "START",
            });
        } else {
            const data: IValidateCarTripData = {
                isValidVehicle: true,
                vehicleNo: "123456",
                tripToken: "123456",
            };
            // navigation.navigate("StartEndRide", {
            //     type: "START",
            //     data: data,
            // });
        }
    };

    const errorHandler = (
        error: {
            code:
                | 701
                | 712
                | 715
                | 711
                | 702
                | 703
                | 704
                | 706
                | 707
                | 708
                | 901;
            message: string;
        },
        data: any
    ) => {
        console.log("error", error);
        switch (error.code) {
            case 701:
                showModal("error", {
                    title: "Error",
                    message: error.message,
                });

                if (data?.tripDetails) {
                    const {
                        totalTripTime,
                        totalKM,
                        startLatitude,
                        startLongitude,
                        endLatitude,
                        endLongitude,
                        price,
                    } = data.tripDetails;
                    onClose?.();
                    navigation.navigate("MFPayment", {
                        amount: price || data?.tripAmount,
                        paymentFor: "lowBalance",
                        showTimers: true,
                        paymentDetails: {
                            to: {
                                latitude: startLatitude,
                                longitude: startLongitude,
                            },
                            from: {
                                latitude: endLatitude,
                                longitude: endLongitude,
                            },
                            distance: totalKM,
                            time: totalTripTime,
                            message: error.message,
                            currentBalance: data?.walletBalance,
                            requiredAmount: data?.walletBalance - price || 0,
                            duration: data?.tripDetails?.totalTripTime,
                        },
                    } as IMyFatooraRouteParams);
                }
                break;
            case 712:
            case 707:
                setWarningVariant("required");
                setShowWarningModal(true);
                break;
            case 715:
                setWarningVariant("pending");
                setShowWarningModal(true);
                break;
            case 711:
                setWarningVariant("expired");
                setShowWarningModal(true);
                break;
            case 702:
            case 703:
            case 704:
            case 706:
                showModal("error", {
                    title: "Error",
                    message: error.message,
                });

                break;
            case 708:
                if (data?.tripDetails) {
                    const {
                        totalTripTime,
                        totalKM,
                        startLatitude,
                        startLongitude,
                        endLatitude,
                        endLongitude,
                        price,
                    } = data.tripDetails;
                    onClose?.();
                    navigation.navigate("MFPayment", {
                        amount: price || data?.tripAmount,
                        paymentFor: "lowBalance",
                        showTimers: true,
                        paymentDetails: {
                            to: {
                                latitude: startLatitude,
                                longitude: startLongitude,
                            },
                            from: {
                                latitude: endLatitude,
                                longitude: endLongitude,
                            },
                            distance: totalKM,
                            time: totalTripTime,
                            message: error.message,
                            currentBalance: data?.walletBalance,
                            requiredAmount: data?.walletBalance - price || 0,
                            duration: data?.tripDetails?.totalTripTime,
                        },
                    } as IMyFatooraRouteParams);
                }
                break;
            default:
                showModal("error", {
                    title: "Error",
                    message: error?.message || "Something Went wrong",
                });

                break;
        }
    };

    const handleToglewarning = () => {
        if (
            warningVariant === "rejected" ||
            warningVariant === "expired" ||
            warningVariant === "required"
        ) {
            setShowWarningModal(false);
            onClose?.();
            navigation.navigate("DocumentSubmission");
            dispatch(setCurrentForm(1));
        } else {
            setShowWarningModal(false);
        }
    };

    async function handleSubmit(code: string) {
        const { status, granted } =
            await Location.getForegroundPermissionsAsync();

        if (status !== "granted" || !granted) {
            showModal("error", {
                title: "Error",
                message: "Permission to access location was denied",
            });
        } else {
            if (!config.DEV_MODE) {
                const location = await Location.getCurrentPositionAsync({});

                const imageData = {
                    vehicleNo: code,
                    mobileLatitude: location.coords.latitude,
                    mobileLongitude: location.coords.longitude,
                    numberPlateImage: "",
                };

                const res = await validateCarTrip(imageData).unwrap();

                if (!res?.succeeded && res?.error) {
                    errorHandler(res?.error, res?.data);
                } else {
                    handleNavigation(res?.data);
                }
            } else {
                console.log("DEV MODE");
            }
        }
    }

    const formik = useFormik({
        initialValues: {
            code: "",
        },
        onSubmit: (values) => {
            handleSubmit(values.code);
        },
        validationSchema: Yup.object().shape({
            code: Yup.string().required("Veichle no is required"),
        }),
    });

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Content py={4}>
                <VStack space="4" p={4}>
                    <Text
                        fontSize={13}
                        fontWeight={600}
                        mx={"auto"}
                        textAlign={"center"}
                    >
                        Enter Code Manually
                    </Text>
                    <FormControl isRequired isInvalid={formik.errors.code}>
                        <Input
                            _focus={{
                                bg: "#BFDFBA",
                            }}
                            mb={4}
                            placeholder="Enter Code Manually"
                            bg="#BFDFBA"
                            borderRadius={15}
                            onChangeText={formik.handleChange("code")}
                            keyboardType="numeric"
                        />
                        <FormControl.ErrorMessage>
                            {formik.errors.code}
                        </FormControl.ErrorMessage>
                    </FormControl>
                </VStack>

                <Center>
                    <GradientBtn
                        onPress={formik.handleSubmit}
                        title="Submit"
                        // disabled={validationResult.isLoading}
                        gradientStyle={{
                            width: "200px",
                        }}
                    />
                </Center>
            </Modal.Content>
            <WarningModal
                variant={warningVariant}
                isVisible={showWarningModal}
                setIsVisible={handleToglewarning}
            />
        </Modal>
    );
}
