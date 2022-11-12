import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import s from "./Dropdown.module.scss";
import cn from "classnames";
import { Icon } from "../Icon";
import { useRef } from "react";
import { BreakpointsContext } from "context/BreakpointsContext";
import { IDropList } from "interfaces/dropdown";
import { SORT_BY } from "interfaces";
import { useDropdown } from "hooks/useDropdown";

type Props = {
  name?: string;
  type?: "large" | "small";
  menuTextPosition?: number;
  menuList: IDropList[];
  selectedItem?: SORT_BY | string;
  sortSelectedLabel?: string;
  handleSortClick?: (value: SORT_BY | string) => void;
  children?: React.ReactNode;
  isUpdating?: boolean;
};

export const Dropdown = ({
  name,
  children,
  menuList,
  type = "small",
  menuTextPosition,
  sortSelectedLabel,
  handleSortClick,
  isUpdating,
}: Props) => {
  const { isMobile } = React.useContext(BreakpointsContext);

  const btnElem = useRef<HTMLDivElement>(null);

  const isSmall = type === "small";

  const { anchorEl, open, close } = useDropdown();

  const isOpen = Boolean(anchorEl);

  const handleClickMenu = (value: SORT_BY | string, onClick?: () => void) => {
    close();
    onClick && onClick();
    handleSortClick && handleSortClick(value);
  };

  const btnId = `${name}-btn`;
  const menuId = `${name}-name`;
  const chevron = isOpen ? "chevron-up" : "chevron-down";
  const dropdowmWidth = btnElem.current && btnElem.current.clientWidth;

  return (
    <div className={s.container} ref={btnElem}>
      <button
        className={cn(s.btn, s[type])}
        id={btnId}
        aria-controls={menuId}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={open}
        disabled={Boolean(isUpdating)}
      >
        <>
          {children ? (
            children
          ) : (
            <span className={s.selected}>{sortSelectedLabel}</span>
          )}
          <Icon icon={chevron} className={s.chevron} />
        </>
      </button>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={close}
        MenuListProps={{
          "aria-labelledby": btnId,
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {menuList.map(({ label, value, icon, onClick }) => {
          return (
            <MenuItem
              key={label}
              onClick={() => handleClickMenu(value, onClick)}
              sx={{
                width: isMobile ? "100%" : dropdowmWidth,
                fontSize: isSmall ? 16 : 14,
                fontWeight: isSmall ? 400 : 700,
                padding: isMobile
                  ? `12px 20px`
                  : `12px 20px 12px ${menuTextPosition}px`,
                "&:hover": {
                  backgroundColor: "#DBF0F0",
                },
              }}
            >
              {icon && <Icon icon={icon} className={s.icon} />}
              <span>{label}</span>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};
