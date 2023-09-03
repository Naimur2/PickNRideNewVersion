import { useNavigation } from "@react-navigation/native";
import {
    MFInitiatePayment,
    MFPaymentRequest,
    MFPaymentStatusRequest,
    MFSendPaymentRequest,
} from "myfatoorah-reactnative";
import {
    executeResquestJson,
    getCardInfo,
    getSendPaymentRequest,
} from "../lib/helpers";
import { MFCurrencyISO, MFKeyType, MFLanguage } from "../types/enums.myfatoora";
import {
    IExecuteResquestJson,
    IGetCardDetails,
    IGetSendPaymentRequest,
} from "../types/myfatoora.interface";

interface IExecutePayment extends IExecuteResquestJson {}
interface IExecuteDirectPayment extends IExecuteResquestJson, IGetCardDetails {}

export default function useMyFatoora() {
    const navigation = useNavigation();

    function initiatePayments(): Promise<any> {
        const promise = new Promise((resolve, reject) => {
            let initiateRequest = new MFInitiatePayment(
                50,
                MFCurrencyISO.QATAR_QAR
            );
            MFPaymentRequest.sharedInstance.initiatePayment(
                initiateRequest,
                MFLanguage.ENGLISH,
                (response: Response) => {
                    if (response?.getError()) {
                        reject(response?.getError().error);
                    } else {
                        resolve(response?.getBodyJson());
                    }
                }
            );
        });

        return promise;
    }

    function executePayment({
        invoiceValue,
        paymentMethods,
        selectedIndex,
    }: IExecutePayment): Promise<any> {
        let request = executeResquestJson({
            invoiceValue,
            paymentMethods,
            selectedIndex,
        });
        const promise = new Promise((resolve, reject) => {
            MFPaymentRequest.sharedInstance.executePayment(
                navigation,
                request,
                MFLanguage.ENGLISH,
                (response: Response) => {
                    if (response.getError()) {
                        reject(response.getError().error);
                        // alert("error: " + response.getError().error);
                    } else {
                        const bodyString = response.getBodyString();
                        const invoiceId = response.getInvoiceId();
                        const paymentStatusResponse =
                            response.getBodyJson().Data;
                        resolve({
                            bodyString,
                            invoiceId,
                            paymentStatusResponse,
                        });
                        // alert(
                        //     "success with Invoice Id: " +
                        //         invoiceId +
                        //         ", Invoice status: " +
                        //         paymentStatusResponse.InvoiceStatus +
                        //         "Recurring Id: " +
                        //         paymentStatusResponse.RecurringId
                        // );
                    }
                }
            );
        });

        return promise;
    }

    function initiateSessionForInAppApplePay({
        sessionId = "MF123",
    }: {
        sessionId?: string;
    }): Promise<any> {
        let request = new MFInitiateSessionRequest(sessionId);
        return new Promise((resolve, reject) => {
            MFSendPaymentRequest.sharedInstance.initiateSession(
                request,
                MFLanguage.ENGLISH,
                (response: Response) => {
                    if (response.getError()) {
                        reject(response.getError());
                    } else {
                        resolve(response);
                        // executePaymentForInAppApplePay(
                        //     response.getSessionId(),
                        //     response.getCountryCode()
                        // );
                    }
                }
            );
        });
    }

    function executeDirectPayment({
        invoiceValue,
        paymentMethods,
        selectedIndex,
        cardExpiryMonth,
        cardExpiryYear,
        cardNumber,
        cardSecureCode,
        cardHolderName,
        paymentType,
        saveToken,
        bypass,
    }: IExecuteDirectPayment): Promise<any> {
        let request = executeResquestJson({
            invoiceValue,
            paymentMethods,
            selectedIndex,
        });
        let cardInfo = getCardInfo({
            cardExpiryMonth,
            cardExpiryYear,
            cardNumber,
            cardSecureCode,
            cardHolderName,
            paymentType,
            saveToken,
            bypass,
        });

        const promise = new Promise((resolve, reject) => {
            MFPaymentRequest.sharedInstance.executeDirectPayment(
                navigation,
                request,
                cardInfo,
                MFLanguage.ENGLISH,
                (response: Response) => {
                    if (response?.getError()) {
                        reject(response.getError().error);
                    } else {
                        const paymentStatusResponse =
                            response?.getBodyJson()?.getPaymentStatusResponse;
                        const invoiceId = paymentStatusResponse.InvoiceId;
                        resolve({
                            invoiceId,
                            paymentStatusResponse,
                        });
                    }
                }
            );
        });

        return promise;
    }

    function executeRecurringPayment({
        invoiceValue,
        paymentMethods,
        selectedIndex,
        cardExpiryMonth,
        cardExpiryYear,
        cardNumber,
        cardSecureCode,
        cardHolderName,
        paymentType,
        saveToken,
        bypass,
    }: IExecuteDirectPayment): Promise<any> {
        let request = executeResquestJson({
            invoiceValue,
            paymentMethods,
            selectedIndex,
        });
        let cardInfo = getCardInfo({
            cardExpiryMonth,
            cardExpiryYear,
            cardNumber,
            cardSecureCode,
            cardHolderName,
            paymentType,
            saveToken,
            bypass,
        });

        const promise = new Promise((resolve, reject) => {
            MFPaymentRequest.sharedInstance.executeRecurringPayment(
                navigation,
                request,
                cardInfo,
                10,
                MFLanguage.ENGLISH,
                (response: Response) => {
                    if (response.getError()) {
                        reject(response.getError().error);
                    } else {
                        const cardInfoResponse =
                            response.getBodyJson().cardInfoResponse;
                        const paymentStatusResponse =
                            response.getBodyJson().getPaymentStatusResponse;
                        const invoiceId = paymentStatusResponse.InvoiceId;
                        resolve({
                            invoiceId,
                            paymentStatusResponse,
                            recurringId: cardInfoResponse.RecurringId,
                            cardInfoResponse,
                        });
                    }
                }
            );
        });

        return promise;
    }

    function cancelRucrring({
        recurringId,
    }: {
        recurringId: string;
    }): Promise<any> {
        const promise = new Promise((resolve, reject) => {
            MFPaymentRequest.sharedInstance.cancelRecurringPayment(
                recurringId,
                MFLanguage.ENGLISH,
                (response: Response) => {
                    if (response.getError()) {
                        reject(response.getError().error);
                    } else {
                        resolve(response.getBodyJson());
                    }
                }
            );
        });

        return promise;
    }

    function sendPayment({
        displayCurrencyIso = "QATAR_QAR",
        invoiceValue = 1,
        mobileCountryIsoCode = "QATAR",
    }: IGetSendPaymentRequest): Promise<any> {
        let sendPaymentRequest = getSendPaymentRequest({
            displayCurrencyIso,
            invoiceValue,
            mobileCountryIsoCode,
        });

        const promise = new Promise((resolve, reject) => {
            MFPaymentRequest.sharedInstance.sendPayment(
                sendPaymentRequest,
                MFLanguage.ENGLISH,
                (response: Response) => {
                    if (response.getError()) {
                        reject(response.getError().error);
                    } else {
                        resolve(response.getBodyString());
                    }
                }
            );
        });

        return promise;
    }

    function getPaymentStatus({
        paymentId = "111111",
    }: {
        paymentId: string;
    }): Promise<any> {
        const paymentStatusRequest = new MFPaymentStatusRequest(
            paymentId,
            MFKeyType.PAYMENTID
        );

        const promise = new Promise((resolve, reject) => {
            MFPaymentRequest.sharedInstance.getPaymentStatus(
                paymentStatusRequest,
                MFLanguage.ENGLISH,
                (response: Response) => {
                    if (response.getError()) {
                        reject(response.getError().error);
                    } else {
                        resolve(response.getBodyString());
                    }
                }
            );
        });

        return promise;
    }

    return {
        initiatePayments,
        executePayment,
        executeDirectPayment,
        executeRecurringPayment,
        cancelRucrring,
        sendPayment,
        getPaymentStatus,
        initiateSessionForInAppApplePay,
    };
}
