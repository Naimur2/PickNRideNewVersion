export interface ICarDetails {
  id: number;
  connected: number;
  name: string;
  carNumber: string;
  imei: string;
  ioTSimNumber: string;
  ioTBattery: string;
  speedLimit: number;
  fuel: number;
  totalKm: number;
  latitude: number;
  longitude: number;
  status: number;
  price: number;
  inTrip: number;
  distanceInMeter: number;
}

export enum ECarType {
  SCOTTER = "scotter",
  CAR = "car",
  CYCLE = "cycle",
}

export type TCarType = "scotter" | "car" | "cycle";

export interface ISetSelectedVeichleTypeAction {
  type: string;
  payload: TCarType | null;
}

export interface ISetNearestCarsAction {
  type: string;
  payload: ICarDetails[];
}

export interface ICarState {
  nearestCars: ICarDetails[];
  selectedVeichleType: string | null;
  speed: number;
}
