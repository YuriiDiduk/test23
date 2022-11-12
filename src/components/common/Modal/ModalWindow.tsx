import React from "react";
import cn from "classnames";
import s from "./Modal.module.scss";
import Modal from "@mui/material/Modal";
import { Button } from "../Button/Button";

type Props = {
  children?: React.ReactNode;
  isOpen: boolean;
  title?: string;
  handleClose(): void;
  className?: string;
  size?: "small" | "middle" | "large";
};

export const ModalWindow = (props: Props) => {
  const {
    isOpen,
    className,
    title,
    handleClose,
    children,
    size = "large",
  } = props;

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      className={cn(s.modal, className)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        className={cn(
          { [`${s[size]}`]: size !== "large" },
          s.box,
          "frame",
          "focus"
        )}
      >
        <div className={s.title} >
          {title && <p className={cn(s.title, "h1")}>{title}</p>}
          <Button
            className={s.close}
            filled="invisible"
            icon="close"
            onClick={handleClose}
          />
        </div>
        <div
          className={s.body}
        >
          {children}
        </div>
      </div>
    </Modal>
  );
};
