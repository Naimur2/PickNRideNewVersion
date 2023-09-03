export type TDDocumentType = "Licence" | "Passport" | "Address";
export type TDUserType = "Residence" | "Tourist";

export enum EDocumentType {
    Licence = "Licence",
    Passport = "Passport",
    Address = "Address",
}

export enum EUserType {
    Residence = "Residence",
    Tourist = "Tourist",
}

export interface IDocument {
    documentType: TDDocumentType;
    docId: string;
    expiry: string;
    frontImage: string;
    backImage: string;
    country?: string;
}

export interface IDocumentImage {
    image: string;
}
export interface IDocumentVideo {
    video: string;
}

export interface IUserDocumentSubmission {
    userType: TDUserType;
    internationalLicence: boolean;
    documents: IDocument[];
    selfie?: IDocumentImage;
    signature: IDocumentImage;
    selfieVideo: IDocumentVideo;
}

export interface IDocu {
    documentType: TDDocumentType;
    docId: string;
    expiry: string;
    country: string;
    frontImage: string;
    backImage: string;
    internationalLicence?: boolean;
}

export interface IUploadUserDocument {
    userType: TDUserType;
    documents: IDocu[];
}
export interface IUploadUserSelfieVideo {
    userType: TDUserType;
    selfieVideo: string;
}
export interface IUploadUserSignatureImage {
    userType: TDUserType;
    signature: string;
}

export interface ITopUpBalance {
    paymentType: number;
    amount: number;
    payemntStatus: number;
    paymentData: string;
    remark: string;
}
