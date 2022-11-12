import Immutable from "immutable";
import { handleActions } from "redux-actions";
import { makeCombinedAction, session } from "helpers";
import {
  SIGN_IN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  SIGN_OUT,
} from "const";

const { PENDING, DONE, } = makeCombinedAction(
  SIGN_IN,
  SIGN_OUT,
  FORGOT_PASSWORD,
  RESET_PASSWORD
);

export interface IAuthReducerState {
  isAuth: boolean;
  isLoading: boolean;
}

const initialState = Immutable.fromJS({
  isAuth: Boolean(session.getToken()),
  isLoading: false,
} as IAuthReducerState);

const authReducer = handleActions(
  {
    [PENDING]: (state: any) => {
      return state.set("isLoading", true);
    },
    [`${DONE}`]: (state: any) => {
      return state.set("isLoading", false);
    },
    [SIGN_IN.SUCCESS]: (state: any) => {
      return state.set("isAuth", true);
    },
    [SIGN_OUT.SUCCESS]: (state: any) => {
      return state.set("isAuth", false);
    },
  },
  initialState
);

export default authReducer;
