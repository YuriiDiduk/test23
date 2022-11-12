import {
  createFaqAction,
  createReportAction,
  getFaqsAction,
  removeFaqAction,
  updateFaqAction,
} from "actions/faqActions";
import { ShowToastMessage } from "components/common/Toast";
import {
  CREATE_FAQ,
  CREATE_REPORT,
  GET_FAQS,
  REMOVE_FAQ,
  UPDATE_FAQ,
} from "const";
import { encodeDataToForm, encodeDataToUrl, headerWithToken, httpApi, HttpResp, makeAction } from "helpers";
import { IFaqCreate, IFaqUpdate, IReportCreate } from "interfaces";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

function* getFaqs({
  payload,
  params = {},
}: ReturnType<typeof getFaqsAction>) {
  const req = {
    ...payload,
  };

  const { redirect } = params;

  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/api/faqs?${encodeDataToUrl(req)}`,
      method: "GET",
    });

    if (res && !res.error) {
      yield put(makeAction(GET_FAQS.SUCCESS, res));
      redirect && redirect();
    } else {
      yield put(makeAction(GET_FAQS.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(GET_FAQS.FAILURE, error));
  }
}

function* createFaq({
  payload,
  params = {},
}: ReturnType<typeof createFaqAction>) {
  const { redirect } = params;

  try {
    const res: HttpResp<IFaqCreate> = yield call(httpApi, {
      partUrl: "/api/admin/faqs",
      method: "POST",
      formData: true,
      data: payload,
    });

    if (res && !res.error) {
      yield put(makeAction(CREATE_FAQ.SUCCESS));
      redirect && redirect();
    } else {
      yield put(makeAction(CREATE_FAQ.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(CREATE_FAQ.FAILURE, error));
  }
}

function* removeFaq({
  payload,
  params = {},
}: ReturnType<typeof removeFaqAction>) {
  const { redirect } = params;

  try {
    const res: HttpResp<IFaqCreate> = yield call(httpApi, {
      partUrl: `/api/admin/faqs/${payload}`,
      method: "DELETE",
    });

    if (res && !res.error) {
      yield put(makeAction(REMOVE_FAQ.SUCCESS));
      redirect && redirect();
    } else {
      yield put(makeAction(REMOVE_FAQ.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(REMOVE_FAQ.FAILURE, error));
  }
}

function* updateFaq({
  payload,
  params = {},
}: ReturnType<typeof updateFaqAction>) {
  const { redirect } = params;
  const { data, id } = payload;

  try {
    const res: HttpResp<IFaqUpdate> = yield call(httpApi, {
      partUrl: `/api/admin/faqs/${id}`,
      method: "PATCH",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...headerWithToken(),
      },
      data: encodeDataToForm(data),
    });

    if (res && !res.error) {
      redirect && redirect();
      yield put(makeAction(UPDATE_FAQ.SUCCESS));
    } else {
      yield put(makeAction(UPDATE_FAQ.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(UPDATE_FAQ.FAILURE, error));
  }
}

function* createReport({
  payload,
  params = {},
}: ReturnType<typeof createReportAction>) {
  const { redirect } = params;

  try {
    const res: HttpResp<IReportCreate> = yield call(httpApi, {
      partUrl: "/api/admin/report-problem",
      method: "POST",
      formData: true,
      data: payload,
    });

    if (res && !res.error) {
      yield put(makeAction(CREATE_REPORT.SUCCESS));
      redirect && redirect();
      ShowToastMessage({
        title: "Your report was sent successfully",
        isError: false,
      });
    } else {
      yield put(makeAction(CREATE_REPORT.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(CREATE_REPORT.FAILURE, error));
  }
}

export function* faqWatcher() {
  yield takeLatest(GET_FAQS.PENDING, getFaqs);
  yield takeEvery(CREATE_FAQ.PENDING, createFaq);
  yield takeLatest(REMOVE_FAQ.PENDING, removeFaq);
  yield takeLatest(UPDATE_FAQ.PENDING, updateFaq);
  yield takeEvery(CREATE_REPORT.PENDING, createReport);
}
