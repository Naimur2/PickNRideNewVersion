import camera from "@assets/images/camera.png";
import Pen from "@assets/svgs/Pen";
import BackButton from "@components/BackButton/BackButton";
import Balance from "@components/Balance/Balance";
import DatePickerModal from "@components/DatePickerModal/DatePickerModal";
import GradientBtn from "@components/GradientBtn/GradientBtn";
import HeaderTitle from "@components/HeaderTitle/HeaderTitle";
import ImagePickerSheet from "@components/ImagePickerSheet/ImagePickerSheet";
import useShowModal from "@hooks/useShowModal";
import PhoneInputSheet from "@layouts/PhoneInputSheet";
import { useNavigation } from "@react-navigation/native";
import { useUpdateUserProfileMutation } from "@store/api/v1/authApi/authApiSlice";
import { updateProfileData } from "@store/features/auth/authSlice";
import { selectAuth } from "@store/store";
import colors from "@theme/colors";
import { fontSizes } from "@theme/typography";
import dayjs from "dayjs";
import * as ImagePicker from "expo-image-picker";
import { useFormik } from "formik";
import {
    Avatar,
    FormControl,
    Image,
    Input,
    Pressable,
    VStack,
    useColorMode,
} from "native-base";
import React from "react";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { scale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

export default function Account() {
    const navigation = useNavigation();
    const auth = useSelector(selectAuth);
    console.log(auth?.token);

    const [isOpen, setIsOpen] = React.useState(false);
    const colormode = useColorMode();
    const dispatch = useDispatch();
    const [updateProfile, result] = useUpdateUserProfileMutation();
    const showModal = useShowModal();
    const [showDatePiker, setShowDatePiker] = React.useState(false);
    const [showPhoneInput, setShowPhoneInput] = React.useState(false);
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    console.log(result.error);

    const formik = useFormik({
        initialValues: {
            f_name: auth?.f_name,
            l_name: auth?.l_name,
            email: auth?.email,
            phone: auth.phone,
            qid: auth?.qid,
            dob: auth?.dob,
            dialing_code: auth?.dialing_code,
            photo: auth?.photo,
        },
        onSubmit: async (values) => {
            try {
                const formData: any = {
                    firstName: values.f_name,
                    lastName: values.l_name,
                    dob: values.dob,
                };

                if (auth?.photo !== values.photo) {
                    formData.photo = values.photo;
                }

                const res = await updateProfile(formData).unwrap();
                dispatch(
                    updateProfileData({
                        f_name: values.f_name,
                        l_name: values.l_name,
                        photo: values.photo,
                        phone: values.phone,
                        dob: values.dob,
                        email: values.email,
                        dialing_code: values.dialing_code,
                        qid: values.qid,
                    })
                );
                showModal("success", {
                    title: "Success",
                    message: "Information updated successfully.",
                });
            } catch (error) {
                console.log("error", error);
                showModal("error", {
                    title: "Error",
                    message: "Error updating information.",
                });
            }
        },
        validationSchema: Yup.object().shape({
            f_name: Yup.string().required("First name is required"),
            l_name: Yup.string().required("Last name is required"),
            email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),
            phone: Yup.string().required("Phone number is required"),
            qid: Yup.string().required("QID is required"),
            dob: Yup.string().required("Date of birth is required"),
        }),
    });

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="Account" />,
            headerTitleAlign: "center",
            headerRight: () => (
                <Balance iconColor="primary.100" textColor="gray.100" />
            ),
            headerLeft: () => (
                <BackButton
                    color={colormode.colorMode === "dark" ? "white" : "black"}
                />
            ),
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor:
                    colormode.colorMode === "dark"
                        ? colors.dark[100]
                        : colors.light[300],
            },
        });
    }, [navigation]);

    const checkImagePermission = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            showModal("warning", {
                title: "Warning",
                message:
                    "Sorry, we need camera roll permissions to make this work!",
            });
            // alert("Sorry, we need camera roll permissions to make this work!");
        } else {
            setIsOpen(true);
        }
    };

    return (
        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={{
                backgroundColor:
                    colormode.colorMode === "dark" ? "#000000" : "#ffff",
                flexGrow: 1,
            }}
            enableOnAndroid={true}
            extraHeight={100}
        >
            <VStack
                space={6}
                mt={4}
                px="6"
                pb={8}
                h="full"
                mx="auto"
                pt={Platform.OS === "android" ? 55 : 0}
                bg="red"
            >
                <VStack alignItems={"center"} position="relative">
                    <Avatar
                        shadow="9"
                        source={{ uri: formik.values.photo }}
                        size={"120px"}
                        borderWidth={6}
                        borderColor="#fff"
                    >
                        NA
                    </Avatar>
                    <Pressable
                        bg="primary.100"
                        display="flex"
                        alignItems={"center"}
                        justifyContent="center"
                        p="4"
                        borderRadius="50px"
                        position="absolute"
                        bottom={-22}
                        ml={2}
                        onPress={checkImagePermission}
                    >
                        <Image source={camera} alt="camera" />
                    </Pressable>
                </VStack>
                <ImagePickerSheet
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    setImage={(img) => {
                        formik.setFieldValue("photo", img);
                        setIsOpen(false);
                    }}
                />

                <VStack w="full" mt={4}>
                    <FormControl
                        mt={3}
                        w="full"
                        isInvalid={Boolean(formik.errors.qid)}
                    >
                        <FormControl.Label
                            fontSize={fontSizes.xs}
                            color="gray.400"
                            _dark={{ color: "#fff" }}
                        >
                            Enter your QID
                        </FormControl.Label>
                        <Input
                            w="full"
                            fontSize={fontSizes.sm}
                            fontWeight={600}
                            variant="underlined"
                            borderBottomColor={"light.200"}
                            placeholder="Enter your QID"
                            placeholderTextColor="gray.300"
                            _dark={{
                                color: "#fff",
                                placeholderTextColor: "white",
                            }}
                            rightElement={
                                <Pressable>
                                    <Pen width={scale(16)} height={scale(16)} />
                                </Pressable>
                            }
                            value={formik.values.qid}
                            onChangeText={formik.handleChange("qid")}
                            onBlur={formik.handleBlur("qid")}
                            editable={false}
                            pointerEvents="none"
                        />
                        <FormControl.ErrorMessage>
                            {formik.errors.qid}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl
                        mt={3}
                        w="full"
                        isInvalid={Boolean(formik.errors.f_name)}
                    >
                        <FormControl.Label
                            fontSize={fontSizes.xs}
                            color="gray.400"
                            _dark={{ color: "#fff" }}
                        >
                            Enter your first name
                        </FormControl.Label>
                        <Input
                            w="full"
                            fontSize={fontSizes.sm}
                            fontWeight={600}
                            variant="underlined"
                            borderBottomColor={"light.200"}
                            placeholder="Enter your full name"
                            placeholderTextColor="gray.300"
                            _dark={{
                                color: "#fff",
                                placeholderTextColor: "white",
                            }}
                            rightElement={
                                <Pressable>
                                    <Pen width={scale(16)} height={scale(16)} />
                                </Pressable>
                            }
                            value={formik.values.f_name}
                            onChangeText={formik.handleChange("f_name")}
                            onBlur={formik.handleBlur("f_name")}
                        />

                        <FormControl.ErrorMessage>
                            {formik.errors.f_name}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl
                        mt={3}
                        w="full"
                        isInvalid={Boolean(formik.errors.l_name)}
                    >
                        <FormControl.Label
                            fontSize={fontSizes.xs}
                            color="gray.400"
                            _dark={{ color: "#fff" }}
                        >
                            Enter your Last name
                        </FormControl.Label>
                        <Input
                            w="full"
                            fontSize={fontSizes.sm}
                            fontWeight={600}
                            variant="underlined"
                            borderBottomColor={"light.200"}
                            placeholder="Enter your full name"
                            placeholderTextColor="gray.300"
                            _dark={{
                                color: "#fff",
                                placeholderTextColor: "white",
                            }}
                            rightElement={
                                <Pressable>
                                    <Pen width={scale(16)} height={scale(16)} />
                                </Pressable>
                            }
                            value={formik.values.l_name}
                            onChangeText={formik.handleChange("l_name")}
                            onBlur={formik.handleBlur("l_name")}
                        />

                        <FormControl.ErrorMessage>
                            {formik.errors.l_name}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl
                        mt={3}
                        w="full"
                        isInvalid={Boolean(formik.errors.dob)}
                    >
                        <FormControl.Label
                            fontSize={fontSizes.xs}
                            color="gray.400"
                            _dark={{ color: "#fff" }}
                        >
                            Fill your date of birth
                        </FormControl.Label>
                        <Input
                            w="full"
                            fontSize={fontSizes.sm}
                            fontWeight={600}
                            variant="underlined"
                            borderBottomColor={"light.200"}
                            placeholder="22/12/2000"
                            placeholderTextColor="gray.300"
                            _dark={{
                                color: "#fff",
                                placeholderTextColor: "white",
                            }}
                            rightElement={
                                <Pressable
                                    onPress={() => {
                                        setShowDatePiker(true);
                                    }}
                                >
                                    <Pen width={scale(16)} height={scale(16)} />
                                </Pressable>
                            }
                            value={formik.values.dob}
                            onChangeText={formik.handleChange("dob")}
                            onBlur={formik.handleBlur("dob")}
                            // editable={false}
                            // pointerEvents="none"
                            isReadOnly={true}
                        />
                        <FormControl.ErrorMessage>
                            {formik.errors.dob}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl
                        mt={3}
                        w="full"
                        isInvalid={Boolean(formik.errors.phone)}
                    >
                        <FormControl.Label
                            fontSize={fontSizes.xs}
                            color="gray.400"
                            _dark={{ color: "#fff" }}
                        >
                            Enter your mobile number
                        </FormControl.Label>
                        <Input
                            w="full"
                            fontSize={fontSizes.sm}
                            fontWeight={600}
                            variant="underlined"
                            borderBottomColor={"light.200"}
                            placeholder="Enter your mobile number"
                            placeholderTextColor="gray.300"
                            _dark={{
                                color: "#fff",
                                placeholderTextColor: "white",
                            }}
                            rightElement={
                                <Pressable
                                    onPress={() => {
                                        setShowPhoneInput(true);
                                    }}
                                >
                                    <Pen width={scale(16)} height={scale(16)} />
                                </Pressable>
                            }
                            onChangeText={formik.handleChange("phone")}
                            value={`${
                                formik.values.dialing_code?.includes("+")
                                    ? formik.values.dialing_code
                                    : `+${formik.values.dialing_code}`
                            } ${formik.values.phone}`}
                            isReadOnly={true}
                        />
                        <FormControl.ErrorMessage>
                            {formik.errors.phone}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl
                        mt={3}
                        w="full"
                        isInvalid={Boolean(formik.errors.email)}
                    >
                        <FormControl.Label
                            fontSize={fontSizes.xs}
                            color="gray.400"
                            _dark={{ color: "#fff" }}
                        >
                            Enter your email address
                        </FormControl.Label>
                        <Input
                            w="full"
                            fontSize={fontSizes.sm}
                            fontWeight={600}
                            variant="underlined"
                            borderBottomColor={"light.200"}
                            placeholder="Enter your email address"
                            placeholderTextColor="gray.300"
                            _dark={{
                                color: "#fff",
                                placeholderTextColor: "white",
                            }}
                            rightElement={
                                <Pressable>
                                    <Pen width={scale(16)} height={scale(16)} />
                                </Pressable>
                            }
                            value={formik.values.email}
                            onChangeText={formik.handleChange("email")}
                            onBlur={formik.handleBlur("email")}
                        />
                        <FormControl.ErrorMessage>
                            {formik.errors.email}
                        </FormControl.ErrorMessage>
                    </FormControl>
                </VStack>
                <GradientBtn
                    onPress={formik.handleSubmit}
                    title="Submit"
                    mx="auto"
                    mt="4"
                    disabled={result.isLoading}
                />
            </VStack>
            <DatePickerModal
                isOpen={showDatePiker}
                onClose={() => {
                    setShowDatePiker(false);
                }}
                setDate={(dt) => {
                    console.log("dt", dt);
                    formik.setFieldValue("dob", dayjs(dt).format("DD/MM/YYYY"));
                    setShowDatePiker(false);
                }}
            />
            <PhoneInputSheet
                isOpen={showPhoneInput}
                onClose={() => {
                    setShowPhoneInput(false);
                }}
                setPhoneText={({ dialingCode, phoneNumber }) => {
                    formik.setFieldValue("phone", phoneNumber);
                    formik.setFieldValue("dialing_code", dialingCode);
                    setShowPhoneInput(false);
                }}
                value={{
                    dialingCode: formik.values.dialing_code,
                    phoneNumber: formik.values.phone,
                }}
            />
        </KeyboardAwareScrollView>
    );
}
