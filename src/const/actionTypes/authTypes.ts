import { makeActionType } from "helpers";

// AUTH
export const SIGN_IN = makeActionType("SIGN_IN");
export const SIGN_OUT = makeActionType("SIGN_OUT");
export const FORGOT_PASSWORD = makeActionType("FORGOT_PASSWORD");
export const RESET_PASSWORD = makeActionType("RESET_PASSWORD");
export const VALIDATE_LINK = makeActionType("VALIDATE_LINK");
