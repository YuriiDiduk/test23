import { signoutAction } from "actions/authActions";
import * as React from "react";
import { useDispatch } from "react-redux";
import cn from "classnames";
import { ModalConfirm } from "components/common/Modal/ModalConfirm";

type Props = {
  isOpen: boolean;
  handleClose(): void;
};

export const ModalLogout = ({ isOpen, handleClose }: Props) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signoutAction(null));
  };

  return (
    <ModalConfirm
      title="Do you really want to log out?"
      btnCancel="No, stay"
      btnConfirm="Yes, log out"
      iconConfirm="log-out"
      isOpen={isOpen}
      handleClose={handleClose}
      handleConfirm={logout}
    >
      <p className={cn("h3", "modal-text")}>
        You will need your email and password to log in again
      </p>
    </ModalConfirm>
  );
};
