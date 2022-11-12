import Immutable from "immutable";
import { handleActions } from "redux-actions";
import { makeCombinedAction } from "helpers";
import { CREATE_PATIENT, GET_PATIENTS, GET_AGES, REMOVE_PATIENT, UPDATE_PATIENT, GET_ETHNICITY, GET_ETHNICITIES, GET_PATIENTS_AMOUNT, GET_PATIENT_ROOM, RESET_PATIENT_ROOM, TOGGLE_STATUS_PATIENT, GET_PATIENT_ROOM_PHOTO, GET_PATIENT_ROOM_MESSAGING } from "const";
import { Ages, IAgesResponse, IPatients } from "interfaces";
import { RESET_TABLE } from "const/actionTypes/tableTypes";

const { PENDING, DONE } = makeCombinedAction(
  GET_PATIENTS_AMOUNT,
  GET_AGES,
  GET_ETHNICITIES,
  GET_PATIENTS,
  CREATE_PATIENT,
  UPDATE_PATIENT,
  REMOVE_PATIENT,
  TOGGLE_STATUS_PATIENT,
);

export interface IPatientsList {
  count: number;
  result: IPatients[];
}

export interface IPatientsReducerState {
  isLoading: boolean;
  ethnicityGroups: string[];
  patientsAmount: number;
  ages: IAgesResponse;
  ethnicities: {};
  patientsList: IPatientsList;
  patientRoom: {};
  photoInRoom: string;
  messagingInfoInRoom: {};
}

const initialState = Immutable.fromJS({
  isLoading: false,
  ethnicityGroups: [],
  patientsAmount: 0,
  ages: {
    [Ages.ages40_50]: 0,
    [Ages.ages51_60]: 0,
    [Ages.ages61_70]: 0,
    [Ages.ages71_]: 0,
  },
  ethnicities: {},
  patientsList: {
    count: 0,
    result: [],
  },
  patientRoom: {},
  photoInRoom: "",
  messagingInfoInRoom: {},
} as IPatientsReducerState);

const patientsReducer = handleActions(
  {
    [PENDING]: (state: any) => {
      return state.set("isLoading", true);
    },
    [`${DONE}`]: (state: any) => {
      return state.set("isLoading", false);
    },
    [GET_PATIENTS.SUCCESS]: (state: any, { payload }) => {
      return state.set("patientsList", Immutable.fromJS(payload));
    },
    [GET_PATIENTS_AMOUNT.SUCCESS]: (state: any, { payload }) => {
      return state.set("patientsAmount", Immutable.fromJS(payload));
    },
    [GET_AGES.SUCCESS]: (state: any, { payload }) => {
      return state.set("ages", Immutable.fromJS(payload));
    },
    [GET_ETHNICITIES.SUCCESS]: (state: any, { payload }) => {
      return state.set("ethnicities", Immutable.fromJS(payload));
    },
    [GET_ETHNICITY.SUCCESS]: (state: any, { payload }) => {
      return state.set("ethnicityGroups", Immutable.fromJS(payload));
    },
    [GET_PATIENT_ROOM.SUCCESS]: (state: any, { payload }) => {
      return state.set("patientRoom", Immutable.fromJS(payload));
    },
    [GET_PATIENT_ROOM_PHOTO.SUCCESS]: (state: any, { payload }) => {
      return state.set("photoInRoom", Immutable.fromJS(payload));
    },
    [GET_PATIENT_ROOM_MESSAGING.SUCCESS]: (state: any, { payload }) => {
      return state.set("messagingInfoInRoom", Immutable.fromJS(payload));
    },
    [RESET_PATIENT_ROOM]: (state: any) => {
      return state
        .set("patientRoom", Immutable.fromJS({}))
        .set("photoInRoom", Immutable.fromJS(""))
        .set("messagingInfoInRoom", Immutable.fromJS({}));
    },
    [RESET_TABLE]: (state: any) => {
      return state.set(
        "patientsList",
        Immutable.fromJS({
          count: 0,
          result: [],
        })
      );
    },
  },
  initialState
);

export default patientsReducer;
