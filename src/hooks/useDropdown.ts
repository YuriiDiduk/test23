import { useState } from "react";

export const useDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const close = () => {
    setAnchorEl(null);
  };

  return { anchorEl, open, close };
};
