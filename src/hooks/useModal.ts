import { useState } from "react";

export const useModal = (name: string) => {
  const [modalIsOpen, toggleOpen] = useState({
    name: '',
    isOpen: false,
  });

  const openModal = () => {
    toggleOpen({
      name,
      isOpen: true,
    });
  };

  const closeModal = () => {
    toggleOpen({
      name,
      isOpen: false,
    });
  };

  const isOpen = modalIsOpen.isOpen;

  return { isOpen, openModal, closeModal };
};
