import Immutable from "immutable";
import { handleActions } from "redux-actions";
import { makeCombinedAction } from "helpers";
import {
  CREATE_STAFF,
  GET_STAFF,
  REMOVE_STAFF,
  UPDATE_STAFF,
  UPLOAD_STAFF_PHOTO,
} from "const";
import { IStaff } from "interfaces";
import { RESET_TABLE } from "const/actionTypes/tableTypes";

const { PENDING, DONE } = makeCombinedAction(
  CREATE_STAFF,
  UPDATE_STAFF,
  REMOVE_STAFF,
  UPLOAD_STAFF_PHOTO,
);

export interface IStaffList {
  count: number;
  staff: IStaff[];
}

export interface IStaffReducerState {
  isLoading: boolean;
  staffList: IStaffList;
}

const initialState = Immutable.fromJS({
  isLoading: false,
  staffList: {
    count: 0,
    staff: [],
  },
} as IStaffReducerState);

const staffReducer = handleActions(
  {
    [PENDING]: (state: any) => {
      return state.set("isLoading", true);
    },
    [`${DONE}`]: (state: any) => {
      return state.set("isLoading", false);
    },
    [GET_STAFF.SUCCESS]: (state: any, { payload }) => {
      return state.set("staffList", Immutable.fromJS(payload));
    },
    [RESET_TABLE]: () => {
      return initialState;
    },
  },
  initialState
);

export default staffReducer;
