import { IObjectKeys } from "components/common/TableCustom/TableCustom";
import { ITableData } from "./tableData";

export enum Specialty {
  admin = "Admin",
  doctor = "Doctor",
  nurse = "Nurse",
  surgeon = "Surgeon",
}

export interface IStaff {
  avatar: string;
  fullName: string;
  email: string;
  phone: string;
  specialty: Specialty;
}

export interface IStaffPhoto {
  avatar: string | File;
}

export interface IStaffCreate {
  fullName: string;
  email: string;
  phone: string;
  specialty: Specialty | string;
  password: string;
}

export interface IStaffUpdate {
  data: {
    fullName?: string;
    phone?: string;
    specialty?: Specialty | string;
  };
  id: string;
}

export interface IStaffPhotoUpdate {
  data: {
    photo: string;
  };
  id: string;
}

export interface IStaffTable extends IStaff, ITableData, IObjectKeys {}
