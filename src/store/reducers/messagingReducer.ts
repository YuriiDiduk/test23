import Immutable from "immutable";
import { handleActions } from "redux-actions";
import { makeCombinedAction } from "helpers";
import { IMessage, IMessageRoom } from "interfaces";
import { RESET_TABLE } from "const/actionTypes/tableTypes";
import {
  SEND_GENERAL_MESSAGE,
  GET_MESSAGES,
  GET_MESSAGE_ROOM,
  GET_PATIENT_PHOTO,
  REPLY_TO_MESSAGE,
  RESET_MESSAGE_ROOM,
  SEND_MESSAGE,
  GET_STAFF_PHOTO,
} from "const";
import lightFormat from "date-fns/lightFormat";
import { IPhotoList } from "interfaces/tablePhotos";

const { PENDING, DONE } = makeCombinedAction(
  SEND_GENERAL_MESSAGE,
  SEND_MESSAGE,
  REPLY_TO_MESSAGE
);

export interface IMessagesList {
  count: number;
  messages: IMessage[];
}

export interface IMessagingReducerState {
  isLoading: boolean;
  messagesList: IMessagesList;
  messageRoom: IMessageRoom[];
  photoInRoom: string;
  staffPhotosInRoom: IPhotoList[];
}

const initialState = Immutable.fromJS({
  isLoading: false,
  messagesList: {
    count: 0,
    messages: [],
  },
  messageRoom: [],
  photoInRoom: "",
  staffPhotosInRoom: [],
} as IMessagingReducerState);

const messagingReducer = handleActions(
  {
    [PENDING]: (state: any) => {
      return state.set("isLoading", true);
    },
    [`${DONE}`]: (state: any) => {
      return state.set("isLoading", false);
    },
    [GET_MESSAGES.SUCCESS]: (state: any, { payload }) => {
      const list = payload.messages.map((row: IMessage) => {
        return {
          ...row,
          photo: {
            uuid: row.avatar,
          },
          createdAt: lightFormat(new Date(row.createdAt), "MM/dd/yyyy h:mm a"),
        };
      });
      return state.set(
        "messagesList",
        Immutable.fromJS({
          count: payload.count,
          messages: list,
        })
      );
    },
    [GET_MESSAGE_ROOM.SUCCESS]: (state: any, { payload }) => {
      const arr: IMessageRoom[] = Object.values(payload);

      const list = arr.map((row: IMessageRoom) => {
        return {
          ...row,
          createdAt: lightFormat(new Date(row.createdAt), "MM/dd/yyyy h:mm a"),
        };
      });
      return state.set("messageRoom", Immutable.fromJS(list));
    },
    [GET_PATIENT_PHOTO.SUCCESS]: (state: any, { payload }) => {
      return state.set("photoInRoom", Immutable.fromJS(payload));
    },
    [GET_STAFF_PHOTO.SUCCESS]: (state: any, { payload }) => {
      const list = state.get("staffPhotosInRoom");
      const newList = [...list, payload];
      return state.set("staffPhotosInRoom", Immutable.fromJS(newList));
    },
    [RESET_MESSAGE_ROOM]: (state: any) => {
      return state
        .set("messageRoom", Immutable.fromJS([]))
        .set("staffPhotosInRoom", Immutable.fromJS([]));
    },
    [RESET_TABLE]: () => {
      return initialState;
    },
  },
  initialState
);

export default messagingReducer;
