import * as React from "react";
import { Dropdown } from "components/common/Dropdown/Dropdown";
import { Avatar } from "components/common/Avatar/Avatar";
import { useModal } from "hooks/useModal";
import { ModalLogout } from "./ModalLogout";
import { ModalSettings } from "./ModalSettings/ModalSettings";
import { Button } from "components/common/Button/Button";
import { ToggleSidebarContext } from "context/ToggleSidebarContext";
import s from "./Header.module.scss";
import cn from "classnames";
import { useContext } from "react";
import { BreakpointsContext } from "context/BreakpointsContext";
import { useGetElementValue } from "hooks/useGetElementValue";
import { useSelector } from "react-redux";
import { makeSelector } from "helpers";
import { IProfile } from "interfaces/profile";
import { Notifications } from "./Notifications/Notifications";
import { useNavigate } from "react-router-dom";

type Props = {
  children?: JSX.Element;
  isStatic?: boolean;
  className?: string;
};

export const Header = ({ children, isStatic, className }: Props) => {
  const profile = useSelector<any, IProfile>(
    makeSelector(["profileReducer", "profile"])
  );

  const file = useSelector<any, string>(
    makeSelector(["profileReducer", "file"])
  );

  const { isMobile } = useContext(BreakpointsContext);
  const { openSidebar } = React.useContext(ToggleSidebarContext);
  const navigate = useNavigate();

  const { elemValue, elem } = useGetElementValue("position");

  const {
    isOpen: isOpenSettings,
    openModal: openModalSettings,
    closeModal: closeModalSettings,
  } = useModal("settings");
  const {
    isOpen: isOpenLogout,
    openModal: openModalLogout,
    closeModal: closeModalLogout,
  } = useModal("logout");

  const menuList = [
    {
      label: "Settings",
      value: "settings",
      icon: "settings",
      onClick: () => openModalSettings(),
    },
    {
      label: "Log Out",
      value: "logout",
      icon: "log-out",
      onClick: () => openModalLogout(),
    },
  ];

  return (
    <header className={cn(s.container, "container", className && s[className])}>
      {!isStatic && isMobile && (
        <Button
          className={s.burger}
          filled="invisible"
          icon="grab"
          onClick={openSidebar}
        />
      )}
      <div className={s.content}>{children}</div>
      {!isStatic && (
        <div className={cn(s.settingsLink, "shadow-wrap large")}>
          <Notifications />
          <Dropdown
            name="settings"
            menuList={menuList}
            type="large"
            menuTextPosition={elemValue}
          >
            <>
              <Avatar avatar={file} size={40} className={s.avatar} />
              {!isMobile && (
                <div className={s.email} ref={elem}>
                  <span>{profile.email}</span>
                </div>
              )}
            </>
          </Dropdown>
        </div>
      )}
      {profile.uuid && (file || file === "") && (
        <ModalSettings
          isOpen={isOpenSettings}
          handleClose={closeModalSettings}
          profile={profile}
          file={file}
        />
      )}
      <ModalLogout isOpen={isOpenLogout} handleClose={closeModalLogout} />
    </header>
  );
};
