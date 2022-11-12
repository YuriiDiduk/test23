import Immutable from "immutable";
import { handleActions } from "redux-actions";
import { INotification } from "interfaces";
import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_PHOTO } from "const";
import lightFormat from "date-fns/lightFormat";
import { IPhotoList } from "interfaces/tablePhotos";

export interface INotificationsList {
  count: number;
  messages: INotification[];
}

export interface INotificationsReducerState {
  isLoading: boolean;
  notificationsList: INotification[];
  photoList: IPhotoList[];
}

const initialState = Immutable.fromJS({
  isLoading: false,
  notificationsList: [],
  photoList: [],
} as INotificationsReducerState);

const notificationsReducer = handleActions(
  {
    [GET_NOTIFICATIONS.SUCCESS]: (state: any, { payload }) => {
      const arr: INotification[] = Object.values(payload);

      const list = arr.map((row: INotification) => {
        return {
          ...row,
          createdAt: lightFormat(new Date(row.createdAt), "MM/dd/yyyy h:mm a"),
        };
      });
      return state.set("notificationsList", Immutable.fromJS(list));
    },
    [GET_NOTIFICATIONS_PHOTO.SUCCESS]: (state: any, { payload }) => {
      const list = state.get("photoList");
      const newList = [...list, payload];
      return state.set("photoList", Immutable.fromJS(newList));
    },
  },
  initialState
);

export default notificationsReducer;
