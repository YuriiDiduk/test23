import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_PHOTO, SEND_TOKEN } from "const";
import { IActionFn, QueryParams } from "interfaces";

export const getNotificationsAction: IActionFn<QueryParams | null> = (
  payload,
  params
) => ({
  payload,
  params,
  type: GET_NOTIFICATIONS.PENDING,
});

export const getNotificationsPhotoAction: IActionFn<string> = (
  payload,
  params
) => ({
  payload,
  params,
  type: GET_NOTIFICATIONS_PHOTO.PENDING,
});

export const sendTokenAction: IActionFn<string> = (payload, params) => ({
  payload,
  params,
  type: SEND_TOKEN.PENDING,
});
