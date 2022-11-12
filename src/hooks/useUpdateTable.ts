import { QueryParams } from "interfaces";
import { useState } from "react";

export const useUpdateTable = () => {
  const [isUpdating, setUpdate] = useState(false);
  const [params, setParams] = useState<QueryParams>({});
  
  const updateTable = () => {
    setUpdate(true);
  };
  
  const updateFinish = () => {
    setUpdate(false);
  };

  const changeParams = (data: QueryParams) => {
    setParams((params) => {
      return {
        ...params,
        ...data,
      }
    })
  };

  const resetParams = () => {
    setParams({})
  };

  return { isUpdating, updateTable, updateFinish, params, changeParams, resetParams };
};
