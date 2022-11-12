import * as React from "react";
import { Icon } from "components/common/Icon";
import { useEffect } from "react";
import s from "./Notifications.module.scss";
import cn from "classnames";
import { makeSelector } from "helpers";
import { IPhotoList } from "interfaces/tablePhotos";
import { useDispatch, useSelector } from "react-redux";
import { INotification } from "interfaces";
import { INotificationsReducerState } from "store/reducers/notificationsReducer";
import { getNotificationsPhotoAction } from "actions/notificationsActions";
import { usePrevious } from "hooks/usePrevious";
import { Avatar } from "components/common/Avatar/Avatar";
import Menu from "@mui/material/Menu";
import { useDropdown } from "hooks/useDropdown";
import { Link, useLocation } from "react-router-dom";
import { MessagingRoute } from "const/routes";

export const Notifications = () => {
  const notifications = useSelector<
    INotificationsReducerState,
    INotification[]
  >(makeSelector(["notificationsReducer", "notificationsList"]));

  const photoList = useSelector<INotificationsReducerState, IPhotoList[]>(
    makeSelector(["notificationsReducer", "photoList"])
  );

  const prevList = usePrevious<INotification[]>(notifications);

  const location = useLocation();
  const isMessagingPage = location.pathname === `/${MessagingRoute}`;

  const dispatch = useDispatch();

  useEffect(() => {
    const getPhoto = (list: INotification[]) => {
      list.forEach((row) => {
        if (row.avatar) {
          dispatch(getNotificationsPhotoAction(row.avatar));
        }
      });
    };

    if (!prevList?.length && notifications.length) {
      getPhoto(notifications);
    }
  }, [notifications]);

  const { anchorEl, open, close } = useDropdown();

  const isOpen = Boolean(anchorEl);

  const btnId = "notification-btn";
  const menuId = "notifications";

  const handleLinkClick = () => {
    close();
  };

  const renderNotificationsList = () => {
    return (
      <Menu
        id={menuId}
        className={s.listNot}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={close}
        MenuListProps={{
          "aria-labelledby": btnId,
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {notifications.map(({ fullName, text, avatar }) => {
          const photo = photoList.find(({ id }) => id === avatar)?.photo;
          return (
            <li key={fullName} className={s.itemRow}>
              {!isMessagingPage ? (
                <Link
                  className={s.item}
                  to={`/${MessagingRoute}`}
                  onClick={handleLinkClick}
                >
                  <Avatar avatar={photo} size={40} className={s.avatar} />
                  <div className={s.messageRow}>
                    <span className={s.name}>{fullName}</span>
                    <span className={s.message}>{text}</span>
                  </div>
                </Link>
              ) : (
                <div className={s.item}>
                  <Avatar avatar={photo} size={40} className={s.avatar} />
                  <div className={s.messageRow}>
                    <span className={s.name}>{fullName}</span>
                    <span className={s.message}>{text}</span>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </Menu>
    );
  };

  return (
    <>
      <button
        id={btnId}
        className={cn(s.bell, notifications.length && s.open)}
        onClick={open}
        aria-controls={menuId}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        disabled={!Boolean(notifications.length)}
      >
        <Icon icon="bell" />
      </button>
      {isOpen ? renderNotificationsList() : null}
    </>
  );
};
