export enum MFLanguage {
    ARABIC = "ar",
    ENGLISH = "en",
}

export enum MFNotificationOption {
    ALL = "all",
    EMAIL = "eml",
    SMS = "sms",
    LINK = "lnk",
}

export enum MFPaymentype {
    CARD = "card",
    TOKEN = "token",
}

export enum MFMobileCountryCodeISO {
    KUWAIT = "+965",
    SAUDIARABIA = "+966",
    BAHRAIN = "+973",
    UAE = "+971",
    QATAR = "+974",
    OMAN = "+968",
    JORDAN = "+962",
    EGYPT = "+20",
}

export enum MFCurrencyISO {
    KUWAIT_KWD = "KWD",
    SAUDIARABIA_SAR = "SAR",
    BAHRAIN_BHD = "BHD",
    UAE_AED = "AED",
    QATAR_QAR = "QAR",
    OMAN_MOR = "OMR",
    JORDAN_JOD = "JOD",
    EGYPT_EGP = "EGP",
    UNITEDSTATES_USD = "USD",
    EURO_EUR = "EUR",
}

export enum MFKeyType {
    INVOICEID = "InvoiceId",
    PAYMENTID = "PaymentId",
}

export enum MFPaymentMethodCode {
    AMEX = "ae",
    SADAD = "s",
    BENEFIT = "b",
    UAEDEBITCARDS = "uaecc",
    QATARDEBITCARDS = "np",
    MADA = "md",
    KFAST = "kf",
    KNET = "kn",
    APPLEPAY = "ap",
    AFS = "af",
    VISAMASTER = "vm",
    STCPAY = "stc",
}
export enum MFEnvironment {
    TEST = "TEST", //'https://apitest.myfatoorah.com',
    LIVE = "LIVE", //'https://api.myfatoorah.com'
}

export enum MFCountry {
    KUWAIT = "KWT",
    SAUDIARABIA = "SAU",
    BAHRAIN = "BHR",
    UNITEDARABEMIRATES = "ARE",
    QATAR = "QAT",
    OMAN = "OMN",
    JORDAN = "JOD",
    EGYPT = "EGY",
}
export enum MFRecurringType {
    Custom = "Custom",
    Daily = "Daily",
    Weekly = "Weekly",
    Monthly = "Monthly",
}
