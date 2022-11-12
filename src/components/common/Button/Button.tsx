import React from "react";
import s from "./Button.module.scss";
import cn from "classnames";
import LoadingDots from "../LoadingDots/LoadingDots";
import { Icon } from "../Icon";

interface IButton {
  type?: "submit" | "button";
  filled?: "empty" | "fill" | "fill-bright" | "invisible";
  size?: "long" | "normal";
  icon?: string;
  iconColor?: "warning" | "normal";
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
  value?: string;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
}

export const Button: React.FC<IButton> = ({
  type = "button",
  filled = "fill",
  size = "normal",
  icon,
  iconColor = "normal",
  onClick,
  value = "",
  disabled = false,
  className,
  isLoading = false,
}) => {
  const classes = cn({
      [`${s[filled]}`]: filled !== "fill",
      [`${s[size]}`]: size !== "normal",
      [`${s[iconColor]}`]: iconColor === "warning",
    },
    isLoading && [s.loading],
    className
  );

  const isLight = filled === "invisible";

  return (
    <button
      disabled={disabled}
      type={type}
      className={cn(s.btn, classes)}
      onClick={onClick}
    >
      {icon && <Icon icon={icon} className={s.icon} />}
      {value && <span className={s.value}>{value}</span>}
      {isLoading && <LoadingDots isLight={isLight} />}
    </button>
  );
};
