import { makeActionType } from "helpers";

export const GET_MESSAGES = makeActionType("GET_MESSAGES");
export const GET_MESSAGE_ROOM = makeActionType("GET_MESSAGE_ROOM");
export const RESET_MESSAGE_ROOM = "RESET_MESSAGE_ROOM";
export const READ_MESSAGE = makeActionType("READ_MESSAGE");
export const GET_PATIENT_PHOTO = makeActionType("GET_PATIENT_PHOTO");
export const GET_STAFF_PHOTO = makeActionType("GET_STAFF_PHOTO");
export const SEND_MESSAGE = makeActionType("SEND_MESSAGE");
export const REPLY_TO_MESSAGE = makeActionType("REPLY_TO_MESSAGE");
export const SEND_GENERAL_MESSAGE = makeActionType("SEND_GENERAL_MESSAGE");
