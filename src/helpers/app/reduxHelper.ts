import { IAction, IActionType, ICombinedActionsTypes } from "interfaces/app/actions";
import { IAppReducer } from "store/reducers";

export const makeActionType = (type: string): IActionType => ({
  PENDING: type,
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`,
  DONE: `${type}_SUCCESS||${type}_FAILURE`,
});

export const makeAction = (type: string, payload?: any): IAction => ({
  type,
  payload,
});

export const makeCombinedAction = (
  actionType: IActionType,
  ...rest: IActionType[]
): ICombinedActionsTypes => {
  const combined: ICombinedActionsTypes = { ...actionType };
  rest.forEach(({ PENDING, SUCCESS, FAILURE, DONE }) => {
    combined.PENDING += `||${PENDING}`;
    combined.SUCCESS += `||${SUCCESS}`;
    combined.FAILURE += `||${FAILURE}`;
    combined.DONE += `||${DONE}`;
  });
  return combined;
};

type ReducerKeys = keyof IAppReducer;
type Keys = ReducerKeys[] | string[];

export const makeSelector = (getInKeys: Keys, ...rest: string[][]) =>(
  state: any
) => {
  const getData = (keys: string[]) => {
    const data = state.getIn(keys);
    return data && data.toJS ? data.toJS() : data;
  };

  if (rest && rest.length) {
    const result = {
      [getInKeys[getInKeys.length - 1]]: getData(getInKeys),
    };
    rest.forEach((keys) => (result[keys[keys.length - 1]] = getData(keys)));
    return result;
  }
  return getData(getInKeys);
};
