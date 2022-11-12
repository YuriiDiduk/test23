import * as React from "react";
import cn from "classnames";
import s from "./PageHeader.module.scss";
import { Button } from "components/common/Button/Button";
import { ReactElement, useContext } from "react";
import { BreakpointsContext } from "context/BreakpointsContext";
import { UpdateTableContext } from "context/UpdateTableContext";
import { Page } from "interfaces";

type Props = {
  title: string;
  textBtn: string;
  handleClickBtn(): void;
  isAccessibleAdd?: boolean;
  isTableVirtualized?: boolean;
  page?: Page;
  children?: ReactElement<any, any>;
};

export const PageHeader = ({
  title,
  textBtn,
  handleClickBtn,
  isTableVirtualized,
  isAccessibleAdd,
  page,
  children,
}: Props) => {
  const { isMobile } = useContext(BreakpointsContext);
  const { isUpdating } = useContext(UpdateTableContext);

  const defineDisabling = () => {
    switch (page) {
      //temporary disabled for Patient page
      case Page.patients:
        return true;
      case Page.messaging:
        return false;
      default:
        return isTableVirtualized && Boolean(isUpdating);
    }
  };

  return (
    <div className={cn(s.container)}>
      <h1 className={s.title}>{title}</h1>
      <div className={s.actions}>
        {children}
        {isAccessibleAdd && (
          <Button
            icon="plus-circle"
            value={!isMobile ? textBtn : ""}
            onClick={handleClickBtn}
            disabled={defineDisabling()}
          />
        )}
      </div>
    </div>
  );
};
