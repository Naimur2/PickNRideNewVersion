import GradientBtn from "@components/GradientBtn/GradientBtn";
import useShowModal from "@hooks/useShowModal";
import { useUploadDocumentMutation } from "@store/api/v2/documentApi/documentApiSlice";
import { TDDocumentType } from "@store/api/v2/documentApi/documentApiSlice.types";
import { IAuthState } from "@store/features/auth/authSlice.types";
import {
    selectAllDocumentFieldValues,
    setDocumentFieldValue,
} from "@store/features/document/documentSlice";
import { selectAuth } from "@store/store";
import createFormFile from "@utils/fileDetails";
import {
    Checkbox,
    FormControl,
    HStack,
    Input,
    Pressable,
    Text,
    VStack,
} from "native-base";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import AddImage from "./AddImage/AddImage";
import ExpiryDate from "./DocumentForm/ExpiryDate/ExpiryDate";
import FormLabel from "./DocumentForm/FormLabel/FormLabel";
import { setCurrentForm } from "@store/features/auth/authSlice";
import { TCitizen } from "./DocumentForm/DocumentForm";

export default function IdSubmission({
    residentType,
    setResidentType,
}: {
    residentType: TCitizen;
    setResidentType: React.Dispatch<React.SetStateAction<TCitizen>>;
}) {
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);
    const values = useSelector(selectAllDocumentFieldValues);
    const [submitDocument, result] = useUploadDocumentMutation();

    const showModal = useShowModal();

    const userType = residentType;

    const resident_status = userType === "Residence" ? "0" : "1";

    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

    const firstDocumentTypes: {
        [key: number]: TDDocumentType;
    } = {
        0: "Address",
        1: "Passport",
    };

    const schema = Yup.object().shape({
        docId1: Yup.number().required("Required"),
        expiry1: Yup.string().required("Required"),
        frontImage1: Yup.string().required("Required"),
        backImage1: Yup.string().required("Required"),
    });

    const errorValidation = async () => {
        try {
            await schema.validate(values, { abortEarly: false });
            return {};
        } catch (err: any | Yup.ValidationError) {
            const errors: { [key: string]: string } = {};
            err?.inner?.forEach((error: any) => {
                errors[error.path] = error.message;
            });
            return errors;
        }
    };

    const setFieldValue = (field: string, value: any) => {
        dispatch(setDocumentFieldValue({ fieldName: field, value }));
    };

    const handleSubmit = async () => {
        try {
            const document1Form = new FormData();
            const document1Expiry = new Date(values.expiry1);
            document1Form.append("UserType", userType);
            document1Form.append(
                "DocumentType",
                firstDocumentTypes[resident_status as "0" | "1"] ?? "Address"
            );
            document1Form.append("DocId", values.docId1.toString());
            document1Form.append("Expiry", document1Expiry.toISOString());
            document1Form.append("Country", values.country);
            document1Form.append(
                "FrontImage",
                createFormFile(values.frontImage1) as any
            );
            document1Form.append(
                "BackImage",
                createFormFile(values.backImage1) as any
            );

            const res1 = await submitDocument(document1Form).unwrap();

            console.log(res1?.succeeded);

            if (res1.error) {
                showModal("error", {
                    title: "Error",
                    message: res1.error.message,
                });
            }

            if (res1?.succeeded) {
                alert(
                    "Documents uploaded successfully, please wait for approval"
                );
                dispatch(setCurrentForm(2));
            }
        } catch (error) {
            console.log(error);
            alert(error.message ?? "Something went wrong");
        }
    };

    const submitForm = async () => {
        console.log("submitting form");
        // // check if all the fields are filled
        const errorsValues = await errorValidation();
        const numberOfErrors = Object.keys(errorsValues).length;
        if (numberOfErrors > 0) {
            showModal("error", {
                title: "Error",
                message: "Please fill all the required fields to proceed",
            });
            return;
        }

        handleSubmit();
    };

    const handleAddMedia = async ({
        fieldName,
        uri,
    }: {
        fieldName: string;
        uri: string;
    }) => {
        // const base64Image = await convertToBase64(uri);
        setFieldValue(fieldName, uri);
    };

    React.useEffect(() => {
        (async () => {
            const errorsValues = await errorValidation();
            setErrors(errorsValues);
        })();
    }, [values]);

    return (
        <VStack>
            <FormControl mt={5}>
                <FormLabel title="Select Residence Status" />
                <HStack space={4} alignItems={"center"}>
                    <Checkbox
                        rounded={"full"}
                        bg="transparent"
                        borderColor="primary.100"
                        _checked={{
                            bg: "primary.100",
                            borderColor: "primary.100",
                        }}
                        value="Residence"
                        isChecked={userType === "Residence"}
                        onChange={(nextValue) => setResidentType("Residence")}
                    >
                        <Text fontSize={17} fontWeight={600}>
                            Residence
                        </Text>
                    </Checkbox>
                    <Checkbox
                        value="Tourist"
                        isChecked={userType === "Tourist"}
                        onChange={(nextValue) => setResidentType("Tourist")}
                        rounded={"full"}
                        bg="transparent"
                        borderColor="primary.100"
                        _checked={{
                            bg: "primary.100",
                            borderColor: "primary.100",
                        }}
                    >
                        <Text fontSize={17} fontWeight={600}>
                            Tourist
                        </Text>
                    </Checkbox>
                </HStack>
            </FormControl>
            <FormControl mt={5}>
                <FormLabel
                    title={
                        residentType === "Residence"
                            ? "ID Number"
                            : "Passport Number"
                    }
                />
                <Input
                    fontSize={17}
                    fontWeight={600}
                    variant="underlined"
                    borderBottomColor={"light.200"}
                    placeholder="Enter Id"
                    placeholderTextColor="gray.300"
                    keyboardType="number-pad"
                    _dark={{
                        color: "#fff",
                        placeholderTextColor: "white",
                    }}
                    onChangeText={(value) => setFieldValue("docId1", value)}
                    value={values.docId1}
                />
            </FormControl>

            <ExpiryDate
                onChange={(data) => {
                    setFieldValue("expiry1", data);
                }}
                date={values.expiry1 as Date}
            />

            <AddImage
                frontImage={values.frontImage1}
                backImage={values.backImage1}
                setFrontImage={(img) =>
                    handleAddMedia({
                        fieldName: "frontImage1",
                        uri: img,
                    })
                }
                setBackImage={(img) =>
                    handleAddMedia({
                        fieldName: "backImage1",
                        uri: img,
                    })
                }
                title={
                    resident_status === "0"
                        ? "Upload both sides of your ID Card"
                        : "Upload both sides of your Passport"
                }
            />

            <GradientBtn
                onPress={submitForm}
                mt="5"
                mb={8}
                title="Continue"
                disabled={result.isLoading}
                mx="auto"
            />
        </VStack>
    );
}
