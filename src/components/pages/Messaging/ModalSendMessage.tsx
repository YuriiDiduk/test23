import * as React from "react";
import { EmailForm } from "components/common/Form/EmailForm";
import { messageSubject, Specialty } from "interfaces";
import { Roles } from "interfaces/profile";

type Props = {
  id: number | null;
  roomId: string | null;
  roles: Roles[];
  isOpen: boolean;
  handleClose(): void;
  senderEmail: string;
  receiverName: string;
  receiverEmail: string;
};

export const ModalSendMessage = ({
  id,
  roomId,
  isOpen,
  handleClose,
  senderEmail,
  receiverName,
  receiverEmail,
}: Props) => {
  return (
    <EmailForm
      id={id}
      roomId={roomId}
      isOpen={isOpen}
      handleClose={handleClose}
      titleModal={`Message to ${receiverName}`}
      senderRole={Specialty.admin}
      senderEmail={senderEmail}
      receiverName={receiverName}
      receiverEmail={receiverEmail}
      subject={id ? messageSubject.answer : null}
    />
  );
};
