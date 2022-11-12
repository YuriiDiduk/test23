import { createPatientAction, getAgesAction, getEthnicitiesAction, getEthnicityAction, getPatientRoomAction, getPatientRoomMessagingAction, getPatientRoomPhotoAction, getPatientsAction, getPatientsAmountAction, removePatientAction, toggleStatusPatientAction, updatePatientAction } from "actions/patientsActions";
import { ShowToastMessage } from "components/common/Toast";
import { CREATE_PATIENT, GET_AGES, GET_ETHNICITIES, GET_ETHNICITY, GET_PATIENTS, GET_PATIENTS_AMOUNT, GET_PATIENT_ROOM, GET_PATIENT_ROOM_MESSAGING, GET_PATIENT_ROOM_PHOTO, REMOVE_PATIENT, TOGGLE_STATUS_PATIENT, UPDATE_PATIENT } from "const";
import { encodeDataToForm, encodeDataToUrl, headerWithToken, httpApi, HttpResp, makeAction } from "helpers";
import { IPatientStatusUpdate, IEthnicityResponse, IPatientCreate, IPatientUpdate } from "interfaces";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

function* getPatientsAmount({
  payload,
}: ReturnType<typeof getPatientsAmountAction>) {
  try {
    const res: HttpResp<{data: number}> = yield call(httpApi, {
      partUrl: `/api/admin/users/count`,
      method: "GET",
    });

    if (res && !res.error) {
      yield put(makeAction(GET_PATIENTS_AMOUNT.SUCCESS, res.data));
    } else {
      yield put(makeAction(GET_PATIENTS_AMOUNT.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(GET_PATIENTS_AMOUNT.FAILURE, error));
  }
}

function* getAges({payload}: ReturnType<typeof getAgesAction>) {
  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/api/admin/ages`,
      method: "GET",
    });

    if (res && !res.error) {
      yield put(makeAction(GET_AGES.SUCCESS, res));
    } else {
      yield put(makeAction(GET_AGES.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(GET_AGES.FAILURE, error));
  }
}

function* getEthnicities({ payload }: ReturnType<typeof getEthnicitiesAction>) {
  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/api/admin/ethnicities`,
      method: "GET",
    });

    if (res && !res.error) {
      yield put(makeAction(GET_ETHNICITIES.SUCCESS, res));
    } else {
      yield put(makeAction(GET_ETHNICITIES.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(GET_ETHNICITIES.FAILURE, error));
  }
}

function* getEthnicity({ payload }: ReturnType<typeof getEthnicityAction>) {
  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/api/ethnicities`,
      method: "GET",
    });

    if (res && !res.error) {
      const ethnicityArray = Object.values(res);
      const groupsList = new Set(
        ethnicityArray.map((item: IEthnicityResponse) => {
          return item.group;
        })
      );
      yield put(makeAction(GET_ETHNICITY.SUCCESS, groupsList));
    } else {
      yield put(makeAction(GET_ETHNICITY.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(GET_ETHNICITY.FAILURE, error));
  }
}

function* getPatients({
  payload,
  params = {},
}: ReturnType<typeof getPatientsAction>) {
  const req = {
    ...payload,
  };

  const { redirect } = params;

  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/api/admin/users?${encodeDataToUrl(req)}`,
      method: "GET",
    });

    if (res && !res.error) {
      redirect && redirect();
      yield put(makeAction(GET_PATIENTS.SUCCESS, res));
      
    } else {
      yield put(makeAction(GET_PATIENTS.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(GET_PATIENTS.FAILURE, error));
  }
}

function* createPatient({
  payload,
  params = {},
}: ReturnType<typeof createPatientAction>) {
  const { redirect } = params;

  try {
    const res: HttpResp<IPatientCreate> = yield call(httpApi, {
      partUrl: "/api/admin/users",
      method: "POST",
      formData: true,
      data: payload,
    });

    if (res && !res.error) {
      yield put(makeAction(CREATE_PATIENT.SUCCESS));
      redirect && redirect();
    } else {
      ShowToastMessage({
        title: res.description,
      });
      yield put(makeAction(CREATE_PATIENT.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(CREATE_PATIENT.FAILURE, error));
  }
}

function* removePatient({
  payload,
  params = {},
}: ReturnType<typeof removePatientAction>) {
  const { redirect } = params;

  try {
    const res: HttpResp<IPatientCreate> = yield call(httpApi, {
      partUrl: `/api/admin/users/${payload}`,
      method: "DELETE",
    });

    if (res && !res.error) {
      yield put(makeAction(REMOVE_PATIENT.SUCCESS));
      redirect && redirect();
    } else {
      yield put(makeAction(REMOVE_PATIENT.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(REMOVE_PATIENT.FAILURE, error));
  }
}

function* updatePatient({
  payload,
  params = {},
}: ReturnType<typeof updatePatientAction>) {
  const { redirect } = params;
  const { data, id } = payload;

  try {
    const res: HttpResp<IPatientUpdate> = yield call(httpApi, {
      partUrl: `/api/users/${id}`,
      method: "PATCH",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...headerWithToken(),
      },
      data: encodeDataToForm(data),
    });

    if (res && !res.error) {
      yield put(makeAction(UPDATE_PATIENT.SUCCESS));
      redirect && redirect();
    } else {
      ShowToastMessage({
        title: res.description,
      });
      yield put(makeAction(UPDATE_PATIENT.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(UPDATE_PATIENT.FAILURE, error));
  }
}

function* getPatientRoom({ payload }: ReturnType<typeof getPatientRoomAction>) {
  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/api/users/${payload}`,
      method: "GET",
    });

    if (res && !res.error) {
      yield put(makeAction(GET_PATIENT_ROOM.SUCCESS, res));
    } else {
      yield put(makeAction(GET_PATIENT_ROOM.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(GET_PATIENT_ROOM.FAILURE, error));
  }
}

function* getPatientRoomMessaging({
  payload,
}: ReturnType<typeof getPatientRoomMessagingAction>) {
  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/api/admin/users/${payload}/room`,
      method: "GET",
    });

    if (res && !res.error) {
      yield put(makeAction(GET_PATIENT_ROOM_MESSAGING.SUCCESS, res));
    } else {
      yield put(makeAction(GET_PATIENT_ROOM_MESSAGING.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(GET_PATIENT_ROOM_MESSAGING.FAILURE, error));
  }
}

function* getPatientRoomPhoto({ payload }: ReturnType<typeof getPatientRoomPhotoAction>) {
  try {
    const res: HttpResp<{ data: string }> = yield call(httpApi, {
      partUrl: `/api/base64/${payload}`,
      method: "GET",
    });

    if (res && !res.error) {
      yield put(makeAction(GET_PATIENT_ROOM_PHOTO.SUCCESS, res.data));
    } else {
      yield put(makeAction(GET_PATIENT_ROOM_PHOTO.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(GET_PATIENT_ROOM_PHOTO.FAILURE, error));
  }
}

function* toggleStatusPatient({
  payload,
  params = {},
}: ReturnType<typeof toggleStatusPatientAction>) {
  const { redirect } = params;
  const { isActive, id } = payload;

  try {
    const res: HttpResp<IPatientStatusUpdate> = yield call(httpApi, {
      partUrl: `/api/admin/users/status/${id}`,
      method: "POST",
      formData: true,
      data: { isActive },
    });

    if (res && !res.error) {
      yield put(makeAction(TOGGLE_STATUS_PATIENT.SUCCESS));
      redirect && redirect();
    } else {
      ShowToastMessage({
        title: res.description,
      });
      yield put(makeAction(TOGGLE_STATUS_PATIENT.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(TOGGLE_STATUS_PATIENT.FAILURE, error));
  }
}

export function* patientsWatcher() {
  yield takeLatest(GET_PATIENTS_AMOUNT.PENDING, getPatientsAmount);
  yield takeLatest(GET_AGES.PENDING, getAges);
  yield takeLatest(GET_ETHNICITIES.PENDING, getEthnicities);
  yield takeLatest(GET_ETHNICITY.PENDING, getEthnicity);
  yield takeEvery(GET_PATIENTS.PENDING, getPatients);
  yield takeEvery(CREATE_PATIENT.PENDING, createPatient);
  yield takeLatest(REMOVE_PATIENT.PENDING, removePatient);
  yield takeLatest(UPDATE_PATIENT.PENDING, updatePatient);
  yield takeLatest(GET_PATIENT_ROOM.PENDING, getPatientRoom);
  yield takeLatest(GET_PATIENT_ROOM_PHOTO.PENDING, getPatientRoomPhoto);
  yield takeLatest(GET_PATIENT_ROOM_MESSAGING.PENDING, getPatientRoomMessaging);
  yield takeEvery(TOGGLE_STATUS_PATIENT.PENDING, toggleStatusPatient);
}
