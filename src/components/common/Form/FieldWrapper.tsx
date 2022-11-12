import React from "react";
import { displayError } from "helpers/form";
import cn from "classnames";
import s from "./Form.module.scss";

interface IFieldWrapper {
  children: JSX.Element;
  className?: string;
  error?: any;
  label?: string;
  id?: string;
}

export const FieldWrapper = ({ children, className, error, label, id }: IFieldWrapper) => {
  return (
    <div
      className={cn(
        s.field,
        className,
        error.hasOwnProperty("type") && "error"
      )}
    >
      {label && <label htmlFor={id} className={s.label}>{label}</label>}
      {children}
      <div className={s.errorText}>{displayError(error)}</div>
    </div>
  );
};
