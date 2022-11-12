import {
  GET_MESSAGES,
  GET_MESSAGE_ROOM,
  GET_PATIENT_PHOTO,
  REPLY_TO_MESSAGE,
  READ_MESSAGE,
  SEND_MESSAGE,
  SEND_GENERAL_MESSAGE,
  GET_STAFF_PHOTO,
} from "const/actionTypes";
import {
  IActionFn,
  IReplyMessage,
  ISendGeneralMessage,
  ISendMessage,
} from "interfaces";
import { QueryParams } from "interfaces";

export const getMessagesAction: IActionFn<QueryParams | null> = (
  payload,
  params
) => ({
  payload,
  params,
  type: GET_MESSAGES.PENDING,
});

export const getMessageRoomAction: IActionFn<string> = (payload, params) => ({
  payload,
  params,
  type: GET_MESSAGE_ROOM.PENDING,
});

export const getPatientPhotoAction: IActionFn<string> = (payload, params) => ({
  payload,
  params,
  type: GET_PATIENT_PHOTO.PENDING,
});

export const getStaffPhotoAction: IActionFn<string> = (payload, params) => ({
  payload,
  params,
  type: GET_STAFF_PHOTO.PENDING,
});

export const readMessageAction: IActionFn<{ room_id: string }> = (
  payload,
  params
) => ({
  payload,
  params,
  type: READ_MESSAGE.PENDING,
});

export const replyToMessageAction: IActionFn<IReplyMessage> = (
  payload,
  params
) => ({
  payload,
  params,
  type: REPLY_TO_MESSAGE.PENDING,
});

export const sendMessageAction: IActionFn<ISendMessage> = (
  payload,
  params
) => ({
  payload,
  params,
  type: SEND_MESSAGE.PENDING,
});

export const sendGeneralMessageAction: IActionFn<ISendGeneralMessage> = (
  payload,
  params
) => ({
  payload,
  params,
  type: SEND_GENERAL_MESSAGE.PENDING,
});
