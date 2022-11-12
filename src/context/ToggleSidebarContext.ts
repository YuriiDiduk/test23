import { createContext } from "react";

export const ToggleSidebarContext = createContext({
  openSidebar: () => {},
  closeSidebar: () => {},
});