export interface ITemperatur {
    condtion: string;
    currentDay: string;
    icon: string;
    temp: number;
}

export type ModalTypes = "error" | "success" | "info" | "warning" | "confirm";

export interface ICurrentModal {
    name: ModalTypes;
    props?: {
        title: string;
        message: string;
    };
}

export interface UIState {
    loading: boolean;
    startOrEndRide?: "start" | "end";
    temperatur?: ITemperatur;
    currentModal?: ICurrentModal | undefined;
    showCurrentModal?: boolean;
    sowVerifyModal?: boolean;
}
