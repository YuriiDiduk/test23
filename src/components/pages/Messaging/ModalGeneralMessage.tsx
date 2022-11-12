import * as React from 'react';
import { EmailForm } from 'components/common/Form/EmailForm';
import { Specialty } from 'interfaces';

type Props = {
  isOpen: boolean;
  handleClose(): void;
  senderEmail: string;
};

export const ModalGeneralMessage = ({ isOpen, handleClose, senderEmail }: Props) => {
  return (
    <EmailForm
      isOpen={isOpen}
      handleClose={handleClose}
      titleModal="General Message to All Patients"
      senderRole={Specialty.admin}
      senderEmail={senderEmail}
      receiverName="All Patients"
      maxLength={200}
    />
  );
};