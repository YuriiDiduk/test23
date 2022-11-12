import { useState } from "react";

export const useToggleSidebar = () => {
  const [sidebarIsOpen, toggleOpen] = useState(false);

  const openSidebar = () => {
    toggleOpen(true);
  };

  const closeSidebar = () => {
    toggleOpen(false);
  };

  return { sidebarIsOpen, openSidebar, closeSidebar };
};
