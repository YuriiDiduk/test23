import * as React from "react";
import s from "./Sidebar.module.scss";
import Logo from "assets/images/logo-light.svg";
import { useLocation } from "react-router";
import { mainNavigation, staticNavigation } from "const";
import { useContext, useEffect, useState } from "react";
import { Button } from "components/common/Button/Button";
import { Link } from "react-router-dom";
import cn from "classnames";
import { ToggleSidebarContext } from "context/ToggleSidebarContext";
import { BreakpointsContext } from "context/BreakpointsContext";
import { useNavigation } from "hooks/useNavigation";
import { useAppSelector } from "hooks/useAppSelector";
import { makeSelector } from "helpers";

export const Sidebar = () => {
  const { isMobile } = useContext(BreakpointsContext);
  const isAuth = useAppSelector<boolean>(
    makeSelector(["authReducer", "isAuth"])
  );

  const { selectedIndex } = useNavigation(mainNavigation);
  const { selectedIndex: selectedStatic } = useNavigation(staticNavigation);

  const { closeSidebar } = useContext(ToggleSidebarContext);

  const handleClick = () => {
    return isMobile && closeSidebar();
  };

  const renderNav = (
    nav: { label: string; link: string }[],
    className: string,
    selected: number
  ) => {
    return (
      <ul className={s[className]}>
        {nav.map(({ label, link }, idx) => {
          return (
            <li
              key={label}
              className={cn(s.item, selected === idx ? s.current : "")}
              onClick={handleClick}
            >
              <Link to={link} className={s.link}>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <aside className={cn(s.container, "scroll-parent")}>
      <div className={s.header}>
        <div className={s.logoWrapper}>
          <img src={Logo} className={s.logo} alt="Nexus logo" />
        </div>
        {isMobile && (
          <Button
            className={s.close}
            filled="invisible"
            icon="close"
            onClick={closeSidebar}
          />
        )}
      </div>
      <nav className={cn(s.nav, "scroll")}>
        {isAuth && renderNav(mainNavigation, "menu", selectedIndex)}
        {renderNav(staticNavigation, "staticNav", selectedStatic)}
      </nav>
    </aside>
  );
};
