import {
  getNotificationsAction,
  getNotificationsPhotoAction,
  sendTokenAction,
} from "actions/notificationsActions";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { encodeDataToUrl, httpApi, HttpResp, makeAction } from "helpers";
import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_PHOTO, SEND_TOKEN } from "const";

function* sendToken({ payload }: ReturnType<typeof sendTokenAction>) {
  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/api/devices`,
      method: "POST",
      formData: true,
      data: {
        firebase_token: payload,
        notifications: true,
      },
    });

    if (res && !res.error) {
      yield put(makeAction(SEND_TOKEN.SUCCESS, res));
    } else {
      yield put(makeAction(SEND_TOKEN.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(SEND_TOKEN.FAILURE, error));
  }
}

function* getNotifications({
  payload,
  params = {},
}: ReturnType<typeof getNotificationsAction>) {
  const req = {
    ...payload,
  };

  const { redirect } = params;

  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/api/admin/patient-messages/unread?${encodeDataToUrl(req)}`,
      method: "GET",
    });

    if (res && !res.error) {
      redirect && redirect();
      yield put(makeAction(GET_NOTIFICATIONS.SUCCESS, res));
    } else {
      yield put(makeAction(GET_NOTIFICATIONS.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(GET_NOTIFICATIONS.FAILURE, error));
  }
}

function* getNotificationsPhoto({
  payload,
}: ReturnType<typeof getNotificationsPhotoAction>) {
  try {
    const res: HttpResp<{ data: string }> = yield call(httpApi, {
      partUrl: `/api/base64/${payload}`,
      method: "GET",
    });

    if (res && !res.error) {
      const data = {
        id: payload,
        photo: res.data,
      };
      yield put(makeAction(GET_NOTIFICATIONS_PHOTO.SUCCESS, data));
    } else {
      yield put(makeAction(GET_NOTIFICATIONS_PHOTO.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(GET_NOTIFICATIONS_PHOTO.FAILURE, error));
  }
}

export function* notificationsWatcher() {
  yield takeLatest(SEND_TOKEN.PENDING, sendToken);
  yield takeLatest(GET_NOTIFICATIONS.PENDING, getNotifications);
  yield takeEvery(GET_NOTIFICATIONS_PHOTO.PENDING, getNotificationsPhoto);
}
