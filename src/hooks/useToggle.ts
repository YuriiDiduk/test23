import { useState } from "react";

export const useToggle = () => {
  const [isOpen, toggleOpen] = useState(false);

  const open = () => {
    toggleOpen(true);
  };

  const close = () => {
    toggleOpen(false);
  };

  return { isOpen, open, close };
};
