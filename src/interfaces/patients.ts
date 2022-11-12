import { IObjectKeys } from "components/common/TableCustom/TableCustom";
import { ITableData } from "./tableData";

//Statistic
export enum Ages {
  ages40_50 = "40-50",
  ages51_60 = "51-60",
  ages61_70 = "61-70",
  ages71_ = "71+",
}

export interface IAgesResponse {
  [Ages.ages40_50]: number;
  [Ages.ages51_60]: number;
  [Ages.ages61_70]: number;
  [Ages.ages71_]: number;
}

export interface IEthnicityResponse {
  id: string;
  group: string;
  name: string;
}

export enum Religion {
  christians = "Christians",
  muslims = "Muslims",
  irreligions = "Irreligions and atheist",
  hindus = "Hindus",
  buddhists = "Buddhists",
}

export enum Status {
  active = "Active",
  inactive = "Inactive",
  all = "All Patients",
}

export enum StatusValue {
  active = "1",
  inactive = "0",
  all = "",
}

//Patients
export interface IPatients {
  avatar: string;
  fullName: string;
  nhs: string;
  age: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  ethnicity: string;
  religion: string;
}

export interface IPatientPhoto {
  avatar: string | File;
}

export interface IPatientCreate {
  fullName: string;
  dateOfBirth: any;
  phone: string;
  ethnicity: string;
  email: string;
  password: string;
  religion: string;
}

export interface IPatientUpdate {
  data: {
    fullName?: string;
    nhs?: string;
    dateOfBirth?: string;
    email?: string;
    phone?: string;
    ethnicity?: string;
    religion?: string;
  };
  id: string;
}

export interface IPatientRoom {
  isActive: boolean;
  fullName: string;
  age: number;
  photo: {
    uuid: string;
  };
}

export interface IPatientRoomMessagingInfo {
  roomId: string;
  isRead: boolean;
}

export interface IPatientStatusUpdate {
  isActive: StatusValue;
  id: string;
}

export interface IPatientsTable extends IPatients, ITableData, IObjectKeys {};


