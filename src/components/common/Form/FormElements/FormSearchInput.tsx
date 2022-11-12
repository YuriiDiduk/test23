import React from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { IFormInput } from "interfaces/form";
import { Icon } from "components/common/Icon";
import { FieldWrapper } from "components/common/Form/FieldWrapper";
import s from "../Form.module.scss";
import cn from "classnames";

interface IFormSearchInputProps extends IFormInput {
  className?: string;
  onSubmit: () => void;
}

export const FormSearchInput = React.forwardRef<any, IFormSearchInputProps>(
  (props, ref) => {
    const {
      className = "",
      placeholder,
      name,
      value,
      error = "Error",
      onSubmit,
      ...rest
    } = props;

    const handleSearch = () => {
      onSubmit();
    }

    return (
      <FieldWrapper className={cn(className, s.search)} error={error}>
        <TextField
          id={name}
          type="text"
          placeholder={placeholder}
          variant="outlined"
          {...rest}
          value={value}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  type="submit"
                  onClick={handleSearch}
                >
                  <Icon icon="search" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          ref={ref}
        />
      </FieldWrapper>
    );
  }
);
