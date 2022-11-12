import { IObjectKeys } from "components/common/TableCustom/TableCustom";
import { ITableData } from "./tableData";

export interface IFaq {
  title: string;
  body: string;
  uuid: string;
}

export interface IFaqCreate {
  title: string;
  body: string;
}

export interface IReportCreate {
  body: string;
}

export interface IFaqUpdate {
  data: {
    title: string;
    body: string;
  };
  id: string;
}

export interface IFaqTable extends IFaq, ITableData, IObjectKeys {};
