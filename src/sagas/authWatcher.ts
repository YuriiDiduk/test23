import {
  HttpResp,
  httpApi,
  makeAction,
  session,
  encodeDataToUrl,
  headerWithToken,
  encodeDataToForm,
} from "helpers";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  forgotPassAction,
  resetPassAction,
  signinAction,
  signoutAction,
  validateLinkAction,
} from "actions/authActions";
import { ISigninResp } from "interfaces";
import {
  FORGOT_PASSWORD,
  REMOVE_PHOTO,
  RESET_PASSWORD,
  SIGN_IN,
  SIGN_OUT,
  VALIDATE_LINK,
} from "const";
import { ShowToastMessage } from "components/common/Toast";

const refreshToken = (): { payload: string } => ({ payload: "" });

export function* refreshTokenSaga({
  payload,
}: ReturnType<typeof refreshToken>): any {
  try {
    const resp: HttpResp<ISigninResp> = yield call(httpApi, {
      method: "POST",
      partUrl: "/api/refresh-token",
      data: encodeDataToUrl({
        grant_type: "refreshToken",
        refreshToken: payload,
      }),
    });
    if (resp && !resp.error) {
      session.saveData(resp);
    }
  } catch (error) {
    console.log(error);
  }
}

function* signin({ payload }: ReturnType<typeof signinAction>) {
  try {
    const res: HttpResp<ISigninResp> = yield call(httpApi, {
      isAuthorized: false,
      method: "POST",
      partUrl: "/admin/login",
      data: payload,
    });

    if (res && !res.error) {
      yield put(makeAction(SIGN_IN.SUCCESS, res));
      session.saveData(res);
    } else {
      ShowToastMessage({
        title: res.description,
      });
      yield put(makeAction(SIGN_IN.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(SIGN_IN.FAILURE, error));
  }
}

function* signOut({ payload }: ReturnType<typeof signoutAction>) {
  yield put(makeAction(SIGN_OUT.SUCCESS));
  yield put(makeAction(REMOVE_PHOTO.SUCCESS));
  const fbToken = session.getFirebaseToken();

  if (!session.isExpired() && fbToken) {
    try {
      yield call(httpApi, {
        isAuthorized: false,
        method: "DELETE",
        partUrl: "/api/devices",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          ...headerWithToken(),
        },
        data: encodeDataToForm({ firebase_token: fbToken }),
      });
    } catch (error) {
      yield put(makeAction(SIGN_OUT.FAILURE, error));
    }
  }
  session.removeFirebaseToken();
  session.clearData();
}

function* forgotPass({ payload }: ReturnType<typeof forgotPassAction>) {
  try {
    const res: HttpResp<ISigninResp> = yield call(httpApi, {
      isAuthorized: false,
      method: "POST",
      partUrl: "/api/forgot-password",
      formData: true,
      data: payload,
    });

    if (res && !res.error) {
      yield put(makeAction(FORGOT_PASSWORD.SUCCESS, res));
      ShowToastMessage({
        title: "Check your email",
        isError: false,
      });
    } else {
      ShowToastMessage({
        title: res.description,
      });
      yield put(makeAction(FORGOT_PASSWORD.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(FORGOT_PASSWORD.FAILURE, error));
  }
}

function* resetPass({
  payload,
  params = {},
}: ReturnType<typeof resetPassAction>) {
  const { redirect } = params;

  try {
    const res: HttpResp<ISigninResp> = yield call(httpApi, {
      isAuthorized: false,
      method: "POST",
      partUrl: "/api/reset-password",
      formData: true,
      data: payload,
    });

    if (res && !res.error) {
      yield put(makeAction(RESET_PASSWORD.SUCCESS, res));
      redirect && redirect();
    } else {
      ShowToastMessage({
        title: res.description,
      });
      yield put(makeAction(RESET_PASSWORD.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(RESET_PASSWORD.FAILURE, error));
  }
}

function* validateLink({
  payload,
  params = {},
}: ReturnType<typeof validateLinkAction>) {
  const { redirect } = params;

  try {
    const res: HttpResp<ISigninResp> = yield call(httpApi, {
      isAuthorized: false,
      method: "POST",
      partUrl: "/api/reset-password/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...headerWithToken(),
      },
      data: encodeDataToForm(payload),
    });

    if (res && !res.error) {
      yield put(makeAction(VALIDATE_LINK.SUCCESS, res));
      redirect && redirect(true);
    } else {
      ShowToastMessage({
        title: res.description,
      });
      redirect && redirect(false);
      yield put(makeAction(VALIDATE_LINK.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(VALIDATE_LINK.FAILURE, error));
  }
}

export function* authWatcher() {
  yield takeLatest(SIGN_IN.PENDING, signin);
  yield takeLatest(SIGN_OUT.PENDING, signOut);
  yield takeLatest(FORGOT_PASSWORD.PENDING, forgotPass);
  yield takeLatest(RESET_PASSWORD.PENDING, resetPass);
  yield takeLatest(VALIDATE_LINK.PENDING, validateLink);
}
