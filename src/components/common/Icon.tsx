import React from "react";
import cn from "classnames";

interface IProps {
  icon: string;
  className?: string;
}

export const Icon: React.FC<IProps> = ({ icon, className }) => {
  return (
    <span className={cn(className, `icon-${icon}`)} aria-hidden="true"></span>
  );
};
