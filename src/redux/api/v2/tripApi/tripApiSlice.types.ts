export interface IUploadCarImages {
    tripToken: string;
    vehicleNo: string;
    frontImage: string;
    backImage: string;
    leftSideImage: string;
    rightSideImage: string;
    tripAction?: "StartTrip" | "EndTrip";
}

export interface IValidateCarTripRequest {
    numberPlateImage: string;
    mobileLatitude: number;
    mobileLongitude: number;
    vehicleNo?: string;
}
export interface IRequestStartCarTrip {
    tripToken: string;
}

export interface IStartCarTripOtpType extends IRequestStartCarTrip {
    type: "sms" | "email";
}

export interface IStartCarTrip {
    otp: string;
    tripToken: string;
}

export interface IEndCarTrip extends IRequestStartCarTrip {}

export interface ICarCommands {
    ids: string[];
}
