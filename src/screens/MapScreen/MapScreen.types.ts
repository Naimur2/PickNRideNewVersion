export interface ILatLng {
    latitude: number;
    longitude: number;
}

// const veichle = {
//     id: 0,
//     connected: 0,
//     name: "string",
//     carNumber: "string",
//     imei: "string",
//     ioTSimNumber: "string",
//     ioTBattery: "string",
//     speedLimit: 0,
//     fuel: 0,
//     totalKm: "string",
//     latitude: 0,
//     longitude: 0,
//     status: 0,
//     price: 0,
//     inTrip: 0,
//     imageName: "string",
//     image: "string",
//     distanceInMeter: 0,
//     createdAt: "2023-01-08T09:21:00.001Z",
//     updatedAt: "2023-01-08T09:21:00.001Z",
// };

export enum EFuelStatus {
    RED = "0",
    GREEN = "1",
    YELLOW = "2",
}

export interface IVeichle {
    id: string;
    latitude: number;
    longitude: number;
    connected: number;
    name: string;
    carNumber: string;
    imei: string;
    ioTSimNumber: string;
    ioTBattery: string;
    speedLimit: number;
    fuel: number;
    totalKm: string;
    status: number;
    price: number;
    inTrip: number;
    imageName: string;
    image: string;
    distanceInMeter: number;
    fuelStatus: EFuelStatus;
    fuelIndicator: "Red" | "Green" | "Yellow";
    type: "scooter" | "park" | "cycle" | "car";
}

export type ICAR = "scooter" | "park" | "cycle" | "car";
