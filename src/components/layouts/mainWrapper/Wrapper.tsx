import * as React from "react";
import { Sidebar } from "../sidebar/Sidebar";
import s from "./Main.module.scss";
import cn from "classnames";
import { useToggleSidebar } from "hooks/useToggleSidebar";
import { ToggleSidebarContext } from "context/ToggleSidebarContext";
import { BreakpointsContext } from "context/BreakpointsContext";
import { useMedia } from "hooks/useMedia";
import { UpdateTableContext } from "context/UpdateTableContext";
import { useUpdateTable } from "hooks/useUpdateTable";

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { isMobile, isDesktop } = useMedia();
  const { sidebarIsOpen, openSidebar, closeSidebar } = useToggleSidebar();
  const {
    isUpdating,
    updateTable,
    updateFinish,
    params,
    changeParams,
    resetParams,
  } = useUpdateTable();

  return (
    <BreakpointsContext.Provider value={{ isMobile, isDesktop }}>
      <ToggleSidebarContext.Provider value={{ openSidebar, closeSidebar }}>
        <UpdateTableContext.Provider
          value={{
            isUpdating,
            updateTable,
            updateFinish,
            params,
            changeParams,
            resetParams,
          }}
        >
          <main className={cn(s.wrapper, sidebarIsOpen && [s.barOpen])}>
            <Sidebar />
            <div className={s.content}>{children}</div>
          </main>
        </UpdateTableContext.Provider>
      </ToggleSidebarContext.Provider>
    </BreakpointsContext.Provider>
  );
};
