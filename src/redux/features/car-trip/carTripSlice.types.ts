import { IValidateCarTripData } from "../../../screens/user-screens/ScanQrCode/ScanQrCode.types";

export interface ICarTripState {
    tripInfo: IValidateCarTripData | null;
    hasStartedJourney: boolean;
    isLocked: boolean;
    offerModalVisible: boolean;
}
