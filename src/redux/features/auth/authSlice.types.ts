import { IUser } from "../../../types/interfaces";

export interface IAuthState {
    f_name: string | null;
    l_name: string | null;
    location_id: string | null;
    dialing_code: string | null;
    phone: string | null;
    email: string | null;
    wallet: number | null;
    card_status: "0" | "1" | null;
    photo: string | null;
    resident_status: "0" | "1" | "2" | null;
    userdocuments_status: "0" | "1" | null;
    token: string | null;
    checkOtherInformation?: boolean;
    currentForm?: number;
    qid?: string;
    dob?: string;
}
