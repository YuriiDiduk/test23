import { createStaffAction, getStaffAction, removeStaffAction, updateStaffAction, uploadStaffPhotoAction } from "actions/staffActions";
import { ShowToastMessage } from "components/common/Toast";
import { CREATE_STAFF, GET_STAFF, REMOVE_STAFF, UPDATE_STAFF, UPLOAD_STAFF_PHOTO } from "const";
import { encodeDataToUrl, httpApi, HttpResp, makeAction } from "helpers";
import { IStaffCreate, IStaffUpdate } from "interfaces";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

function* getStaff({payload, params = {}}: ReturnType<typeof getStaffAction>) {
  const req = {
    ...payload,
  };

  const { redirect } = params;

  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/api/admin/staff?${encodeDataToUrl(req)}`,
      method: "GET",
    });

    if (res && !res.error) {
      redirect && redirect();
      yield put(makeAction(GET_STAFF.SUCCESS, res));
    } else {
      yield put(makeAction(GET_STAFF.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(GET_STAFF.FAILURE, error));
  }
}

function* createStaff({payload, params = {},}: ReturnType<typeof createStaffAction>) {

  const { redirect } = params;

  try {
    const res: HttpResp<IStaffCreate> = yield call(httpApi, {
      partUrl: "/api/admin/staff",
      method: "POST",
      formData: true,
      data: payload,
    });

    if (res && !res.error) {
      yield put(makeAction(CREATE_STAFF.SUCCESS));
      redirect && redirect();
    } else {
      ShowToastMessage({
        title: res.description,
      });
      yield put(makeAction(CREATE_STAFF.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(CREATE_STAFF.FAILURE, error));
  }
}

function* removeStaff({
  payload,
  params = {},
}: ReturnType<typeof removeStaffAction>) {
  const { redirect } = params;

  try {
    const res: HttpResp<IStaffCreate> = yield call(httpApi, {
      partUrl: `/api/admin/staff/${payload}`,
      method: "DELETE",
    });

    if (res && !res.error) {
      yield put(makeAction(REMOVE_STAFF.SUCCESS));
      redirect && redirect();
    } else {
      yield put(makeAction(REMOVE_STAFF.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(REMOVE_STAFF.FAILURE, error));
  }
}

function* updateStaff({
  payload,
  params = {},
}: ReturnType<typeof updateStaffAction>) {
  const { redirect } = params;
  const {data, id} = payload;

  try {
    const res: HttpResp<IStaffUpdate> = yield call(httpApi, {
      partUrl: `/api/admin/staff/${id}`,
      method: "PATCH",
      data,
    });

    if (res && !res.error) {
      yield put(makeAction(UPDATE_STAFF.SUCCESS));
      redirect && redirect();
    } else {
      yield put(makeAction(UPDATE_STAFF.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(UPDATE_STAFF.FAILURE, error));
  }
}

function* uploadStaffPhoto({
  payload,
  params = {},
}: ReturnType<typeof uploadStaffPhotoAction>) {
  const {data, id} = payload;
  const { redirect } = params;
  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/api/admin/staff/update-photo/${id}`,
      method: "POST",
      formData: true,
      data,
    });

    if (res && !res.error) {
      yield put(makeAction(UPLOAD_STAFF_PHOTO.SUCCESS, res));
      redirect && redirect();
    } else {
      yield put(makeAction(UPLOAD_STAFF_PHOTO.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(UPLOAD_STAFF_PHOTO.FAILURE, error));
  }
}

export function* staffWatcher() {
  yield takeLatest(GET_STAFF.PENDING, getStaff);
  yield takeEvery(CREATE_STAFF.PENDING, createStaff);
  yield takeLatest(REMOVE_STAFF.PENDING, removeStaff);
  yield takeLatest(UPDATE_STAFF.PENDING, updateStaff);
  yield takeLatest(UPLOAD_STAFF_PHOTO.PENDING, uploadStaffPhoto);
}
