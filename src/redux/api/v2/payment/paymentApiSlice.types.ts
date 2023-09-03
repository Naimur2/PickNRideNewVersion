import { MFCurrencyISO } from "@screens/MyFatooraScreens/types/enums.myfatoora";

export interface IInitiateDirectPayment {
    currencyIso: MFCurrencyISO;
    invoiceValue: number;
}

export interface IExecuteDirectPaymentWithToken extends IInitiateDirectPayment {
    paymentMethodId: string;
}

export interface IExecuteDirectPaymentWithoutToken
    extends IInitiateDirectPayment {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    securityCode: string;
    cardHolderName: string;
    paymentMethodId: string;
}
