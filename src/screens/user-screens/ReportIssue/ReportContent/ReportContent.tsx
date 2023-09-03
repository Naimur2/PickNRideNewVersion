import CModal from "@components/CModal/CModal";
import Card from "@components/Card/Card";
import GradientBtn from "@components/GradientBtn/GradientBtn";
import { UploadIcon } from "@components/Icons/Icons";
import ImagePickerSheet from "@components/ImagePickerSheet/ImagePickerSheet";
import * as ImagePicker from "expo-image-picker";
import { HStack, Input, Text, VStack } from "native-base";
import React from "react";
import { Alert, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import { ISelection } from "../ReportIssue";
import TopSelection from "../TopSelection/TopSelection";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCreateSupportMutation } from "@store/api/v2/supportApi";
import LoadingView from "@components/LoadingView/LoadingView";
import useShowModal from "@hooks/useShowModal";

export default function ReportContent({
    selections,
}: {
    selections: ISelection[];
}) {
    const [selectedMenu, setSelectedMenu] = React.useState(1);
    const showModal = useShowModal();
    const [sendReport, { isLoading }] = useCreateSupportMutation();
    const navigation = useNavigation();
    const [image, setImage] = React.useState<string | null>(null);
    const [isOpenImagePickerSheet, setIsOpenImagePickerSheet] =
        React.useState(false);
    const insets = useSafeAreaInsets();
    const params = useRoute().params as { tripId: string };

    console.log("params", params);

    const [isOpen, setIsOpen] = React.useState(false);
    const selectedImage = image?.split("/").pop();

    const checkImagePermission = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
        } else {
            setIsOpenImagePickerSheet(true);
        }
    };

    const formik = useFormik({
        initialValues: {
            customerMessage: "",
            categoryId: 0,
        },
        onSubmit: async (values) => {
            try {
                await sendReport({
                    categoryId: values.categoryId,
                    customerMessage: values.customerMessage,
                    tripID: parseInt(params?.tripId),
                });

                showModal("success", {
                    title: "Success",
                    message:
                        "Your report has been sent successfully, we will get back to you soon",
                });

                setTimeout(() => {
                    if (navigation.canGoBack()) {
                        navigation.goBack();
                    }
                }, 2000);
            } catch (error) {
                showModal("error", {
                    title: "Error",
                    message: "Something went wrong, please try again later",
                });
            }
        },
        validationSchema: Yup.object().shape({
            customerMessage: Yup.string().required("Required"),
            categoryId: Yup.number().required("Required"),
        }),
    });

    return (
        <VStack
            space={6}
            mt={4}
            px="6"
            pb={8}
            h="full"
            maxWidth={scale(500)}
            mx="auto"
            pt={Platform.OS === "android" ? 55 : 0}
        >
            <HStack justifyContent={"space-between"}>
                {selections?.map((selection, id) => (
                    <TopSelection
                        key={selection._id}
                        isActive={selectedMenu === selection._id}
                        iconName={selection.icon}
                        title={selection.title}
                        onPress={() => {
                            setSelectedMenu(selection._id);
                            formik.setFieldValue("categoryId", selection._id);
                        }}
                    />
                ))}
                {formik.errors.categoryId && formik.touched.categoryId ? (
                    <Text color="red.500" fontSize={12} fontWeight={500}>
                        {formik.errors.categoryId}
                    </Text>
                ) : null}
            </HStack>

            {/* <Card onPress={checkImagePermission} shadow={5}>
                <HStack justifyContent={"space-between"}>
                    <Text
                        color="gray.100"
                        fontSize={12}
                        fontWeight={500}
                        maxWidth={200}
                        numberOfLines={1}
                    >
                        {selectedImage ? selectedImage : "Browse image"}
                    </Text>
                    <UploadIcon fontSize={18} color="gray.100" />
                </HStack>
            </Card> */}
            <Card px="3" shadow="5">
                <Input
                    _focus={{
                        bg: "transparent",
                    }}
                    numberOfLines={15}
                    placeholder="Describe your issue"
                    multiline={true}
                    textAlignVertical={"top"}
                    borderWidth={0}
                    height={200}
                    _dark={{
                        bg: "gray.200",
                    }}
                    bg="#fff"
                    placeholderTextColor={"gray.100"}
                    onChangeText={formik.handleChange("customerMessage")}
                    value={formik.values.customerMessage}
                    onBlur={formik.handleBlur("customerMessage")}
                />
                {formik.errors.customerMessage &&
                formik.touched.customerMessage ? (
                    <Text color="red.500" fontSize={12} fontWeight={500}>
                        {formik.errors.customerMessage}
                    </Text>
                ) : null}
            </Card>
            {/* <ImagePickerSheet
                isOpen={isOpenImagePickerSheet}
                onClose={() => setIsOpenImagePickerSheet(false)}
                setImage={(img) => {
                    setIsOpenImagePickerSheet(false);
                    setImage(img);
                }}
            /> */}
            <GradientBtn
                mt="20%"
                title="report"
                mx="auto"
                onPress={formik.handleSubmit}
            />
            {isOpen ? (
                <CModal isOpen={isOpen} onClose={() => setIsOpen(false)} py={8}>
                    <Text
                        textAlign={"center"}
                        color="#000"
                        fontSize={28}
                        fontWeight={600}
                        mb={4}
                    >
                        Thank you for reaching out
                    </Text>
                    <Text
                        textAlign={"center"}
                        color="#000"
                        fontSize={13}
                        fontWeight={500}
                        color="gray.100"
                        mb={4}
                    >
                        We handle all reported issues seriously.
                    </Text>
                    <Text
                        textAlign={"center"}
                        color="#000"
                        fontSize={13}
                        fontWeight={500}
                        color="gray.100"
                        mb={4}
                    >
                        A member of the Pick & Ride team will contact you.
                    </Text>
                    <Text
                        textAlign={"center"}
                        color="#000"
                        fontSize={13}
                        fontWeight={500}
                        color="gray.100"
                    >
                        Let us know if you have any other concerns by emailing
                    </Text>

                    <Text
                        textAlign={"center"}
                        color="#000"
                        fontSize={13}
                        fontWeight={500}
                        color="gray.100"
                    >
                        <Text color={"primary.100"}>
                            support@pickandride.qa
                        </Text>{" "}
                        or alternatively filling out the same form.
                    </Text>
                </CModal>
            ) : null}
        </VStack>
    );
}
