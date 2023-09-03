// "succeeded": true,
//   "error": {
//     "message": "string",
//     "code": 0
//   },
//   "data": {
//     "tripToken": "string",
//     "vehicleNo": "string",
//     "isValidVehicle": true
//   }

export interface IValidateCarTripData {
    tripToken: string;
    vehicleNo: string;
    isValidVehicle: boolean;
}

export interface IValidateCarTripResponse {
    data: IValidateCarTripData;
    succeeded: boolean;
}
