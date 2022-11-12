import Immutable from "immutable";
import { handleActions } from "redux-actions";
import { GET_TABLE_PHOTO, RESET_TABLE_PHOTOS } from "const/actionTypes/tableTypes";
import { IPhotoList } from "interfaces/tablePhotos";

export interface ITablePhotosReducerState {
  photoList: IPhotoList[];
}

const initialState = Immutable.fromJS({
  photoList: [],
} as ITablePhotosReducerState);

const tablePhotoReducer = handleActions(
  {
    [GET_TABLE_PHOTO.SUCCESS]: (state: any, { payload }) => {
      const list = state.get("photoList");
      const newList = [...list, payload]
      return state.set("photoList", Immutable.fromJS(newList));
    },
    [RESET_TABLE_PHOTOS]: (state: any) => {
      return state.set("photoList", []);
    },
  },
  initialState
);

export default tablePhotoReducer;
