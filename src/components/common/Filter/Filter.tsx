import * as React from "react";
import s from "./Filter.module.scss";
import cn from "classnames";
import { UpdateTableContext } from "context/UpdateTableContext";
import { Status } from "interfaces";
import { useContext, useState } from "react";
import { BreakpointsContext } from "context/BreakpointsContext";
import { pointStatuses } from "const";

type Props = {
  options: Status[];
  defaultValue: Status;
};

export const Filter = ({ options, defaultValue }: Props) => {
  const { isDesktop } = useContext(BreakpointsContext);

  const { isUpdating, changeParams, updateTable } =
    useContext(UpdateTableContext);

  const [isOpen, openFilter] = useState(false);
  const [filterSelected, selectFilter] = useState(defaultValue);

  const handleClick = (value: Status) => () => {
    if (!isDesktop && value === filterSelected) {
      if (isOpen) {
        openFilter(false);
      } else {
        openFilter(true);
      }
    } else {
      const paramsValue = pointStatuses.find((i) => i.label === value)?.value;
      selectFilter(value);
      openFilter(false);
      changeParams({ isActive: paramsValue });
      updateTable();
    }
  };

  return (
    <div className={cn(s.wrap, isOpen && s.open)}>
      <div className={cn(s.container, "shadow-wrap large")}>
        {options.map((option) => {
          return (
            <button
              key={option}
              type="button"
              className={cn(s.btn, option === filterSelected && s.selected)}
              onClick={handleClick(option)}
              disabled={isUpdating}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};
