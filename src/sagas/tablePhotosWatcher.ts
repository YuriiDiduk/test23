import { getTablePhotoAction } from "actions/tablePhotosActions";
import { GET_TABLE_PHOTO } from "const/actionTypes/tableTypes";
import { HttpResp, httpApi, makeAction } from "helpers";
import { put, takeEvery, call } from "redux-saga/effects";

function* getTablePhoto({ payload }: ReturnType<typeof getTablePhotoAction>) {
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
      yield put(makeAction(GET_TABLE_PHOTO.SUCCESS, data));
    } else {
      yield put(makeAction(GET_TABLE_PHOTO.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(GET_TABLE_PHOTO.FAILURE, error));
  }
}

export function* tablePhotosWatcher() {
  yield takeEvery(GET_TABLE_PHOTO.PENDING, getTablePhoto);
}
