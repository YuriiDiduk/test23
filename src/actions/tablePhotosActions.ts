import { GET_TABLE_PHOTO, RESET_TABLE_PHOTOS } from "const/actionTypes/tableTypes";
import { IActionFn } from "interfaces";

export const getTablePhotoAction: IActionFn<string> = (payload, params) => ({
  payload,
  params,
  type: GET_TABLE_PHOTO.PENDING,
});

export const resetTablePhotosAction: IActionFn<null> = (payload, params) => ({
  payload,
  params,
  type: RESET_TABLE_PHOTOS,
});
