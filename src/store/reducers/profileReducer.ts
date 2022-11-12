import Immutable from "immutable";
import { handleActions } from "redux-actions";
import { makeCombinedAction } from "helpers";
import { GET_PROFILE, UPDATE_PROFILE, UPLOAD_PHOTO, GET_PHOTO, CHANGE_PASSWORD, REMOVE_PHOTO } from "const/actionTypes";
import { IProfile } from "interfaces/profile";

const { PENDING, DONE, FAILURE } = makeCombinedAction(
  GET_PROFILE,
  UPDATE_PROFILE,
  UPLOAD_PHOTO,
  GET_PHOTO,
  REMOVE_PHOTO,
  CHANGE_PASSWORD,
);

export interface IProfileReducerState {
  isLoading: boolean;
  profile: IProfile | null;
  file: string;
}

const initialState = Immutable.fromJS({
  isLoading: false,
  profile: {
    fullName: "",
    email: "",
    phone: "",
    roles: [],
    uuid: "",
    photo: {
      uuid: "",
    }
  },
  file: "",
} as IProfileReducerState);

const profileReducer = handleActions(
  {
    [PENDING]: (state: any) => {
      return state.set("isLoading", true);
    },
    [`${FAILURE}||${DONE}`]: (state: any) => {
      return state.set("isLoading", false);
    },
    [GET_PROFILE.SUCCESS]: (state: any, { payload }) => {
      return state.set("profile", Immutable.fromJS(payload));
    },
    [GET_PHOTO.SUCCESS]: (state: any, { payload }) => {
      return state.set("file", Immutable.fromJS(payload.data));
    },
    [REMOVE_PHOTO.SUCCESS]: (state: any) => {
      return state.set("file", Immutable.fromJS(""));
    },
  },
  initialState
);

export default profileReducer;
