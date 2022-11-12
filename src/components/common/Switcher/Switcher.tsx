import * as React from 'react';
import s from "./Switcher.module.scss";
import cn from "classnames";

type Props = {
  isActive: boolean;
  disabled: boolean;
  handleClick: () => void;
};

export const Switcher = ({ isActive, disabled, handleClick }: Props) => {
  return (
    <>
      <button
        className={cn(s.btn, isActive && s.switchOn)}
        onClick={handleClick}
        disabled={disabled}
      ></button>
    </>
  );
};