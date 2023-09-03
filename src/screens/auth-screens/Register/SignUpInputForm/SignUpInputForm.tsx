import ErrorMessage from "@components/ErrorMessage/ErrorMessage";
import ErrorToast from "@components/ErrorToast/ErrorToast";
import GradientBtn from "@components/GradientBtn/GradientBtn";
import PasswordInput from "@components/PasswordInput/PasswordInput";
import PickCountry from "@components/PickCountry/PickCountry";
import Select from "@components/Select/Select";
import TextInput from "@components/TextInput/TextInput";
import useShowModal from "@hooks/useShowModal";
import { useNavigation } from "@react-navigation/native";
import { useRegisterApiMutation } from "@store/api/auth/authApi/authApiSlice";

import { useFormik } from "formik";
import { Toast, VStack } from "native-base";
import React from "react";
import * as Yup from "yup";

function SignUpInputForm() {
    const navigation = useNavigation();
    const [regster, result] = useRegisterApiMutation();
    const showModal = useShowModal();

    React.useEffect(() => {
        if (result.data?.status === 400) {
            console.log("result.error", result);
            showModal("error", {
                title: "Error",
                message: result.data?.message || "Something went wrong",
            });
        }
    }, [result]);

    React.useEffect(() => {
        if (result.isSuccess) {
            navigation.navigate("OtpScreen", {
                ...result.originalArgs,
            });
        }
    }, [result]);

    const schema = Yup.object().shape({
        f_name: Yup.string().required("First Name is required"),
        l_name: Yup.string().required("Last Name is required"),
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        password_1: Yup.string()
            .required("Password is required")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter and one number"
            ),
        password_2: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password_1"), null], "Passwords must match"),
        dialing_code: Yup.string().required("Dialing code is required"),
        phone: Yup.number().required("Phone number is required"),
        location_id: Yup.string().required("Location is required"),
    });

    const formik = useFormik({
        initialValues: {
            location_id: "",
            f_name: "",
            l_name: "",
            email: "",
            dialing_code: "+974",
            phone: "",
            password_1: "",
            password_2: "",
            country: "QA",
        },
        onSubmit: async (values) => {
            const {
                f_name,
                l_name,
                email,
                password_1,
                phone,
                dialing_code,
                location_id,
            } = values;

            const data = {
                location_id,
                f_name,
                l_name,
                email,
                dialing_code: "+" + dialing_code,
                phone: phone,
                password: password_1,
            };

            await regster(data);
        },
        validationSchema: schema,
    });

    const {
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
    } = formik;

    return (
        <VStack mt={10} space={3} shadow="7">
            <VStack>
                <Select
                    onSelect={(id) => setFieldValue("location_id", id)}
                    selected={values.location_id}
                />
                {touched.location_id && errors.location_id ? (
                    <ErrorMessage>{errors?.location_id}</ErrorMessage>
                ) : null}
            </VStack>

            <TextInput
                placeholder="First Name"
                value={values.f_name}
                onChangeText={handleChange("f_name")}
                onBlur={handleBlur("f_name")}
                error={touched.f_name && errors.f_name}
            />
            <TextInput
                placeholder="Last Name"
                value={values.l_name}
                onChangeText={handleChange("l_name")}
                onBlur={handleBlur("l_name")}
                error={touched.l_name && errors.l_name}
            />
            <TextInput
                placeholder="Email"
                value={values.email}
                onChangeText={(value) => setFieldValue("email", value)}
                onBlur={handleBlur("email")}
                error={touched.email && errors.email}
                onChange={(e) => {
                    console.log("text", e.nativeEvent.text);
                }}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <PasswordInput
                placeholder="Password"
                value={values.password_1}
                onChangeText={handleChange("password_1")}
                onBlur={handleBlur("password_1")}
                error={touched.password_1 && errors.password_1}
            />

            <PasswordInput
                placeholder="Confirm Password"
                value={values.password_2}
                onChangeText={handleChange("password_2")}
                onBlur={handleBlur("password_2")}
                error={touched.password_2 && errors.password_2}
            />

            <VStack>
                <PickCountry
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    errorMessage={
                        touched.phone && errors.phone ? errors.phone : ""
                    }
                    setPhoneInfo={(phoneInfo) => {
                        setFieldValue("phone", phoneInfo?.phoneNumber);
                        setFieldValue("country", phoneInfo?.countryCode);
                        setFieldValue(
                            "dialing_code",
                            phoneInfo?.dialingCode.slice(1)
                        );
                    }}
                />
            </VStack>

            <GradientBtn
                gradientStyle={{ maxWidth: 250 }}
                title={"Sign Up"}
                mx={"auto"}
                mt={4}
                // onPress={() => navigation.navigate("OtpScreen")}
                onPress={handleSubmit}
                disabled={result?.isLoading}
            />
        </VStack>
    );
}

export default React.memo(SignUpInputForm);
