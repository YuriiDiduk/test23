import * as React from 'react';
import { UseFormResetField } from 'react-hook-form';
import { ModalConfirm } from './ModalConfirm';

export interface IFormAvatar {
  avatar: File | null;
}

type Props = {
  isOpen: boolean;
  closeModal(): void;
  resetField: UseFormResetField<IFormAvatar>;
};

export const ModalConfirmRemoveAvatar = ({ isOpen, closeModal, resetField }: Props) => {
  const removeAvatar = () => {
    resetField("avatar", { defaultValue: null });
    closeModal();
  };

  return (
    <ModalConfirm
      title="The avatar will be removed. Are your shure?"
      btnCancel="No"
      btnConfirm="Yes, remove it"
      iconCancel='close'
      iconConfirm='trash'
      isOpen={isOpen}
      handleClose={closeModal}
      handleConfirm={removeAvatar}
    />
  );
};