import { QueryParams } from "interfaces";
import { createContext } from "react";

export const UpdateTableContext = createContext({
  isUpdating: false,
  updateTable: () => {},
  updateFinish: () => {},
  params: {} as QueryParams,
  changeParams: (data: QueryParams) => {},
  resetParams: () => {},
});
