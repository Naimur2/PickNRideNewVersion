import CheckBox from "@components/CheckBox/CheckBox";
import GradientBtn from "@components/GradientBtn/GradientBtn";
import { useUploadDocumentMutation } from "@store/api/v2/documentApi/documentApiSlice";
import { IAuthState } from "@store/features/auth/authSlice.types";
import {
    selectAllDocumentFieldValues,
    setDocumentFieldValue,
} from "@store/features/document/documentSlice";
import { selectAuth } from "@store/store";

import { Center, HStack, Pressable, Text, VStack } from "native-base";
import React from "react";

import useShowModal from "@hooks/useShowModal";
import { useNavigation } from "@react-navigation/native";
import { setCurrentForm } from "@store/features/auth/authSlice";
import createFormFile from "@utils/fileDetails";
import { useDispatch, useSelector } from "react-redux";
import Signature from "./DocumentForm/Signature/Signature";
import { TCitizen } from "./DocumentForm/DocumentForm";

export default function SignatureSubmission({
    residentType,
}: {
    residentType: TCitizen;
}) {
    const navigation = useNavigation();
    const [termAccept, setTermAccept] = React.useState(false);
    const dispatch = useDispatch();
    const values = useSelector(selectAllDocumentFieldValues) as any;
    const auth = useSelector(selectAuth);
    const { resident_status } = auth as IAuthState;
    const [submitDocument, result] = useUploadDocumentMutation();

    const showModal = useShowModal();

    const setFieldValue = (field: string, value: any) => {
        dispatch(setDocumentFieldValue({ fieldName: field, value }));
    };

    const userType = residentType;

    const handleSubmit = async () => {
        try {
            // formdata for signature
            const document3 = new FormData();
            const document2Expiry = new Date(values.expiry2);
            document3.append("UserType", userType);
            document3.append("DocumentType", "Signature");
            document3.append(
                "Signature",
                createFormFile(values.signature) as any
            );
            document3.append(
                "FrontImage",
                createFormFile(values.signature) as any
            );
            document3.append("Expiry", document2Expiry.toISOString());

            const res4 = await submitDocument(document3).unwrap();

            if (res4.error) {
                showModal("error", {
                    title: "Error",
                    message: res4.error.message,
                });
            }

            if (res4?.succeeded) {
                alert(
                    "Documents uploaded successfully, please wait for approval"
                );
                dispatch(setCurrentForm(undefined));
                if (navigation.canGoBack()) {
                    navigation.goBack();
                } else {
                    navigation.navigate("Dashboard");
                }
            }
        } catch (error) {
            console.warn(error);
            alert(error?.message ?? "Something went wrong");
        }
    };

    const submitForm = () => {
        if (termAccept) {
            handleSubmit();
        } else {
            alert("Please accept terms and conditions");
        }
    };

    return (
        <VStack>
            <Text fontSize="lg" fontWeight="semibold" mt={8} mb={4}>
                Please sign below
            </Text>
            <Signature
                setSignatureValue={(data) => {
                    setFieldValue("signature", data);
                }}
                signatureValue={values.signature}
            />

            <Center>
                <HStack space="2" mt={12}>
                    <Pressable onPress={() => setTermAccept((prev) => !prev)}>
                        <CheckBox isChecked={termAccept} />
                    </Pressable>
                    <Text
                        _dark={{
                            color: "#fff",
                        }}
                    >
                        Agree terms and condition
                    </Text>
                </HStack>
                <GradientBtn
                    onPress={submitForm}
                    mt="5"
                    mb={8}
                    title="Continue"
                    disabled={result.isLoading || !termAccept}
                />
            </Center>
        </VStack>
    );
}
