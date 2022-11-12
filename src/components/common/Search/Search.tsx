import * as React from 'react';
import s from "./Search.module.scss";
import cn from "classnames";
import { Controller, useForm } from 'react-hook-form';
import { PASSWORD_VALIDATION } from 'const';
import { FormSearchInput } from '../Form/FormElements/FormSearchInput';
import { useContext, useEffect } from 'react';
import { IActionFn, QueryParams } from 'interfaces';
import { UpdateTableContext } from 'context/UpdateTableContext';
import { usePrevious } from 'hooks/usePrevious';

interface FormValues {
  search: string;
}

type Props = {
  getAction?: IActionFn<QueryParams, any>;
};

export const Search = ({getAction}: Props) => {
  const { isUpdating, changeParams, updateTable } = useContext(UpdateTableContext);
  
  const defaultValues = {
    search: "",
  }

  const {
    handleSubmit,
    control,
    watch,
  } = useForm<FormValues>({
    defaultValues,
  });

  const watchedSearch = watch("search");
  const prevSearch = usePrevious(watchedSearch);

  useEffect(() => {
    if (prevSearch && prevSearch.length > 0 && !watchedSearch.length) {
      changeParams({search: ''});
      updateTable();
    }
  }, [watchedSearch]);

  const onSubmit = () => {
    changeParams({ search: watchedSearch });
    updateTable();
  }

  return (
    <div className={cn(s.container, "search")}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="search"
          rules={PASSWORD_VALIDATION}
          render={({ field }) => {
            return (
              <FormSearchInput
                {...field}
                name="search"
                placeholder="Search"
                onSubmit={onSubmit}
                disabled={Boolean(isUpdating)}
              />
            );
          }}
        />
      </form>
    </div>
  );
};