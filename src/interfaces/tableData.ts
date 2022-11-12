import { QueryDef } from "const";
import { StatusValue } from "interfaces";

export enum SORT_BY {
  alphabet = "fullName_desc",
  latest = "id_desc",
  oldest = "id_asc",
  nhs = "nhs_desc",
}
export interface IColumnData {
  dataKey: string;
  label: string;
  width?: number;
  widthMobile?: number;
  maxWidth?: string;
  maxWidthText?: number | string;
  editable?: boolean;
  shrink?: boolean;
  className?: string;
  style?: {};
}
export interface ITableData {
  edit: string;
}
export class QueryParams {
  search?: string;
  limit?: number = QueryDef.LIMIT;
  page?: number = 1;
  sort?: SORT_BY | string;
  id?: string = "";
  isActive?: StatusValue;
}

export enum Page {
  staff = "staff",
  patients ="patients",
  helpCentre =  "helpCentre",
  messaging = "messaging",
}