import * as React from "react";
import s from "./Table.module.scss";
import cn from "classnames";
import { Button } from "components/common/Button/Button";

type Props = {
  backText?: string;
  handleClose: () => void;
  children: JSX.Element;
};

export const TableRoom = ({ handleClose, backText = "Back", children }: Props) => {
  return (
    <div className={s.room}>
      <div className={cn(s.roomHeader, "container")}>
        <Button
          filled="invisible"
          value={backText}
          icon="arrow-back"
          onClick={handleClose}
          className={s.backBtn}
        />
      </div>
      <div className={cn("container", "scroll-parent", s.roomBody)}>{children}</div>
    </div>
  );
};
