import { SIGN_OUT } from "const";
import { combineReducers } from "redux-immutable";
import authReducer, { IAuthReducerState } from "./authReducer";
import faqReducer, { IFaqReducerState } from "./faqReducer";
import messagingReducer, { IMessagingReducerState } from "./messagingReducer";
import notificationsReducer, {
  INotificationsReducerState,
} from "./notificationsReducer";
import patientsReducer, { IPatientsReducerState } from "./patientsReducer";
import profileReducer, { IProfileReducerState } from "./profileReducer";
import staffReducer, { IStaffReducerState } from "./staffReducer";
import tablePhotoReducer, {
  ITablePhotosReducerState,
} from "./tablePhotosReducer";

export interface IAppReducer {
  authReducer: IAuthReducerState;
  staffReducer: IStaffReducerState;
  profileReducer: IProfileReducerState;
  patientsReducer: IPatientsReducerState;
  tablePhotoReducer: ITablePhotosReducerState;
  faqReducer: IFaqReducerState;
  messagingReducer: IMessagingReducerState;
  notificationsReducer: INotificationsReducerState;
}

const appReducer = combineReducers<IAppReducer>({
  authReducer,
  staffReducer,
  profileReducer,
  patientsReducer,
  tablePhotoReducer,
  faqReducer,
  messagingReducer,
  notificationsReducer,
});

export const rootReducer = (state: any, action: any) => {
  if (action.type === SIGN_OUT.SUCCESS) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
