import { CREATE_STAFF, GET_STAFF, REMOVE_STAFF, UPDATE_STAFF, UPLOAD_STAFF_PHOTO } from "const";
import { IActionFn } from "interfaces";
import { QueryParams } from "interfaces";
import { IStaffCreate, IStaffPhotoUpdate, IStaffUpdate } from "interfaces";

export const getStaffAction: IActionFn<QueryParams | null> = (payload, params) => ({
  payload,
  params,
  type: GET_STAFF.PENDING,
});

export const createStaffAction: IActionFn<IStaffCreate> = (
  payload,
  params
) => ({
  payload,
  params,
  type: CREATE_STAFF.PENDING,
});

export const removeStaffAction: IActionFn<string> = (
  payload,
  params
) => ({
  payload,
  params,
  type: REMOVE_STAFF.PENDING,
});

export const updateStaffAction: IActionFn<IStaffUpdate> = (
  payload,
  params
) => ({
  payload,
  params,
  type: UPDATE_STAFF.PENDING,
});

export const uploadStaffPhotoAction: IActionFn<IStaffPhotoUpdate> = (
  payload,
  params
) => ({
  payload,
  params,
  type: UPLOAD_STAFF_PHOTO.PENDING,
});
