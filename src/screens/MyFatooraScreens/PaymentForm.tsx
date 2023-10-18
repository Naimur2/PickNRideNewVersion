import ErrorMessage from "@components/ErrorMessage/ErrorMessage";
import H3 from "@components/H3/H3";
import ImageBg from "@components/ImageBg/ImageBg";
import { setLoading } from "@store/features/ui/uiSlice";
import { fontSizes } from "@theme/typography";
import { useFormik } from "formik";
import {
  Center,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
  useColorMode,
} from "native-base";
import React, { useState } from "react";
import { scale } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import GradientBtn from "../../components/GradientBtn/GradientBtn";
import PaymentMethodsList from "./components/PaymentMethodList";
import useMyFatoora from "./mfhooks/useMyFatoora";
import {
  ICardListProps,
  IMyFatooraRouteParams,
} from "./types/myfatoora.interface";
import { useTopUpBalanceMutation } from "@store/api/v2/documentApi/documentApiSlice";
import { MFCurrencyISO } from "./types/enums.myfatoora";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  useExecuteDirectPaymentWithoutTokenMutation,
  useExecuteRegularPaymentMutation,
  useExexuteDirectPaymentWithTokenMutation,
  useInitiatePaymentMutation,
} from "@store/api/v2/payment/paymentApiSlice";

import * as WebBrowser from "expo-web-browser";
import useShowModal from "../../hooks/useShowModal";

export default function PaymentForm({
  paymentMethods,
  amount,
}: {
  paymentMethods: ICardListProps[];
  amount: number;
}) {
  const navigation = useNavigation();
  const showModal = useShowModal();
  const params = useRoute().params as IMyFatooraRouteParams;

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isDirectPayment, setIsDirectPayment] = useState(false);

  const [initiateDirectPaymentMutation, initiateDirectPaymentResult] =
    useInitiatePaymentMutation();

  const [execDirPayWithToken, execDirPayWithTokenResult] =
    useExexuteDirectPaymentWithTokenMutation();
  const [execDirPayWithoutToken, execDirPayWithoutTokenResult] =
    useExecuteDirectPaymentWithoutTokenMutation();
  const [regularPaymentFn, regularPaymentRes] =
    useExecuteRegularPaymentMutation();

  const initialState = {
    cardHolderName: "",
    cardNumber: "",
    month: "",
    year: "",
    cvv: "",
    paymentAmount: amount?.toString() || "",
    paymentMethodId: "",
  };

  // q:minimum number of digit in credit card number?
  const creditCardNumberSchema = Yup.object().shape({
    cardHolderName: Yup.string().required("Card name is required"),
    cardNumber: Yup.string().required("Card number is required"),
    month: Yup.string().required("Required"),
    year: Yup.string().required("Required"),
    cvv: Yup.string().required("Required"),
    paymentAmount: Yup.number().required("Required"),
  });

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: isDirectPayment ? creditCardNumberSchema : null,
    onSubmit: async (values) => {
      try {
        if (isDirectPayment) {
          const res2 = await execDirPayWithToken({
            currencyIso: MFCurrencyISO.QATAR_QAR,
            invoiceValue: parseFloat(values.paymentAmount),
            paymentMethodId: values.paymentMethodId,
          }).unwrap();

          if (res2.succeeded) {
            if (res2?.data?.paymentURL && res2?.data?.callBackURL) {
              navigation.navigate("RedirectionWebview", {
                url: res2?.data?.paymentURL,
                previousRoute: "MFWebView",
                callBackUrl: res2?.data?.callBackURL,
              });
              // const info = await WebBrowser.openAuthSessionAsync(
              //     res2?.data?.paymentURL,
              //     res2?.data?.callBackURL
              // );
              // console.log({ info });
            }

            alert("Payment Success");
          } else {
            const res3 = await execDirPayWithoutToken({
              currencyIso: MFCurrencyISO.QATAR_QAR,
              invoiceValue: parseFloat(values.paymentAmount),
              paymentMethodId: values.paymentMethodId,
              cardNumber: values.cardNumber,
              expiryMonth: values.month,
              expiryYear: values.year,
              securityCode: values.cvv,
              cardHolderName: values.cardHolderName,
            }).unwrap();
            console.log(res3);

            if (res3.succeeded) {
              if (res3?.data?.paymentURL && res3?.data?.callBackURL) {
                navigation.navigate("RedirectionWebview", {
                  url: res3?.data?.paymentURL,
                  previousRoute: "MFWebView",
                  callBackUrl: res3?.data?.callBackURL,
                });

                // console.log({ info });
              }
              alert("Payment Success");
            } else {
              alert("Payment Failed");
            }
          }
        } else {
          const res2 = await regularPaymentFn({
            currencyIso: MFCurrencyISO.QATAR_QAR,
            invoiceValue: parseFloat(values.paymentAmount),
            paymentMethodId: values.paymentMethodId,
          }).unwrap();

          const paymentUrl = res2?.data?.paymentURL;
          const callBackUrl = res2?.data?.callBackURL;

          navigation.navigate("RedirectionWebview", {
            url: paymentUrl,
            previousRoute: "MFWebView",
            callBackUrl: callBackUrl,
          });

          //   alert("Payment Success");
        }
      } catch (error) {
        alert("Payment Failed");
        console.log("initiateDirectPaymentMutation", error);
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
  } = formik;

  console.log(values);

  React.useEffect(() => {
    if (amount) {
      setFieldValue("paymentAmount", amount);
    }
  }, [amount]);

  const formHandler = () => {
    // if (isDirectPayment) {
    handleSubmit();
    // } else {
    //     onExecutePaymentButtonClickHandler();
    // }
  };

  return (
    <>
      <VStack p={6} space="4">
        {/* <H3>Select method</H3> */}
        <FormControl>
          <Text
            fontWeight={600}
            fontSize={fontSizes.sm}
            _dark={{ color: "#fff" }}
          >
            Enter Amount
          </Text>
          <Input
            fontSize={fontSizes.sm}
            fontWeight={600}
            variant="underlined"
            borderBottomColor={"light.200"}
            placeholder="Enter Amount"
            placeholderTextColor="gray.300"
            _dark={{
              color: "#fff",
              placeholderTextColor: "white",
            }}
            keyboardType="numeric"
            onChangeText={handleChange("paymentAmount")}
            onBlur={handleBlur("paymentAmount")}
            value={values.paymentAmount}
          />
        </FormControl>

        <Text
          fontWeight={600}
          fontSize={fontSizes.sm}
          _dark={{ color: "#fff" }}
        >
          Select Payment Method
        </Text>

        <PaymentMethodsList
          paymentMethods={paymentMethods}
          setIsDirectPayment={(val) => {
            console.log({ val });
            setIsDirectPayment(val);
          }}
          setPaymentMethodId={(value) => {
            setFieldValue("paymentMethodId", value);
          }}
          selectedPaymentMethodId={values.paymentMethodId}
        />

        {isDirectPayment ? (
          <VStack space="4">
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
                value={values.cardHolderName}
                onChangeText={handleChange("cardHolderName")}
                onBlur={handleBlur("cardHolderName")}
                autoCorrect={false}
                autoComplete="off"
              />
              {errors.cardHolderName && touched.cardHolderName ? (
                <ErrorMessage>{errors.cardHolderName}</ErrorMessage>
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
                value={values.cardNumber}
                onChangeText={handleChange("cardNumber")}
                onBlur={handleBlur("cardNumber")}
                keyboardType="numeric"
              />
              {errors.cardNumber && touched.cardNumber ? (
                <ErrorMessage>{errors.cardNumber}</ErrorMessage>
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
                  value={values.month}
                  onChangeText={handleChange("month")}
                  onBlur={handleBlur("month")}
                  keyboardType="numeric"
                  defaultValue={amount?.toString() || ""}
                />
                {errors.month && touched.month ? (
                  <ErrorMessage>{errors.month}</ErrorMessage>
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
                  value={values.year}
                  onChangeText={handleChange("year")}
                  onBlur={handleBlur("year")}
                  keyboardType="numeric"
                />
                {errors.year && touched.year ? (
                  <ErrorMessage>{errors.year}</ErrorMessage>
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
        ) : null}
      </VStack>
      <Center pb={20}>
        <GradientBtn
          gradientStyle={{
            width: scale(250) + "px",
          }}
          title={"Pay Now"}
          onPress={formHandler}
          disabled={formik.values.paymentMethodId === ""}
        />
      </Center>
    </>
  );
}
