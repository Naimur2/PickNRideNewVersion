import Card from "@components/Card/Card";
import {
    Actionsheet,
    Box,
    HStack,
    Pressable,
    Text,
    useColorMode,
} from "native-base";
import React, { useState } from "react";
import { INotificationsList } from "../VarificationStatus";
import colors from "@theme/colors";
import { usePostVerifyEmailPhoneRequestMutation } from "@store/api/v1/userDocumentApi/userDocumentApi";
import { Dimensions, Modal } from "react-native";
import TextInput from "@components/TextInput/TextInput";
import PickCountry from "@components/PickCountry/PickCountry";
import GradientBtn from "@components/GradientBtn/GradientBtn";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentForm } from "@store/features/auth/authSlice";
import { useNavigation } from "@react-navigation/native";
import useShowModal from "@hooks/useShowModal";
import { selectAuth } from "@store/store";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoadingView from "@components/LoadingView/LoadingView";

interface IVCards extends INotificationsList {
    onPress?: () => void;
    customerInfo?: any;
}

const colorsList = {
    approved: "primary.100",
    pending: "primary.100",
    rejected: "red.100",
    expired: "gray.400",
};

export default function VerifyStatusCard({
    title,
    status,
    onPress,
    validDate,
    verified,
    customerInfo,
}: IVCards) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const colormode = useColorMode();
    const showModal = useShowModal();
    const auth = useSelector(selectAuth);
    //
    const [selectDoc, setSelectDoc] = useState(false); // modal for number or email input
    const [handelVer, { isLoading }] = usePostVerifyEmailPhoneRequestMutation(); // veri api
    const [email, setEmail] = useState(""); // email get
    const [phone, setPhone] = useState(""); // number get
    // handelVerification
    const handelVerification = async () => {
        setSelectDoc(false);
        //  email
        if (title?.toLocaleLowerCase() === "email") {
            const inEmail = auth?.email ?? email;
            if (inEmail?.length > 0) {
                const body = {
                    email: inEmail,
                };
                //
                try {
                    const res = await handelVer(body).unwrap();

                    showModal("success", {
                        title: "Success",
                        message:
                            "An email with verification link has been sent to " +
                            inEmail +
                            " Please check your email and verify your account",
                    });
                } catch (error) {
                    showModal("error", {
                        title: "Error",
                        message: error.data?.message || "Something went wrong",
                    });
                }
            } else {
                setSelectDoc(true);
            }
        }
        // phone
        if (title?.toLocaleLowerCase() === "phone") {
            const inNumber = auth?.dialing_code + auth?.phone;
            const number = inNumber ?? phone;
            if (number?.length > 0) {
                const body = {
                    phone: number,
                };
                try {
                    const res = await handelVer(body).unwrap();
                    showModal("success", {
                        title: "Success",
                        message:
                            "A verification link has been sent to your phone" +
                            phone +
                            " Please check and verify your account",
                    });
                } catch (error) {
                    showModal("error", {
                        title: "Error",
                        message: error.data?.message || "Something went wrong",
                    });
                }
            } else {
                setSelectDoc(true);
            }
        }

        if (status?.toLowerCase() !== "pending") {
            if (title?.toLowerCase() === "address") {
                dispatch(setCurrentForm(1));
                navigation.navigate("DocumentSubmission");
            }
            if (title?.toLowerCase() === "license") {
                dispatch(setCurrentForm(2));
                navigation.navigate("DocumentSubmission");
            }
            if (title?.toLowerCase() === "selfievideo") {
                dispatch(setCurrentForm(3));
                navigation.navigate("DocumentSubmission");
            }
            if (title?.toLowerCase() === "signature") {
                dispatch(setCurrentForm(4));
                navigation.navigate("DocumentSubmission");
            }
        }
    };

    return (
        <>
            {/* modal number or email  */}
            <Actionsheet
                isOpen={selectDoc}
                onClose={() => {
                    setSelectDoc(false);
                }}
            >
                <Box
                    h={"3/4"}
                    w={"full"}
                    roundedTop={40}
                    bottom={0}
                    position={"absolute"}
                    backgroundColor={
                        colormode.colorMode === "dark" ? "black" : "#ffffff"
                    }
                    borderColor={"white"}
                    borderWidth={2}
                    borderBottomWidth={0}
                    py={5}
                    px={5}
                >
                    <KeyboardAwareScrollView
                        style={{ height: Dimensions.get("window").height / 2 }}
                    >
                        <Text
                            my={5}
                            textAlign={"center"}
                            fontWeight={"800"}
                            fontSize={"lg"}
                            mb={10}
                        >
                            Verification You{" "}
                            {title?.toLocaleLowerCase() === "email"
                                ? "Email"
                                : "Phone"}{" "}
                        </Text>

                        {title?.toLocaleLowerCase() === "email" ? (
                            <>
                                <TextInput
                                    onChangeText={(v) => {
                                        setEmail(v);
                                    }}
                                    placeholder="Enter your email"
                                />
                            </>
                        ) : (
                            <>
                                <PickCountry
                                    setPhoneInfo={(phoneInfo) => {
                                        const number =
                                            phoneInfo?.dialingCode.slice(1) +
                                            phoneInfo?.phoneNumber;
                                        console.log("number", number);
                                        setPhone(number);
                                    }}
                                />
                            </>
                        )}

                        {/*  */}
                        <GradientBtn
                            gradientStyle={{ maxWidth: 250 }}
                            title={"Send"}
                            mx={"auto"}
                            mt={10}
                            // disabled={result.isLoading}
                            onPress={handelVerification}
                        />
                    </KeyboardAwareScrollView>
                </Box>
            </Actionsheet>
            {/* card */}
            <Card
                _dark={{
                    bg: "#fff",
                }}
                onPress={onPress}
            >
                <HStack
                    py={3}
                    alignItems={"center"}
                    justifyContent="space-between"
                    mb={1}
                >
                    <Text fontWeight={700} fontSize={21} color="#000">
                        {title}
                    </Text>
                    {!verified && status?.toLocaleLowerCase() !== "pending" ? (
                        <Pressable
                            style={{
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                                borderRadius: 10,
                            }}
                            background={colors.green[400]}
                            onPress={handelVerification}
                        >
                            <Text color={"white"} fontWeight={600}>
                                Verify
                            </Text>
                        </Pressable>
                    ) : (
                        <Text
                            fontWeight={600}
                            fontSize={15}
                            color={colorsList[status?.toLocaleLowerCase()]}
                            textTransform={"capitalize"}
                        >
                            {status}
                        </Text>
                    )}
                </HStack>
            </Card>
            {/* {isLoading ? <LoadingView /> : null} */}
        </>
    );
}
