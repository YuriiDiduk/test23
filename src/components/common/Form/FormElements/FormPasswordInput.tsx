import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { IFormInput } from "interfaces/form";
import { Icon } from "components/common/Icon";
import { FieldWrapper } from "components/common/Form/FieldWrapper";

interface IFormPasswordInputProps extends IFormInput {
  className?: string;
  isShowable?: boolean;
}

export const FormPasswordInput = React.forwardRef<any, IFormPasswordInputProps>(
  (props, ref) => {
    const {
      label,
      className = "",
      placeholder,
      error = "Error",
      name,
      value,
      isShowable = "true",
      ...rest
    } = props;

    const [isShowPassword, setPasswordVisibility] = useState<boolean>(false);
    
    const inputType = !isShowable
      ? "password"
      : isShowPassword
        ? "text"
        : "password";

    const handleShowPassword = () => setPasswordVisibility(!isShowPassword);

    const onMouseDownHandler = () => {};

    return (
      <FieldWrapper className={className} error={error} label={label} id={name}>
        <TextField
          id={name}
          type={inputType}
          placeholder={placeholder}
          variant="outlined"
          {...rest}
          value={value}
          fullWidth
          inputProps={{
            maxLength: 50,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {isShowable ? (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    onMouseDown={onMouseDownHandler}
                  >
                    {isShowPassword ? (
                      <Icon icon="eye-off" />
                    ) : (
                      <Icon icon="eye" />
                    )}
                  </IconButton>
                ) : (
                  ""
                )}
              </InputAdornment>
            ),
          }}
          ref={ref}
        />
      </FieldWrapper>
    );
  }
);
