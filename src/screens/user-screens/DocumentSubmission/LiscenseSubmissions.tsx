import useShowModal from "@hooks/useShowModal";
import { useUploadDocumentMutation } from "@store/api/v2/documentApi/documentApiSlice";
import { setCurrentForm } from "@store/features/auth/authSlice";
import { IAuthState } from "@store/features/auth/authSlice.types";
import {
    selectAllDocumentFieldValues,
    setDocumentFieldValue,
} from "@store/features/document/documentSlice";
import { selectAuth } from "@store/store";

import { FormControl, Input, VStack } from "native-base";
import React from "react";
import CountryPicker from "react-native-country-picker-modal";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import GradientBtn from "@components/GradientBtn/GradientBtn";
import { EDocumentType } from "@store/api/v2/documentApi/documentApiSlice.types";
import AddImage from "./AddImage/AddImage";
import ExpiryDate from "./DocumentForm/ExpiryDate/ExpiryDate";
import FormLabel from "./DocumentForm/FormLabel/FormLabel";
import PickerButton from "./DocumentForm/PickerButton/PickerButton";
import createFormFile from "@utils/fileDetails";
import { TCitizen } from "./DocumentForm/DocumentForm";

export default function LiscenseSubmissions({
    residentType,
}: {
    residentType: TCitizen;
}) {
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);

    const values = useSelector(selectAllDocumentFieldValues) as any;
    const [submitDocument, result] = useUploadDocumentMutation();
    const [show, setShow] = React.useState(false);
    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
    const showModal = useShowModal();

    const userType = residentType;

    const schema = Yup.object().shape({
        docId2: Yup.number().required("Required"),
        expiry2: Yup.string().required("Required"),
        frontImage2: Yup.string().required("Required"),
        backImage2: Yup.string().required("Required"),
        country: Yup.string().required("Required"),
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
            const document2Form = new FormData();
            const document2Expiry = new Date(values.expiry2);
            document2Form.append("UserType", userType);
            document2Form.append("DocumentType", EDocumentType.Licence);
            document2Form.append("DocId", values.docId1.toString());
            document2Form.append("Expiry", document2Expiry.toISOString());
            document2Form.append("Country", values.country);
            document2Form.append(
                "FrontImage",
                createFormFile(values.frontImage1) as any
            );
            document2Form.append(
                "BackImage",
                createFormFile(values.backImage1) as any
            );
            document2Form.append(
                "InternationalLicence",
                values.isIntlLiscense.toString()
            );
            const res2 = await submitDocument(document2Form).unwrap();

            if (res2.error) {
                showModal("error", {
                    title: "Error",
                    message: res2.error.message,
                });
            }

            if (res2?.succeeded) {
                alert(
                    "Documents uploaded successfully, please wait for approval"
                );
                dispatch(setCurrentForm(3));
            }
        } catch (error) {
            console.warn(error);
            alert(error?.message ?? "Something went wrong");
        }
    };

    const submitForm = async () => {
        // check if all the fields are filled
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
            <FormControl mb={2} mt={2}>
                <FormLabel title="License Issue Country" />

                <PickerButton
                    onPress={() => setShow(true)}
                    pt={0}
                    isActive={values.countryName !== ""}
                    value={values.countryName || "Select Country"}
                    divider
                />

                {show && (
                    <CountryPicker
                        onClose={() => setShow(false)}
                        visible={show}
                        onSelect={(dt) => {
                            setFieldValue("countryName", dt.name);
                            setFieldValue("country", dt.cca2);
                            setShow(false);
                        }}
                        countryCode="QA"
                        withFilter
                    />
                )}
            </FormControl>

            <FormControl mb={2} mt={3}>
                <FormLabel title="License Number" />
                <Input
                    fontSize={17}
                    fontWeight={600}
                    variant="underlined"
                    placeholder="Enter Id"
                    borderBottomColor={"light.200"}
                    placeholderTextColor="gray.300"
                    keyboardType="number-pad"
                    _dark={{
                        color: "#fff",
                        placeholderTextColor: "white",
                    }}
                    onChangeText={(value) => setFieldValue("docId2", value)}
                    value={values.docId2}
                />
            </FormControl>
            <ExpiryDate
                onChange={(data) => {
                    setFieldValue("expiry2", data);
                }}
                date={values.expiry2 as Date}
            />

            <AddImage
                frontImage={values.frontImage2}
                backImage={values.backImage2}
                setFrontImage={(img) =>
                    handleAddMedia({
                        fieldName: "frontImage2",
                        uri: img,
                    })
                }
                setBackImage={(img) =>
                    handleAddMedia({
                        fieldName: "backImage2",
                        uri: img,
                    })
                }
                title="Upload both sides of your License"
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
