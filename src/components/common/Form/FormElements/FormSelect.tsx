import { IFormInput } from "interfaces/form";
import * as React from "react";
import { FieldWrapper } from "../FieldWrapper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Icon } from "components/common/Icon";
import s from "../Form.module.scss";
import { useToggle } from "hooks/useToggle";

interface IFormSelectProps extends IFormInput {
  className?: string;
  label?: string;
  options: string[] | number[];
}

export const FormSelect = React.forwardRef<any, IFormSelectProps>(
  (props, ref) => {
    const {
      name,
      className,
      label,
      value,
      onChange,
      options,
      error = "Error",
    } = props;

    const { isOpen, open, close } = useToggle();

    const renderIcon = () => {
      return (
        <Icon
          icon={isOpen ? "chevron-up" : "chevron-down"}
          className={s.chevron}
        />
      );
    };

    return (
      <FieldWrapper className={className} error={error} label={label} id={name}>
        <Select
          ref={ref}
          id={name}
          value={value}
          name={name}
          onChange={onChange}
          onOpen={open}
          onClose={close}
          IconComponent={renderIcon}
          displayEmpty={true}
          renderValue={(value) =>
            value ? value : <span className={s.placeholder}>Select</span>
          }
        >
          {options.map((item) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FieldWrapper>
    );
  }
);
