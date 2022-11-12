import * as React from 'react';
import { Button } from '../Button/Button';
import { ModalWindow } from './ModalWindow';
import s from "./Modal.module.scss";

type Props = {
  title: string;
  btnCancel: string;
  iconCancel?: string;
  btnConfirm: string;
  iconConfirm?: string;
  isOpen: boolean;
  handleClose(): void;
  handleConfirm(): void;
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  cancelFilled?: boolean;
};

export const ModalConfirm = ({
  title,
  btnCancel,
  iconCancel,
  btnConfirm,
  iconConfirm,
  isOpen,
  handleClose,
  handleConfirm,
  className,
  children,
  isLoading,
  cancelFilled = true,
}: Props) => {
  return (
    <ModalWindow
      title={title}
      size="small"
      className={className}
      handleClose={handleClose}
      isOpen={isOpen}
    >
      {children}
      <div className={s.buttons}>
        <Button
          onClick={handleClose}
          value={btnCancel}
          filled={cancelFilled ? "fill" : "invisible"}
          icon={iconCancel}
        />
        <Button
          onClick={handleConfirm}
          value={btnConfirm}
          filled={cancelFilled ? "invisible" : "fill"}
          icon={iconConfirm}
          isLoading={isLoading}
        />
      </div>
    </ModalWindow>
  );
};