import { SORT_BY } from "interfaces";

export interface IDropList {
  label: string;
  value: string | SORT_BY;
  icon?: string;
  onClick?: () => void;
}