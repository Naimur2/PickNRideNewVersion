import { IValidationType } from "../SelectAuthOtpType/SelectAuthOtpType.types";

export interface WhatsAppNavitationProps {
    validationType: IValidationType;
    phoneCode: string;
    mobileNo: string;
}

export interface EmailForgotPasswordProps {
    validationType: IValidationType;
    emailId: string;
}

export interface ISelectValidateOtpTypeParams
    extends WhatsAppNavitationProps,
        EmailForgotPasswordProps {}
