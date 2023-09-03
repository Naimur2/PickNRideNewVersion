import creditCardImage from "@assets/images/credit-card.png";
import Camera from "@assets/svgs/Camera";
import ErrorMessage from "@components/ErrorMessage/ErrorMessage";
import ErrorToast from "@components/ErrorToast/ErrorToast";
import GradientBtn from "@components/GradientBtn/GradientBtn";
import OutlineButton from "@components/OutlineButton/OutlineButton";
import Scroller from "@components/Scroller/Scroller";
import useShowModal from "@hooks/useShowModal";
import { useNavigation } from "@react-navigation/native";
import { useAddCardsApiMutation } from "@store/api/auth/authApi/authApiSlice";
import { fontSizes } from "@theme/typography";
import { useFormik } from "formik";
import {
    FormControl,
    HStack,
    Image,
    Input,
    Text,
    Toast,
    VStack,
} from "native-base";
import React from "react";
import { Dimensions, Platform } from "react-native";
import { scale } from "react-native-size-matters";
import * as Yup from "yup";

const WINDOW_HEIGHT = Dimensions.get("window").height;

interface IRouteProps {
    arrivalDate: string;
    citizenShip: {
        id: string;
        type: string;
    };
}

export default function AddCards() {
    const navigation = useNavigation();
    const showModal = useShowModal();

    const [addCard, result] = useAddCardsApiMutation();

    React.useEffect(() => {
        if (
            result.data?.status === 400 ||
            result.data?.status === 500 ||
            result.isError
        ) {
            showModal("error", {
                title: "Error",
                message: result.data?.message || "Something went wrong",
            });
        }
    }, [result]);

    const initialState = {
        card_name: "",
        card_number: "",
        expiry_month: "",
        expiry_year: "",
        cvv: "",
    };

    // q:minimum number of digit in credit card number?
    const creditCardNumberSchema = Yup.object().shape({
        card_name: Yup.string().required("Card name is required"),
        card_number: Yup.string()
            .min(16, "Card Must have 16 characters")
            .required("Card number is required"),
        expiry_month: Yup.string()
            .required("Required")
            .min(2, "Invalid")
            .max(2, "Invalid"),
        expiry_year: Yup.string()
            .required("Required")
            .min(4, "Invalid")
            .max(4, "Invalid"),
        cvv: Yup.string()
            .required("Required")
            .min(3, "Invalid")
            .max(3, "Invalid"),
    });

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: creditCardNumberSchema,
        onSubmit: async (values) => {
            await addCard(values);
        },
    });

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
        formik;

    React.useLayoutEffect(() => {
        let clear = true;
        navigation.setOptions({
            headerTitle: () => (
                <Text
                    fontWeight={700}
                    fontSize={16}
                    textTransform={"uppercase"}
                    color={"gray.400"}
                    _dark={{
                        color: "white",
                    }}
                >
                    Add Cards
                </Text>
            ),
            headerTitleAlign: "center",
            headerTitleVisible: true,
            headerBackTitleVisible: false,
        });
        if (clear) {
            return () => {
                clear = false;
            };
        }
    }, [navigation]);

    return (
        <Scroller bg="#fff">
            <VStack
                pb={"50px"}
                flex="1"
                alignItems={"center"}
                _dark={{
                    bg: "#000",
                }}
                pt={Platform.OS === "android" ? 55 : 0}
            >
                <HStack
                    mt={5}
                    width={"full"}
                    height={WINDOW_HEIGHT * 0.29 + "px"}
                >
                    <Image
                        width={"full"}
                        height={"full"}
                        resizeMode="contain"
                        source={creditCardImage}
                        alt="credit-card"
                    />
                </HStack>
                <VStack width={scale(300) + "px"} space="4">
                    <Text
                        fontWeight={600}
                        fontSize={fontSizes.md}
                        _dark={{ color: "#fff" }}
                    >
                        Card Details
                    </Text>
                    <FormControl>
                        <FormControl.Label
                            fontSize={fontSizes.xs}
                            color="gray.400"
                            _dark={{ color: "#fff" }}
                        >
                            Name
                        </FormControl.Label>
                        <Input
                            fontSize={fontSizes.sm}
                            fontWeight={600}
                            variant="underlined"
                            borderBottomColor={"light.200"}
                            placeholder="Enter name"
                            placeholderTextColor="gray.300"
                            _dark={{
                                color: "#fff",
                                placeholderTextColor: "white",
                            }}
                            value={values.card_name}
                            onChangeText={handleChange("card_name")}
                            onBlur={handleBlur("card_name")}
                        />
                        {errors.card_name && touched.card_name ? (
                            <ErrorMessage>{errors.card_name}</ErrorMessage>
                        ) : null}
                    </FormControl>
                    <FormControl>
                        <FormControl.Label
                            fontSize={fontSizes.xs}
                            color="gray.400"
                            _dark={{ color: "#fff" }}
                        >
                            Card Number
                        </FormControl.Label>
                        <Input
                            fontSize={fontSizes.sm}
                            fontWeight={600}
                            variant="underlined"
                            borderBottomColor={"light.200"}
                            placeholder="0000 0000 0000 0000"
                            placeholderTextColor="gray.300"
                            _dark={{
                                color: "#fff",
                                placeholderTextColor: "white",
                            }}
                            value={values.card_number}
                            onChangeText={handleChange("card_number")}
                            onBlur={handleBlur("card_number")}
                            keyboardType="numeric"
                        />
                        {errors.card_number && touched.card_number ? (
                            <ErrorMessage>{errors.card_number}</ErrorMessage>
                        ) : null}
                    </FormControl>

                    <HStack justifyContent="space-between">
                        <FormControl w={"31%"}>
                            <FormControl.Label
                                fontSize={fontSizes.xs}
                                color="gray.400"
                                _dark={{ color: "#fff" }}
                            >
                                Expiry Month
                            </FormControl.Label>
                            <Input
                                fontSize={fontSizes.sm}
                                fontWeight={600}
                                variant="underlined"
                                borderBottomColor={"light.200"}
                                placeholder="01"
                                placeholderTextColor="gray.300"
                                _dark={{
                                    color: "#fff",
                                    placeholderTextColor: "white",
                                }}
                                value={values.expiry_month}
                                onChangeText={handleChange("expiry_month")}
                                onBlur={handleBlur("expiry_month")}
                                keyboardType="numeric"
                            />
                            {errors.expiry_month && touched.expiry_month ? (
                                <ErrorMessage>
                                    {errors.expiry_month}
                                </ErrorMessage>
                            ) : null}
                        </FormControl>
                        <FormControl w={"31%"}>
                            <FormControl.Label
                                fontSize={fontSizes.xs}
                                color="gray.400"
                                _dark={{ color: "#fff" }}
                            >
                                Expiry Year
                            </FormControl.Label>
                            <Input
                                fontSize={fontSizes.sm}
                                fontWeight={600}
                                variant="underlined"
                                borderBottomColor={"light.200"}
                                placeholder="2000"
                                placeholderTextColor="gray.300"
                                _dark={{
                                    color: "#fff",
                                    placeholderTextColor: "white",
                                }}
                                value={values.expiry_year}
                                onChangeText={handleChange("expiry_year")}
                                onBlur={handleBlur("expiry_year")}
                                keyboardType="numeric"
                            />
                            {errors.expiry_year && touched.expiry_year ? (
                                <ErrorMessage>
                                    {errors.expiry_year}
                                </ErrorMessage>
                            ) : null}
                        </FormControl>
                        <FormControl w={"29%"}>
                            <FormControl.Label
                                fontSize={fontSizes.xs}
                                color="gray.400"
                                _dark={{ color: "#fff" }}
                            >
                                CVV
                            </FormControl.Label>
                            <Input
                                fontSize={fontSizes.sm}
                                fontWeight={600}
                                variant="underlined"
                                borderBottomColor={"light.200"}
                                placeholder="123"
                                placeholderTextColor="gray.300"
                                _dark={{
                                    color: "#fff",
                                    placeholderTextColor: "white",
                                }}
                                value={values.cvv}
                                onChangeText={handleChange("cvv")}
                                onBlur={handleBlur("cvv")}
                                keyboardType="numeric"
                            />

                            {errors.cvv && touched.cvv ? (
                                <ErrorMessage>{errors.cvv}</ErrorMessage>
                            ) : null}
                        </FormControl>
                    </HStack>
                </VStack>
                <Text
                    mt={4}
                    mb={2}
                    fontSize={fontSizes.md}
                    fontWeight={500}
                    color={"gray.100"}
                    _dark={{ color: "#fff" }}
                >
                    Or
                </Text>

                <OutlineButton
                    titleStyle={{ mr: "auto" }}
                    title={"SCAN YOUR CARD"}
                    rightIcon={() => (
                        <Camera width={scale(16)} height={scale(16)} />
                    )}
                    mt={2}
                    mb={4}
                />

                <GradientBtn
                    gradientStyle={{
                        width: scale(250) + "px",
                    }}
                    title={"Continue"}
                    onPress={handleSubmit}
                />
            </VStack>
        </Scroller>
    );
}
