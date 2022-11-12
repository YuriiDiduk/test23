import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#182c47",
          fontWeight: "500",
          fontSize: "14px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          paddingLeft: "16px",
          paddingRight: "8px",
          "&:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#0045A3",
              borderWidth: "1px",
            },
          ".error &:hover .MuiOutlinedInput-notchedOutline, .error &.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#D40033",
            },
        },
        input: {
          height: "48px",
          boxSizing: "inherit",
          paddingLeft: "0",
          paddingRight: "8px",
        },
        notchedOutline: {
          borderWidth: "0",
          ".error &": {
            borderWidth: "1px",
            borderColor: "#D40033",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#182C47",
          "&:hover": {
            background: "none",
          },
        },
      },
    },
  },
});

export const MuiAuthThemeProvider: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
