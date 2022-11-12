import { makeActionType } from "helpers";

//Statistic
export const GET_PATIENTS_AMOUNT = makeActionType("GET_PATIENTS_AMOUNT");
export const GET_AGES = makeActionType("GET_AGES");
export const GET_ETHNICITIES = makeActionType("GET_ETHNICITIES");

//Ethnicity list
export const GET_ETHNICITY = makeActionType("GET_ETHNICITY");

export const GET_PATIENTS = makeActionType("GET_PATIENTS");
export const CREATE_PATIENT = makeActionType("CREATE_PATIENT");
export const UPDATE_PATIENT = makeActionType("UPDATE_PATIENT");
export const REMOVE_PATIENT = makeActionType("REMOVE_PATIENT");
export const TOGGLE_STATUS_PATIENT = makeActionType("TOGGLE_STATUS_PATIENT");
export const GET_PATIENT_ROOM = makeActionType("GET_PATIENT_ROOM");
export const GET_PATIENT_ROOM_PHOTO = makeActionType("GET_PATIENT_ROOM_PHOTO");
export const GET_PATIENT_ROOM_MESSAGING = makeActionType("GET_PATIENT_ROOM_MESSAGING");
export const RESET_PATIENT_ROOM = "RESET_PATIENT_ROOM";
