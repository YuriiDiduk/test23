import { CREATE_PATIENT, GET_AGES, GET_ETHNICITIES, GET_ETHNICITY, GET_PATIENTS, GET_PATIENTS_AMOUNT, GET_PATIENT_ROOM, GET_PATIENT_ROOM_MESSAGING, GET_PATIENT_ROOM_PHOTO, REMOVE_PATIENT, TOGGLE_STATUS_PATIENT, UPDATE_PATIENT } from "const";
import { IActionFn, IPatientStatusUpdate, QueryParams } from "interfaces";
import { IPatientCreate, IPatientUpdate } from "interfaces";

//Statistic
export const getPatientsAmountAction: IActionFn<null> = (payload) => ({
  payload,
  type: GET_PATIENTS_AMOUNT.PENDING,
});

export const getAgesAction: IActionFn<null> = (payload) => ({
  payload,
  type: GET_AGES.PENDING,
});

export const getEthnicitiesAction: IActionFn<null> = (payload) => ({
  payload,
  type: GET_ETHNICITIES.PENDING,
});

//Patients
export const getEthnicityAction: IActionFn = (payload) => ({
  payload,
  type: GET_ETHNICITY.PENDING,
});

export const getPatientsAction: IActionFn<QueryParams | null> = (
  payload,
  params
) => ({
  payload,
  params,
  type: GET_PATIENTS.PENDING,
});

export const createPatientAction: IActionFn<IPatientCreate> = (
  payload,
  params
) => ({
  payload,
  params,
  type: CREATE_PATIENT.PENDING,
});

export const removePatientAction: IActionFn<string> = (payload, params) => ({
  payload,
  params,
  type: REMOVE_PATIENT.PENDING,
});

export const toggleStatusPatientAction: IActionFn<IPatientStatusUpdate> = (
  payload,
  params
) => ({
  payload,
  params,
  type: TOGGLE_STATUS_PATIENT.PENDING,
});

export const updatePatientAction: IActionFn<IPatientUpdate> = (
  payload,
  params
) => ({
  payload,
  params,
  type: UPDATE_PATIENT.PENDING,
});

export const getPatientRoomAction: IActionFn<string> = (
  payload,
  params
) => ({
  payload,
  params,
  type: GET_PATIENT_ROOM.PENDING,
});

export const getPatientRoomPhotoAction: IActionFn<string> = (payload, params) => ({
  payload,
  params,
  type: GET_PATIENT_ROOM_PHOTO.PENDING,
});

export const getPatientRoomMessagingAction: IActionFn<string> = (payload, params) => ({
  payload,
  params,
  type: GET_PATIENT_ROOM_MESSAGING.PENDING,
});


