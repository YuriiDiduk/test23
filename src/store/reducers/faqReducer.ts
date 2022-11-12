import Immutable from "immutable";
import { handleActions } from "redux-actions";
import { makeCombinedAction } from "helpers";
import {
  CREATE_FAQ,
  CREATE_REPORT,
  GET_FAQS,
  REMOVE_FAQ,
  UPDATE_FAQ
} from "const";
import { IFaq } from "interfaces";
import { RESET_TABLE } from "const/actionTypes/tableTypes";

const { PENDING, DONE } = makeCombinedAction(
  CREATE_FAQ,
  CREATE_REPORT,
  UPDATE_FAQ,
  REMOVE_FAQ
);

export interface IFaqReducerState {
  isLoading: boolean;
  faqList: IFaq[];
}

const initialState = Immutable.fromJS({
  isLoading: false,
  faqList: [],
} as IFaqReducerState);

const faqReducer = handleActions(
  {
    [PENDING]: (state: any) => {
      return state.set("isLoading", true);
    },
    [`${DONE}`]: (state: any) => {
      return state.set("isLoading", false);
    },
    [GET_FAQS.SUCCESS]: (state: any, { payload }) => {
      const list = Object.values(payload);
      return state.set("faqList", Immutable.fromJS(list));
    },
    [RESET_TABLE]: () => {
      return initialState;
    },
  },
  initialState
);

export default faqReducer;
