import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "./authSlice.types";

const initialState: IAuthState = {
    f_name: null,
    l_name: null,
    location_id: null,
    dialing_code: null,
    phone: null,
    email: null,
    wallet: null,
    token: null,
    card_status: null,
    photo: null,
    resident_status: null,
    userdocuments_status: null,
    checkOtherInformation: false,
    currentForm: 0,
    qid: undefined,
    dob: undefined,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            console.log(action.payload);
            state.f_name = action.payload?.f_name;
            state.l_name = action.payload?.l_name;
            state.location_id = action.payload?.location_id;
            state.dialing_code = action.payload?.dialing_code;
            state.phone = action.payload?.phone;
            state.email = action.payload?.email;
            state.wallet = action.payload?.wallet;
            state.token = action.payload.token;
            state.card_status = action.payload?.card_status;
            state.photo =
                action.payload?.photo?.length > 0
                    ? action.payload?.photo
                    : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg";
            state.resident_status = action.payload?.resident_status;
            state.userdocuments_status = action.payload?.userdocuments_status;
            // state.checkOtherInformation = action.payload?.checkOtherInformation;
            state.currentForm = 1;
            state.qid = action.payload?.qid;
            state.dob = action.payload?.date_of_birth;
        },
        logout(state) {
            state.f_name = null;
            state.l_name = null;
            state.location_id = null;
            state.dialing_code = null;
            state.phone = null;
            state.email = null;
            state.wallet = null;
            state.token = null;
            state.card_status = null;
            state.photo = null;
            state.resident_status = null;
            state.userdocuments_status = null;
            // state.checkOtherInformation = false;
            state.currentForm = 1;
            state.qid = undefined;
            state.dob = undefined;
        },
        setCheckOtherInformation(state, action) {
            state.checkOtherInformation = action.payload;
        },
        setCurrentForm(state, action) {
            state.currentForm = action.payload;
        },
        updateProfileData(state, action) {
            state.f_name = action.payload?.f_name;
            state.l_name = action.payload?.l_name;
            state.photo = action.payload?.photo;
            state.phone = action.payload?.phone;
            state.email = action.payload?.email;
        },
    },
});

export const {
    login,
    logout,
    setCheckOtherInformation,
    setCurrentForm,
    updateProfileData,
} = authSlice.actions;

const authReducer = authSlice.reducer;
export const selectToken = (state: { auth: IAuthState }) => state.auth.token;
export const selectCheckOtherInformation = (state: { auth: IAuthState }) =>
    state.auth.checkOtherInformation;
export const selectCurrentForm = (state: { auth: IAuthState }) =>
    state.auth.currentForm;

export default authReducer;
