import React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { IFormInput } from "interfaces/form";
import { FieldWrapper } from "../FieldWrapper";
import cn from "classnames";
import s from "../Form.module.scss";

interface IFormTextInputProps extends IFormInput {
  className?: string;
  inputMask?: string;
  icon?: string;
  minRows?: number;
  maxLength?: number;
}

export const FormTextArea = React.forwardRef<any, IFormTextInputProps>(
  (props, ref) => {
    const {
      label,
      className = "",
      placeholder,
      error = "Error",
      name,
      value,
      disabled,
      minRows = 3,
      maxLength = 1000,
      ...rest
    } = props;

    return (
      <FieldWrapper
        className={cn(className, disabled && "disabled")}
        error={error}
        label={label}
        id={name}
      >
        <TextareaAutosize
          id={name}
          placeholder={placeholder}
          {...rest}
          value={value}
          minRows={minRows}
          maxLength={maxLength}
          ref={ref}
          disabled={disabled}
          className={s.textarea}
        />
      </FieldWrapper>
    );
  }
);
