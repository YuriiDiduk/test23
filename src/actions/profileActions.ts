import { CHANGE_PASSWORD, GET_PHOTO, GET_PROFILE, REMOVE_PHOTO, UPDATE_PROFILE, UPLOAD_PHOTO } from "const/actionTypes";
import { IActionFn } from "interfaces";
import { IChangePassword, IPhoto, IUpdateProfile } from "interfaces/profile";

export const getProfileAction: IActionFn<null> = (payload) => ({
  payload,
  type: GET_PROFILE.PENDING,
});

export const updateProfileAction: IActionFn<IUpdateProfile> = (payload, params) => ({
  payload,
  params,
  type: UPDATE_PROFILE.PENDING,
});

export const uploadPhotoAction: IActionFn<IPhoto> = (payload, params) => ({
  payload,
  params,
  type: UPLOAD_PHOTO.PENDING,
});

export const getPhotoAction: IActionFn<string> = (payload, params) => ({
  payload,
  params,
  type: GET_PHOTO.PENDING,
});

export const removePhotoAction: IActionFn<null> = (payload, params) => ({
  payload,
  params,
  type: REMOVE_PHOTO.PENDING,
});

export const changePasswordAction: IActionFn<IChangePassword> = (payload, params) => ({
  payload,
  params,
  type: CHANGE_PASSWORD.PENDING,
});


