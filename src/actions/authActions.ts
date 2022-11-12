import {
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  SIGN_IN,
  SIGN_OUT,
  VALIDATE_LINK,
} from "const";
import {
  IActionFn,
  IForgotPassAction,
  IResetPassAction,
  ISigninAction,
  IValidateLink,
} from "interfaces";

export const signinAction: IActionFn<ISigninAction> = (payload, params) => ({
  payload,
  params,
  type: SIGN_IN.PENDING,
});

export const signoutAction: IActionFn<null> = (payload) => ({
  payload,
  type: SIGN_OUT.PENDING,
});

export const forgotPassAction: IActionFn<IForgotPassAction> = (
  payload,
  params
) => ({
  payload,
  params,
  type: FORGOT_PASSWORD.PENDING,
});

export const resetPassAction: IActionFn<IResetPassAction> = (
  payload,
  params
) => ({
  payload,
  params,
  type: RESET_PASSWORD.PENDING,
});

export const validateLinkAction: IActionFn<IValidateLink> = (
  payload,
  params
) => ({
  payload,
  params,
  type: VALIDATE_LINK.PENDING,
});
