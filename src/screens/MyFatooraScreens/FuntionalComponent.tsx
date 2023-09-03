import React, { useState } from "react";
import {
    ActivityIndicator,
    Button,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import CreditCardView from "./components/CreditCardView";
import InAppAppleView from "./components/InAppAppleView";
import PayButton from "./components/PayButton";
import PaymentMethodsList from "./components/PaymentMethodList";
import {
    initiateSessionForInAppApplePay,
    executePaymentForInAppApplePay,
} from "./lib/helpers";
import useMyFatoora from "./mfhooks/useMyFatoora";
import styles from "./styles/styles.myfatoora";
import { useNavigation } from "@react-navigation/native";
import { MFInAppApplePayView } from "myfatoorah-reactnative";

export default function FComp() {
    const navigation = useNavigation();
    //region USES_TATE HOOLKS
    const [loading, setLoading] = useState(false);
    const [recurringId, setRecurringId] = useState("");
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [invoiceValue, setInvoiceValue] = useState("5");
    const [cardNumber, setCardNumber] = useState("5123450000000008");
    const [cardHolderName, setCardHolderName] = useState("John Smith");
    const [month, setMonth] = useState("05");
    const [year, setYear] = useState("21");
    const [cvv, setCVV] = useState("100");
    const [isDirectPayment, setIsDirectPayment] = useState(false);
    const [appleSessionId, setAppleSessionId] = useState("");
    const [appleCountryCode, setAppleCountryCode] = useState("");

    const {
        initiatePayments,
        executeDirectPayment,
        executePayment,
        executeRecurringPayment,
        cancelRucrring,
        sendPayment,
        getPaymentStatus,
        initiateSessionForInAppApplePay: initiateSessionForInAppApplePayHook,
    } = useMyFatoora();

    const inAppApplePayViewRef = React.useRef(null);

    React.useEffect(() => {
        initiatePayments()
            .then((res) => {
                console.log("initiatePayments", res);
                setPaymentMethods(res?.Data?.PaymentMethods);
                setLoading(false);
            })
            .catch((err) => {
                console.log("initiatePayments", err);
                setLoading(false);
            });
    }, []);
    React.useEffect(() => {
        (async () => {
            try {
                const res1 = await initiateSessionForInAppApplePay("MF123");
                console.log("rest", res1);

                setAppleCountryCode(res1?.countryCode);
                setAppleSessionId(res1?.sessionId);

                const res2 = await executePaymentForInAppApplePay({
                    countryCode: res1?.countryCode,
                    sessionId: res1?.sessionId,
                    inAppApplePayViewRef,
                    invoiceValue: 5,
                });

                alert(res2);
            } catch (error) {
                console.log("error", error);
            }
        })();
    }, []);

    //region HANDLERS
    const onExecutePaymentButtonClickHandler = () => {
        if (paymentMethods[selectedIndex].IsDirectPayment) {
            executeDirectPayment({
                cardExpiryMonth: month,
                cardExpiryYear: year,
                cardHolderName,
                cardNumber,
                cardSecureCode: cvv,
                paymentMethods: paymentMethods,
                selectedIndex,
                invoiceValue: 1,
                paymentType: "CARD",
            })
                .then((res) => {
                    console.log("executeDirectPayment", res);
                })
                .catch((err) => {
                    console.log("executeDirectPayment", err);
                });
        } else {
            executePayment({
                invoiceValue: 1,
                paymentMethods: paymentMethods,
                selectedIndex,
            })
                .then((res) => {
                    console.log("executeDirectPayment", res);
                })
                .catch((err) => {
                    console.log("executeDirectPayment", err);
                });
        }
    };

    const onExecuteDirectPaymentButtonClickHandler = () => {
        executeDirectPayment({
            cardExpiryMonth: month,
            cardExpiryYear: year,
            cardHolderName,
            cardNumber,
            cardSecureCode: cvv,
            paymentMethods: paymentMethods,
            selectedIndex,
            invoiceValue: 1,
            paymentType: "CARD",
        })
            .then((res) => {
                console.log("executeDirectPayment", res);
            })
            .catch((err) => {
                console.log("executeDirectPayment", err);
            });
    };

    const onExecuteRecurringPaymentButtonClickHandler = () => {
        executeRecurringPayment({
            cardExpiryMonth: month,
            cardExpiryYear: year,
            cardHolderName,
            cardNumber,
            cardSecureCode: cvv,
            paymentMethods: paymentMethods,
            selectedIndex,
            invoiceValue: 1,
            paymentType: "CARD",
        })
            .then((res) => {
                console.log("executeDirectPayment", res);
            })
            .catch((err) => {
                console.log("executeDirectPayment", err);
            });
    };

    const onCancelRecurringPaymentButtonClickHandler = () => {
        cancelRucrring({ recurringId });
    };

    const onSendPaymentButtonClickHandler = () => {
        sendPayment({
            displayCurrencyIso: "QATAR_QAR",
            invoiceValue: 1,
            mobileCountryIsoCode: "QATAR",
        });
    };
    const onOpenCardPaymentButtonClickHandler = () => {
        navigation.navigate("CardPayment");
    };

    return (
        <View style={styles.container}>
            {loading && (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="balck" />
                </View>
            )}
            <View
                style={[
                    styles.welcome,
                    { marginBottom: 0, flexDirection: "row" },
                ]}
            >
                <Text
                    style={[
                        styles.instructions,
                        { fontWeight: "800", fontSize: 15, width: "100%" },
                    ]}
                >
                    Please Enter Payment Amount:
                </Text>
            </View>

            <View style={{ margin: 10, marginTop: 0, flexDirection: "row" }}>
                <TextInput
                    style={[
                        {
                            height: 40,
                            width: "100%",
                            textAlign: "center",
                            fontSize: 15,
                            fontWeight: "500",
                        },
                        styles.normalTextInputStyle,
                    ]}
                    placeholder="Invoice value"
                    onChangeText={(text) => setInvoiceValue(text)}
                    defaultValue={"5"}
                    keyboardType="decimal-pad"
                />
            </View>

            <View
                style={[
                    styles.welcome,
                    { marginBottom: 0, flexDirection: "row" },
                ]}
            >
                <Text
                    style={[
                        styles.instructions,
                        { fontWeight: "800", fontSize: 15, width: "100%" },
                    ]}
                >
                    Please Select Payment Method:
                </Text>
            </View>

            <PaymentMethodsList
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                paymentMethods={paymentMethods}
                setIsDirectPayment={setIsDirectPayment}
            />

            <CreditCardView
                isDirectPayment={isDirectPayment}
                cardNumber={cardNumber}
                cvv={cvv}
                month={month}
                year={year}
                cardHolderName={cardHolderName}
                setCardNumber={setCardNumber}
                setCVV={setCVV}
                setMonth={setMonth}
                setYear={setYear}
                setCardHolderName={setCardHolderName}
            />

            <PayButton
                selectedIndex={selectedIndex}
                onExecutePaymentButtonClickHandler={
                    onExecutePaymentButtonClickHandler
                }
            />

            <TouchableOpacity
                style={[styles.buttonStyle, { width: "70%" }]}
                onPress={onSendPaymentButtonClickHandler}
                underlayColor="#fff"
            >
                <Text
                    style={[
                        styles.buttonText,
                        { fontSize: 18, fontWeight: "500" },
                    ]}
                >
                    Send Payment
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.buttonStyle, { width: "70%" }]}
                onPress={onOpenCardPaymentButtonClickHandler}
                underlayColor="#fff"
            >
                <Text
                    style={[
                        styles.buttonText,
                        { fontSize: 18, fontWeight: "500" },
                    ]}
                >
                    Pay in app
                </Text>
            </TouchableOpacity>

            <InAppAppleView ref={inAppApplePayViewRef} />

            {/* <View
                style={{
                    height: 100,
                    margin: 0,
                    marginTop: 0,
                    flexDirection: "column",
                    padding: 0,
                    justifyContent: "space-evenly",
                    width: "100%",
                }}
            >
                <MFInAppApplePayView
                    ref={inAppApplePayViewRef}
                    height={35}
                    buttonText={"Buy with"}
                />
            </View> */}

            <Button
                title="Execute Direct Payment"
                onPress={onExecuteDirectPaymentButtonClickHandler}
            />
            <Button
                title="Execute Recurring Payment"
                onPress={onExecuteRecurringPaymentButtonClickHandler}
            />

            <Button
                title="Cancel Recurring Payment"
                onPress={onCancelRecurringPaymentButtonClickHandler}
            />
        </View>
    );
}
