import { IValidateCarTripData } from "../ScanQrCode/ScanQrCode.types";

export interface IStartEndTripParams {
    type: "START" | "END";
    data: IValidateCarTripData;
}

const data = {
    requestId: "Qn7J4ZjHZJhAhgs646EYM",
    status: "fulfilled",
    endpointName: "endCarTrip",
    startedTimeStamp: 1675366790197,
    data: {
        data: {
            status: true,
            statusMessage: "Trip ended",
            tripDetails: {
                id: 4,
                type: 3,
                userId: 3,
                carId: 4,
                number: "190246",
                name: "Nissan Micra",
                tripStatus: "1",
                tripStartTime: "2023-02-02T19:34:20",
                tripEndTime: "2023-02-02T19:39:58.1886891Z",
                price: 55,
                tripDate: "2/2/2023 12:00:00 AM",
                totalTripTime: 5,
                totalKM: 0,
                startOdometer: 26187,
                endOdometer: 26187,
                startLatitude: 25.3169,
                startLongitude: 51.48055,
                endLatitude: 25.3169,
                endLongitude: 51.48055,
            },
        },
        succeeded: true,
    },
    fulfilledTimeStamp: 1675366798460,
    isUninitialized: false,
    isLoading: false,
    isSuccess: true,
    isError: false,
    originalArgs: { tripToken: "350424066650001" },
};
