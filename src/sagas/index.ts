import { all, fork } from "redux-saga/effects";
import { authWatcher } from "./authWatcher";
import { profileWatcher } from "./profileWatcher";
import { staffWatcher } from "./staffWatcher";
import { patientsWatcher } from "./patientsWatcher";
import { tablePhotosWatcher } from "./tablePhotosWatcher";
import { faqWatcher } from "./faqWatcher";
import { messagingWatcher } from "./messagingWatcher";
import { notificationsWatcher } from "./notificationsWatcher";

export function* rootSaga() {
  yield all([
    fork(authWatcher),
    fork(staffWatcher),
    fork(profileWatcher),
    fork(patientsWatcher),
    fork(tablePhotosWatcher),
    fork(faqWatcher),
    fork(messagingWatcher),
    fork(notificationsWatcher),
  ]);
}
