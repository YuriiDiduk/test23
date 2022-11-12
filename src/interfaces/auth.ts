export interface ISigninResp {
  token: string;
  refreshToken: string;
}

export interface ISigninAction {
  email: string;
  password: string;
}

export interface IForgotPassAction {
  email: string;
  link: string;
}

export interface IResetPassAction {
  password: string;
  confirmPassword: string;
  resetToken: string;
}

export interface IValidateLink {
  resetToken: string;
}
