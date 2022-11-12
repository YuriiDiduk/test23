import {
  getMessageRoomAction,
  getMessagesAction,
  getPatientPhotoAction,
  getStaffPhotoAction,
  readMessageAction,
  replyToMessageAction,
  sendGeneralMessageAction,
  sendMessageAction,
} from "actions/messagingActions";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  encodeDataToForm,
  encodeDataToUrl,
  headerWithToken,
  httpApi,
  HttpResp,
  makeAction,
} from "helpers";
import {
  GET_MESSAGES,
  GET_MESSAGE_ROOM,
  GET_PATIENT_PHOTO,
  GET_STAFF_PHOTO,
  READ_MESSAGE,
  REPLY_TO_MESSAGE,
  SEND_GENERAL_MESSAGE,
  SEND_MESSAGE,
} from "const";
import { ShowToastMessage } from "components/common/Toast";

function* getMessages({
  payload,
  params = {},
}: ReturnType<typeof getMessagesAction>) {
  const req = {
    ...payload,
  };

  const { redirect } = params;

  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/api/admin/patient-messaging?${encodeDataToUrl(req)}`,
      method: "GET",
    });

    if (res && !res.error) {
      redirect && redirect();
      yield put(makeAction(GET_MESSAGES.SUCCESS, res));
    } else {
      yield put(makeAction(GET_MESSAGES.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(GET_MESSAGES.FAILURE, error));
  }
}

function* getMessageRoom({ payload }: ReturnType<typeof getMessageRoomAction>) {
  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/api/admin/patient-messaging/${payload}`,
      method: "GET",
    });

    if (res && !res.error) {
      yield put(makeAction(GET_MESSAGE_ROOM.SUCCESS, res));
    } else {
      yield put(makeAction(GET_MESSAGE_ROOM.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(GET_MESSAGE_ROOM.FAILURE, error));
  }
}

function* getPatientPhoto({
  payload,
}: ReturnType<typeof getPatientPhotoAction>) {
  try {
    const res: HttpResp<{ data: string }> = yield call(httpApi, {
      partUrl: `/api/base64/${payload}`,
      method: "GET",
    });

    if (res && !res.error) {
      yield put(makeAction(GET_PATIENT_PHOTO.SUCCESS, res.data));
    } else {
      yield put(makeAction(GET_PATIENT_PHOTO.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(GET_PATIENT_PHOTO.FAILURE, error));
  }
}

function* getStaffPhoto({ payload }: ReturnType<typeof getStaffPhotoAction>) {
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

      yield put(makeAction(GET_STAFF_PHOTO.SUCCESS, data));
    } else {
      yield put(makeAction(GET_STAFF_PHOTO.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(GET_STAFF_PHOTO.FAILURE, error));
  }
}

function* replyToMessage({
  payload,
  params = {},
}: ReturnType<typeof replyToMessageAction>) {
  const { redirect } = params;

  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/api/admin/patient-messaging`,
      method: "POST",
      formData: true,
      data: payload,
    });

    if (res && !res.error) {
      redirect && redirect();
      yield put(makeAction(REPLY_TO_MESSAGE.SUCCESS, res));
    } else {
      yield put(makeAction(REPLY_TO_MESSAGE.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(REPLY_TO_MESSAGE.FAILURE, error));
  }
}

function* sendMessage({
  payload,
  params = {},
}: ReturnType<typeof sendMessageAction>) {
  const { redirect } = params;

  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/api/admin/patient-messaging/single`,
      method: "POST",
      formData: true,
      data: payload,
    });

    if (res && !res.error) {
      redirect && redirect();
      yield put(makeAction(SEND_MESSAGE.SUCCESS, res));
    } else {
      yield put(makeAction(SEND_MESSAGE.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(SEND_MESSAGE.FAILURE, error));
  }
}

function* sendGeneralMessage({
  payload,
  params = {},
}: ReturnType<typeof sendGeneralMessageAction>) {
  const { redirect } = params;

  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/api/admin/patient-messaging/notifications`,
      method: "POST",
      formData: true,
      data: payload,
    });

    if (res && !res.error) {
      ShowToastMessage({
        title: "Notification sent successfully",
        isError: false,
      });
      redirect && redirect();
      yield put(makeAction(SEND_GENERAL_MESSAGE.SUCCESS, res));
    } else {
      yield put(makeAction(SEND_GENERAL_MESSAGE.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(SEND_GENERAL_MESSAGE.FAILURE, error));
  }
}

function* readMessage({
  payload,
  params = {},
}: ReturnType<typeof readMessageAction>) {
  const { redirect } = params;

  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/api/admin/patient-messaging/status`,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...headerWithToken(),
      },
      data: encodeDataToForm(payload),
    });

    if (res && !res.error) {
      redirect && redirect();
      yield put(makeAction(READ_MESSAGE.SUCCESS, res));
    } else {
      yield put(makeAction(READ_MESSAGE.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(READ_MESSAGE.FAILURE, error));
  }
}

export function* messagingWatcher() {
  yield takeLatest(GET_MESSAGES.PENDING, getMessages);
  yield takeLatest(GET_MESSAGE_ROOM.PENDING, getMessageRoom);
  yield takeLatest(GET_PATIENT_PHOTO.PENDING, getPatientPhoto);
  yield takeEvery(GET_STAFF_PHOTO.PENDING, getStaffPhoto);
  yield takeLatest(REPLY_TO_MESSAGE.PENDING, replyToMessage);
  yield takeLatest(SEND_MESSAGE.PENDING, sendMessage);
  yield takeLatest(SEND_GENERAL_MESSAGE.PENDING, sendGeneralMessage);
  yield takeEvery(READ_MESSAGE.PENDING, readMessage);
}
