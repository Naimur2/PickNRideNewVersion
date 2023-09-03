export interface ISelectAuthOtpTypeParams {
    authType: "forgotPassword" | "login" | "signup" | "ChangePassword";
}

export type IValidationType = "email" | "whatsapp" | "phone";

export interface ISelectAuthTypeParams {
    validationType: IValidationType;
}
