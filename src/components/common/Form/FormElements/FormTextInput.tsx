import React from 'react';
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import InputMask from "react-input-mask";
import { IFormInput } from 'interfaces/form';
import { Icon } from 'components/common/Icon';
import { FieldWrapper } from '../FieldWrapper';
import cn from "classnames";

interface IFormTextInputProps extends IFormInput {
  className?: string;
  inputMask?: string;
  icon?: string;
  maxLength?: number;
}

export const FormTextInput = React.forwardRef<any, IFormTextInputProps>(
  (props, ref) => {
    const {
      label,
      className = '',
      placeholder,
      type = 'text',
      inputMask,
      error = 'Error',
      name,
      value,
      icon,
      disabled,
      maxLength = 50,
      ...rest
    } = props;

    return (
      <FieldWrapper
        className={cn(className, disabled && "disabled")}
        error={error}
        label={label}
        id={name}
      >
        {inputMask ? (
          <InputMask
            mask={inputMask}
            value={props.value}
            onChange={props.onChange}
            ref={ref}
            onBlur={props.onBlur}
            disabled={disabled}
          >
            {() => (
              <TextField
                id={name}
                type={type}
                placeholder={placeholder}
                fullWidth
                disabled={disabled}
                {...rest}
              />
            )}
          </InputMask>
        ) : (
          <TextField
            id={name}
            type={type}
            placeholder={placeholder}
            variant="outlined"
            {...rest}
            value={value}
            fullWidth
            inputProps={{
              maxLength: maxLength,
            }}
            InputProps={{
              startAdornment: (
                <>
                  {icon && (
                    <InputAdornment position="end">
                      <Icon icon={icon} />
                    </InputAdornment>
                  )}
                </>
              ),
            }}
            ref={ref}
            disabled={disabled}
          />
        )}
      </FieldWrapper>
    );
  },
);
