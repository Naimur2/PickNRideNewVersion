import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    Image,
    View,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    TextInput,
    Button,
} from "react-native";
import {
    MFPaymentRequest,
    MFCustomerAddress,
    MFExecutePaymentRequest,
    MFCardInfo,
    MFSendPaymentRequest,
    MFLanguage,
    MFNotificationOption,
    MFPaymentype,
    MFMobileCountryCodeISO,
    MFCurrencyISO,
    MFPaymentStatusRequest,
    MFKeyType,
    MFInitiatePayment,
    MFInAppApplePayView,
    MFSupplier,
    MFRecurringModel,
    MFRecurringType,
    MFInitiateSessionRequest,
} from "myfatoorah-reactnative";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";

export default function ClassComp() {
    //region USES_TATE HOOLKS
    const navigation = useNavigation();
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
    const inAppApplePayViewRef = React.createRef();
    //endregion

    //region USE_EFFECT HOOKS
    useEffect(() => {
        initiatePayments();
        initiateSessionForInAppApplePay();
    }, []);
    //endregion

    //region HANDLERS
    const onExecutePaymentButtonClickHandler = () => {
        if (paymentMethods[selectedIndex].IsDirectPayment) {
            executeDirectPayment();
        } else {
            executePayment();
        }
    };

    const onExecuteDirectPaymentButtonClickHandler = () => {
        executeDirectPayment();
    };

    const onExecuteRecurringPaymentButtonClickHandler = () => {
        executeRecurringPayment();
    };

    const onCancelRecurringPaymentButtonClickHandler = () => {
        cancelRucrring();
    };

    const onSendPaymentButtonClickHandler = () => {
        sendPayment();
    };
    const onOpenCardPaymentButtonClickHandler = () => {
        navigation.navigate("CardPayment");
    };
    //endregion

    //region MFInApplePayView
    function inAppApplePayView() {
        return (
            <View
                style={{
                    height: 60,
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
                    hideLoadning={true}
                />
            </View>
        );
    }
    //endregion

    //region HELPER METHODS
    function showLoading() {
        setLoading(true);
    }
    function hideLoading() {
        setLoading(false);
    }

    function executeInAppApplePayResquestJson() {
        let request = new MFExecutePaymentRequest(parseFloat(invoiceValue));
        request.customerEmail = "a@b.com"; // must be email
        request.customerMobile = "";
        request.customerCivilId = "";
        let address = new MFCustomerAddress("ddd", "sss", "sss", "sss", "sss");
        request.customerAddress = address;
        request.customerReference = "";
        request.language = "en";
        request.mobileCountryCode = MFMobileCountryCodeISO.KUWAIT;
        request.displayCurrencyIso = MFCurrencyISO.KUWAIT_KWD;
        // request.supplierCode =
        // request.supplierValue =
        // var suppliers = []
        // var supplier = new MFSupplier(1, 1, parseFloat(invoiceValue))
        // suppliers.push(supplier)
        // request.suppliers = suppliers
        // var productList = []
        // var product = new MFProduct("ABC", 1.887, 1)
        // productList.push(product)
        // request.invoiceItems = productList
        return request;
    }
    //endregion

    //region myfaootrah-react-native methods
    function initiateSessionForInAppApplePay() {
        let request = new MFInitiateSessionRequest("MF123");
        MFPaymentRequest.sharedInstance.initiateSession(
            request,
            MFLanguage.ENGLISH,
            (response: Response) => {
                hideLoading();
                if (response.getError()) {
                    alert("error: " + response.getError().error);
                } else {
                    executePaymentForInAppApplePay(
                        response.getSessionId(),
                        response.getCountryCode()
                    );
                }
            }
        );
    }

    function executePaymentForInAppApplePay(sessionId, countryCode) {
        let request = executeInAppApplePayResquestJson();
        // alert(request.displayCurrencyIso)
        // showLoading()
        inAppApplePayViewRef.loadWithStartLoading(
            sessionId,
            countryCode,
            request,
            MFLanguage.ENGLISH,
            () => {
                showLoading();
            },
            (response) => {
                hideLoading();
                if (response.getError()) {
                    alert("error3: " + response.getError().error);
                } else {
                    var invoiceId = response.getInvoiceId();
                    var paymentStatusResponse = response.getBodyJson().Data;
                    alert(
                        "success with Invoice Id: " +
                            invoiceId +
                            ", Invoice status: " +
                            paymentStatusResponse.InvoiceStatus
                    );
                }
            }
        );
    }
    //endregion
    //endregion

    //region RENDER METHODS
    function payButton() {
        return selectedIndex == -1 ? (
            <TouchableOpacity
                disabled
                style={[styles.disabledButtonStyle, { width: "70%" }]}
                onPress={onExecutePaymentButtonClickHandler}
                underlayColor="#fff"
            >
                <Text
                    style={[
                        styles.buttonText,
                        { fontSize: 18, fontWeight: "500" },
                    ]}
                >
                    Pay
                </Text>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity
                style={[styles.buttonStyle, { width: "70%" }]}
                onPress={onExecutePaymentButtonClickHandler}
                underlayColor="#fff"
            >
                <Text
                    style={[
                        styles.buttonText,
                        { fontSize: 18, fontWeight: "500" },
                    ]}
                >
                    Pay
                </Text>
            </TouchableOpacity>
        );
    }
    function creditCardView() {
        return (
            isDirectPayment && (
                <View
                    style={{
                        margin: 0,
                        marginTop: 0,
                        flexDirection: "column",
                        padding: 10,
                        justifyContent: "space-evenly",
                        width: "100%",
                    }}
                >
                    <TextInput
                        style={[
                            { height: 40, width: "100%", padding: 5 },
                            styles.textInputStyle,
                        ]}
                        placeholder="Card number"
                        onChangeText={(text) => setCardNumber(text)}
                        defaultValue={cardNumber}
                        keyboardType="number-pad"
                    />
                    <TextInput
                        style={[
                            { height: 40, width: "100%", padding: 5 },
                            styles.textInputStyle,
                        ]}
                        placeholder="Card holder name"
                        onChangeText={(text) => setCardHolderName(text)}
                        defaultValue={cardHolderName}
                        keyboardType="default"
                    />

                    <View style={{ flexDirection: "row" }}>
                        <TextInput
                            style={[
                                { height: 40, width: "50%" },
                                styles.textInputStyle,
                            ]}
                            placeholder="Month"
                            onChangeText={(text) => setMonth(text)}
                            defaultValue={month}
                            keyboardType="number-pad"
                        />
                        <TextInput
                            style={[
                                { height: 40, width: "50%" },
                                styles.textInputStyle,
                            ]}
                            placeholder="Year"
                            onChangeText={(text) => setYear(text)}
                            defaultValue={year}
                            keyboardType="number-pad"
                        />
                    </View>
                    <TextInput
                        style={[
                            { height: 40, width: "100%" },
                            styles.textInputStyle,
                        ]}
                        placeholder="CVV"
                        onChangeText={(text) => setCVV(text)}
                        defaultValue={cvv}
                        keyboardType="number-pad"
                    />
                </View>
            )
        );
    }
    function paymentMethodsList() {
        return (
            <View style={styles.welcome}>
                <FlatList
                    horizontal
                    data={paymentMethods}
                    style={styles.flatList}
                    contentContainerStyle={{ justifyContent: "center" }}
                    renderItem={({ item: rowData, index: row }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedIndex(row);
                                    if (rowData.IsDirectPayment) {
                                        setIsDirectPayment(true);
                                    } else {
                                        setIsDirectPayment(false);
                                    }
                                }}
                                style={{ padding: 10 }} // adjust the styles to suit your needs
                            >
                                <View style={styles.container}>
                                    {selectedIndex == row ? (
                                        <Image
                                            style={[
                                                BackdropStyles.image,
                                                {
                                                    borderColor: "black",
                                                    borderWidth: 3,
                                                    borderRadius: 5,
                                                },
                                            ]}
                                            source={{ uri: rowData.ImageUrl }}
                                        />
                                    ) : (
                                        <Image
                                            style={BackdropStyles.image}
                                            source={{ uri: rowData.ImageUrl }}
                                        />
                                    )}

                                    <Text style={styles.welcome}>
                                        {" "}
                                        {rowData.PaymentMethodEn}{" "}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
    //endregion

    //region HELPER METHODS
    function showLoading() {
        setLoading(true);
    }
    function hideLoading() {
        setLoading(false);
    }
    function getCardInfo() {
        let cardExpiryMonth = month;
        let cardExpiryYear = year;
        let cardSecureCode = cvv;
        let paymentType = MFPaymentype.CARD;
        // let paymentType = MFPaymentype.TOKEN
        let saveToken = false;
        let card = new MFCardInfo(
            cardNumber,
            cardExpiryMonth,
            cardExpiryYear,
            cardSecureCode,
            cardHolderName,
            paymentType,
            saveToken
        );
        card.bypass = false;
        return card;
    }
    function executeResquestJson() {
        let request = new MFExecutePaymentRequest(
            parseFloat(invoiceValue),
            paymentMethods[selectedIndex].PaymentMethodId
        );
        request.customerEmail = "a@b.com"; // must be email
        request.customerMobile = "";
        request.customerCivilId = "";
        let address = new MFCustomerAddress("ddd", "sss", "sss", "sss", "sss");
        request.customerAddress = address;
        request.customerReference = "";
        request.language = "en";
        request.mobileCountryCode = MFMobileCountryCodeISO.KUWAIT;
        request.displayCurrencyIso = MFCurrencyISO.UAE_AED;
        var suppliers = [];
        let supplierCode = 1;
        let proposedShare = 1;
        let invoiceShare = parseFloat(invoiceValue);
        var supplier = new MFSupplier(
            supplierCode,
            proposedShare,
            invoiceShare
        );
        suppliers.push(supplier);
        request.suppliers = suppliers;
        request.recurringModel = new MFRecurringModel(
            MFRecurringType.Custom,
            5,
            6
        );
        // var productList = []
        // var product = new MFProduct("ABC", 1.887, 1)
        // productList.push(product)
        // request.invoiceItems = productList
        return request;
    }
    function getSendPaymentRequest() {
        let request = new MFSendPaymentRequest(
            parseFloat(invoiceValue),
            MFNotificationOption.ALL,
            "Test"
        );

        // send invoice link as sms to specified number
        //let request = new MFSendPaymentRequest(parseFloat(invoiceValue), MFNotificationOption.SMS, 'Test')
        // request.customerMobile  = '' // required here

        // get invoice link
        //let request = new MFSendPaymentRequest(parseFloat(invoiceValue), MFNotificationOption.LINK, 'Test')

        //  send invoice link to email
        //let request = new MFSendPaymentRequest(parseFloat(invoiceValue), MFNotificationOption.EMAIL, 'Test')
        // request.customerEmail = '' required here

        //request.userDefinedField = ''
        request.customerEmail = "a@b.com"; // must be email
        request.customerMobile = "mobile no"; //Required
        request.customerCivilId = "";
        request.mobileCountryIsoCode = MFMobileCountryCodeISO.KUWAIT;
        request.customerReference = "";
        request.language = "en";
        let address = new MFCustomerAddress("ddd", "sss", "sss", "sss", "sss");
        request.customerAddress = address;
        request.customerReference = "";
        request.language = "en";
        request.displayCurrencyIso = MFCurrencyISO.KUWAIT_KWD;
        // var productList = []
        // var product = new MFProduct("ABC", 1.887, 1)
        // productList.push(product)
        // request.invoiceItems = productList
        return request;
    }
    //endregion

    //region myfaootrah-react-native methods
    function initiatePayments() {
        let initiateRequest = new MFInitiatePayment(
            50,
            MFCurrencyISO.KUWAIT_KWD
        );
        showLoading();
        MFPaymentRequest.sharedInstance.initiatePayment(
            initiateRequest,
            MFLanguage.ENGLISH,
            (response: Response) => {
                hideLoading();
                if (response.getError()) {
                    alert("error: " + response.getError());
                } else {
                    setPaymentMethods(response.getPaymentMethods());
                }
            }
        );
    }
    function executePayment() {
        let request = executeResquestJson();
        showLoading();
        MFPaymentRequest.sharedInstance.executePayment(
            navigation,
            request,
            MFLanguage.ENGLISH,
            (response: Response) => {
                hideLoading();
                if (response.getError()) {
                    alert("error: " + response.getError().error);
                } else {
                    var bodyString = response.getBodyString();
                    var invoiceId = response.getInvoiceId();
                    var paymentStatusResponse = response.getBodyJson().Data;
                    alert(
                        "success with Invoice Id: " +
                            invoiceId +
                            ", Invoice status: " +
                            paymentStatusResponse.InvoiceStatus +
                            "Recurring Id: " +
                            paymentStatusResponse.RecurringId
                    );
                }
            }
        );
    }
    function executeDirectPayment() {
        let request = executeResquestJson();
        let cardInfo = getCardInfo();
        showLoading();
        MFPaymentRequest.sharedInstance.executeDirectPayment(
            navigation,
            request,
            cardInfo,
            MFLanguage.ENGLISH,
            (response: Response) => {
                hideLoading();
                if (response.getError()) {
                    alert("error: " + response.getError().error);
                } else {
                    // alert(response.getBodyString())
                    var paymentStatusResponse =
                        response.getBodyJson().getPaymentStatusResponse;
                    var invoiceId = paymentStatusResponse.InvoiceId;
                    alert(
                        "success with Invoice Id: " +
                            invoiceId +
                            ", Invoice status: " +
                            paymentStatusResponse.InvoiceStatus
                    );
                }
            }
        );
    }
    function executeRecurringPayment() {
        let request = executeResquestJson();
        let cardInfo = getCardInfo();
        showLoading();
        MFPaymentRequest.sharedInstance.executeRecurringPayment(
            navigation,
            request,
            cardInfo,
            10,
            MFLanguage.ENGLISH,
            (response: Response) => {
                hideLoading();
                if (response.getError()) {
                    alert("error: " + response.getError().error);
                } else {
                    alert(response.getBodyString());
                    var cardInfoResponse =
                        response.getBodyJson().cardInfoResponse;
                    setRecurringId(cardInfoResponse.RecurringId);
                    var paymentStatusResponse =
                        response.getBodyJson().getPaymentStatusResponse;
                    var invoiceId = paymentStatusResponse.InvoiceId;
                    alert(
                        "success with Invoice Id: " +
                            invoiceId +
                            ", Invoice status: " +
                            paymentStatusResponse.InvoiceStatus
                    );
                }
            }
        );
    }
    function cancelRucrring() {
        showLoading();
        MFPaymentRequest.sharedInstance.cancelRecurringPayment(
            recurringId,
            MFLanguage.ENGLISH,
            (response: Response) => {
                hideLoading();
                if (response.getError()) {
                    alert("error: " + response.getError().error);
                } else {
                    alert(response.getBodyString());
                    // var paymentStatusResponse = response.getBodyJson().getPaymentStatusResponse;
                    // var invoiceId = paymentStatusResponse.InvoiceId
                    // alert('success with Invoice Id: ' + invoiceId + ', Invoice status: ' + paymentStatusResponse.InvoiceStatus);
                }
            }
        );
    }
    function sendPayment() {
        showLoading();
        let sendPaymentRequest = getSendPaymentRequest();
        MFPaymentRequest.sharedInstance.sendPayment(
            sendPaymentRequest,
            MFLanguage.ENGLISH,
            (response: Response) => {
                hideLoading();
                if (response.getError()) {
                    alert("error: " + response.getError().error);
                } else {
                    alert(response.getBodyString());
                    // var paymentStatusResponse = response.getBodyJson().getPaymentStatusResponse;
                    // var invoiceId = paymentStatusResponse.InvoiceId
                    // alert('success with Invoice Id: ' + invoiceId + ', Invoice status: ' + paymentStatusResponse.InvoiceStatus);
                }
            }
        );
    }
    function getPaymentStatus() {
        var paymentStatusRequest = new MFPaymentStatusRequest(
            "111111",
            MFKeyType.PAYMENTID
        );
        MFPaymentRequest.sharedInstance.getPaymentStatus(
            paymentStatusRequest,
            MFLanguage.ENGLISH,
            (response: Response) => {
                if (response.getError()) {
                    alert("error: " + response.getError().error);
                } else {
                    alert(response.getBodyString());
                    // var paymentStatusResponse = response.getBodyJson().getPaymentStatusResponse;
                    // var invoiceId = paymentStatusResponse.InvoiceId
                    // alert('success with Invoice Id: ' + invoiceId + ', Invoice status: ' + paymentStatusResponse.InvoiceStatus);
                }
            }
        );
    }
    //endregion

    //region render
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

            {paymentMethodsList()}

            {creditCardView()}

            {payButton()}

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

            {inAppApplePayView()}

            {/*
      <Button title="Execute Recurring Payment"
        onPress={this.onExecuteRecurringPaymentButtonClickHandler}
      />
      
      <Button title="Cancel Recurring Payment"
        onPress={this.onCancelRecurringPaymentButtonClickHandler}
      /> */}
        </View>
    );
    //endregion
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        padding: 0,
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        alignSelf: "stretch",
        textAlign: "left",
        color: "#333333",
        marginBottom: 5,
    },
    loading: {
        margin: 10,
        opacity: 1,
        backgroundColor: null,
    },
    flatList: {
        height: 110,
        flexGrow: 0,
    },
    disabledButtonStyle: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "lightgray",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
    },
    buttonStyle: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#1E6738",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10,
    },
    textInputStyle: {
        borderColor: "lightgray",
        borderBottomWidth: 1,
        borderRadius: 5,
    },
    normalTextInputStyle: {
        borderColor: "lightgray",
        borderWidth: 1,
        borderRadius: 5,
    },
});

const BackdropStyles = {
    container: {
        flex: 1,
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: "contain",
    },
};
