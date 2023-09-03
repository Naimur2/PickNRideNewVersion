import {
    MFCardInfo,
    MFCustomerAddress,
    MFExecutePaymentRequest,
    MFRecurringModel,
    MFSendPaymentRequest,
    MFSupplier,
    MFInitiateSessionRequest,
    MFPaymentRequest,
} from "myfatoorah-reactnative";
import {
    MFCurrencyISO,
    MFLanguage,
    MFMobileCountryCodeISO,
    MFNotificationOption,
    MFRecurringType,
} from "../types/enums.myfatoora";
import {
    IExecuteResquestJson,
    IGetCardDetails,
    IGetSendPaymentRequest,
} from "../types/myfatoora.interface";

export function getCardInfo({
    cardNumber = "4111111111111111",
    cardExpiryMonth = "12",
    cardExpiryYear = "2022",
    cardSecureCode = "123",
    paymentType = "CARD",
    cardHolderName = "Test",
    saveToken = false,
    bypass = false,
}: IGetCardDetails) {
    // let paymentType = MFPaymentype.TOKEN
    let card = new MFCardInfo(
        cardNumber,
        cardExpiryMonth,
        cardExpiryYear,
        cardSecureCode,
        cardHolderName,
        paymentType,
        saveToken
    );
    card.bypass = bypass;
    return card;
}

export function executeResquestJson({
    invoiceValue = 1,
    paymentMethods = [],
    selectedIndex = 0,
}: IExecuteResquestJson) {
    let request = new MFExecutePaymentRequest(
        invoiceValue,
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
    const suppliers = [];
    let supplierCode = 1;
    let proposedShare = 1;
    let invoiceShare = invoiceValue;
    const supplier = new MFSupplier(supplierCode, proposedShare, invoiceShare);
    suppliers.push(supplier);
    request.suppliers = suppliers;
    request.recurringModel = new MFRecurringModel(MFRecurringType.Custom, 5, 6);
    // var productList = []
    // var product = new MFProduct("ABC", 1.887, 1)
    // productList.push(product)
    // request.invoiceItems = productList
    return request;
}

export function getSendPaymentRequest({
    invoiceValue = 1,
    mobileCountryIsoCode = "QATAR",
    displayCurrencyIso = "QATAR_QAR",
}: IGetSendPaymentRequest) {
    let request = new MFSendPaymentRequest(
        invoiceValue,
        MFNotificationOption.ALL,
        "Test"
    );

    request.customerEmail = "a@b.com"; // must be email
    request.customerMobile = "mobile no"; //Required
    request.customerCivilId = "";
    request.mobileCountryIsoCode = mobileCountryIsoCode;
    request.customerReference = "";
    request.language = "en";
    let address = new MFCustomerAddress("ddd", "sss", "sss", "sss", "sss");
    request.customerAddress = address;
    request.customerReference = "";
    request.language = "en";
    request.displayCurrencyIso = displayCurrencyIso;
    // var productList = []
    // var product = new MFProduct("ABC", 1.887, 1)
    // productList.push(product)
    // request.invoiceItems = productList
    return request;
}

export function initiateSessionForInAppApplePay(
    sessionId: string = "MF123"
): Promise<any> {
    let request = new MFInitiateSessionRequest(sessionId);
    return new Promise((resolve, reject) => {
        MFPaymentRequest.sharedInstance.initiateSession(
            request,
            MFLanguage.ENGLISH,
            (response: Response) => {
                if (response.getError()) {
                    reject(response.getError());
                } else {
                    resolve({
                        sessionId: response.getSessionId(),
                        countryCode: response.getCountryCode(),
                    });
                    // executePaymentForInAppApplePay(
                    //     response.getSessionId(),
                    //     response.getCountryCode()
                    // );
                }
            }
        );
    });
}

export function executeInAppApplePayResquestJson({
    invoiceValue = 1,
}: {
    invoiceValue?: number;
}) {
    let request = new MFExecutePaymentRequest(invoiceValue);
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

export function executePaymentForInAppApplePay({
    sessionId,
    countryCode,
    inAppApplePayViewRef,
    invoiceValue,
}: {
    sessionId: string;
    countryCode: string;
    inAppApplePayViewRef: any;
    invoiceValue: number;
}): Promise<any> {
    let request = executeInAppApplePayResquestJson({ invoiceValue });
    // alert(request.displayCurrencyIso)
    // showLoading()

    const promise = new Promise((resolve, reject) => {
        if (!inAppApplePayViewRef?.current) return reject("No ref");

        inAppApplePayViewRef?.current?.loadWithStartLoading(
            sessionId,
            countryCode,
            request,
            MFLanguage.ENGLISH,
            (response) => {
                console.log("executePaymentForInAppApplePay", response);
                if (response.getError()) {
                    reject(response.getError());
                } else {
                    let invoiceId = response.getInvoiceId();
                    let paymentStatusResponse = response.getBodyJson().Data;
                    alert(JSON.stringify(response.getBodyJson()));
                    resolve({
                        invoiceId,
                        paymentStatusResponse,
                        response,
                    });
                }
            }
        );
    });

    return promise;
}
