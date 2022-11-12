import { createContext } from "react";

export const BreakpointsContext = createContext({
  isMobile: false,
  isDesktop: false,
});
