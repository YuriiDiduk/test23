import { changePasswordAction, getPhotoAction, getProfileAction, removePhotoAction, updateProfileAction, uploadPhotoAction } from "actions/profileActions";
import { ShowToastMessage } from "components/common/Toast";
import { CHANGE_PASSWORD, GET_PHOTO, GET_PROFILE, REMOVE_PHOTO, UPDATE_PROFILE, UPLOAD_PHOTO } from "const/actionTypes";
import { encodeDataToForm, headerWithToken, httpApi, HttpResp, makeAction } from "helpers";
import { IProfile } from "interfaces/profile";
import { call, put, takeLatest } from "redux-saga/effects";

function* getProfile({payload}: ReturnType<typeof getProfileAction>) {

  try {
    const res: HttpResp<IProfile> = yield call(httpApi, {
      partUrl: "/api/me",
      method: "GET",
    });

    if (res && !res.error) {
      yield put(makeAction(GET_PROFILE.SUCCESS, res));
      yield put(getPhotoAction(res.photo.uuid));
    } else {
      yield put(makeAction(GET_PROFILE.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(GET_PROFILE.FAILURE, error));
  }
}

function* updateProfile({ payload, params = {} }: ReturnType<typeof updateProfileAction>) {
  const { data, id } = payload;
  const { redirect } = params;
  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/api/admin/staff/${id}`,
      method: "PATCH",
      data,
    });

    if (res && !res.error) {
      yield put(makeAction(UPDATE_PROFILE.SUCCESS));
      redirect && redirect();
      yield put(getProfileAction(null));
    } else {
      yield put(makeAction(UPDATE_PROFILE.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(UPDATE_PROFILE.FAILURE, error));
  }
}

function* uploadPhoto({ payload, params = {} }: ReturnType<typeof uploadPhotoAction>) {
  const { redirect } = params;
  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: "/api/upload-photo",
      method: "POST",
      formData: true,
      data: payload,
    });

    if (res && !res.error) {
      yield put(makeAction(UPLOAD_PHOTO.SUCCESS, res));
      redirect && redirect();
      yield put(getProfileAction(null));
    } else {
      yield put(makeAction(UPLOAD_PHOTO.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(UPLOAD_PHOTO.FAILURE, error));
  }
}

function* removePhoto({
  payload,
  params = {},
}: ReturnType<typeof removePhotoAction>) {
  const { redirect } = params;
  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: "/api/upload-photo",
      method: "DELETE",
    });

    if (res && !res.error) {
      yield put(makeAction(REMOVE_PHOTO.SUCCESS));
      redirect && redirect();
      yield put(getProfileAction(null));
    } else {
      yield put(makeAction(REMOVE_PHOTO.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(REMOVE_PHOTO.FAILURE, error));
  }
}

function* getPhoto({ payload }: ReturnType<typeof getPhotoAction>) {
  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/api/base64/${payload}`,
      method: "GET",
    });

    if (res && !res.error) {
      yield put(makeAction(GET_PHOTO.SUCCESS, res));
    } else {
      yield put(makeAction(GET_PHOTO.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(GET_PHOTO.FAILURE, error));
  }
}

function* changePassword({
  payload, params = {},
}: ReturnType<typeof changePasswordAction>) {
  const { redirect } = params;
  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: "/api/change-password",
      method: "PATCH",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...headerWithToken(),
      },
      data: encodeDataToForm(payload),
    });

    if (res && !res.error) {
      yield put(makeAction(CHANGE_PASSWORD.SUCCESS));
      redirect && redirect();
    } else {
      ShowToastMessage({
        title: res.description,
      });
      yield put(makeAction(CHANGE_PASSWORD.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(CHANGE_PASSWORD.FAILURE, error));
  }
}

export function* profileWatcher() {
  yield takeLatest(GET_PROFILE.PENDING, getProfile);
  yield takeLatest(UPDATE_PROFILE.PENDING, updateProfile);
  yield takeLatest(UPLOAD_PHOTO.PENDING, uploadPhoto);
  yield takeLatest(GET_PHOTO.PENDING, getPhoto);
  yield takeLatest(REMOVE_PHOTO.PENDING, removePhoto);
  yield takeLatest(CHANGE_PASSWORD.PENDING, changePassword);
}
