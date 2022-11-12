import * as React from 'react';
import s from "./Form.module.scss";
import cn from "classnames";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const FieldsGroup = ({children, className}: Props) => {
  return (
    <div className={cn(s.group, className)}>
      {children}
    </div>
  );
};