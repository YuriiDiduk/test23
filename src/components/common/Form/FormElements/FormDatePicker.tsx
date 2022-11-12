import React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { IFormInput } from "interfaces/form";
import { Icon } from "components/common/Icon";
import { FieldWrapper } from "components/common/Form/FieldWrapper";
import s from "../Form.module.scss";
import cn from "classnames";

interface IFormDatePickerProps extends IFormInput {
  className?: string;
  minAge?: number;
}

export const FormDatePicker = React.forwardRef<any, IFormDatePickerProps>(
  (props, ref) => {
    const {
      className = "",
      placeholder,
      name,
      value,
      error = "Error",
      label,
      onChange,
      minAge,
      ...rest
    } = props;

    const renderIcon = () => {
      return <Icon icon="calendar" />;
    };

    const getMaxDate = () => {
      if (minAge) {
        const date = new Date();
        return date.setFullYear(date.getFullYear() - minAge);
      }
      return new Date();
    };

    const maxDate = getMaxDate();

    return (
      <FieldWrapper
        className={cn(className, s.search)}
        error={error}
        label={label}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            {...rest}
            value={value}
            maxDate={maxDate}
            onChange={onChange}
            components={{ OpenPickerIcon: renderIcon }}
            renderInput={(params) => <TextField {...params} fullWidth />}
            ref={ref}
          />
        </LocalizationProvider>
      </FieldWrapper>
    );
  }
);
