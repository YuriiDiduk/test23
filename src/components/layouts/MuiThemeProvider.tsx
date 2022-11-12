import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

const mainText = "#182c47";
const borderLight = "#E3E5E8";
const border = "#32B38E";
const errorColor = "#D40033";
const inputHeight = "48px";
const searchHeight = "64px";
const tableInputHeight = "40px";

const theme = createTheme({
  typography: {
    fontFamily: `'DM Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif`,
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: mainText,
          fontWeight: "inherit",
          fontSize: "inherit",
          backgroundColor: "#f3fcf9",
          borderRadius: "16px",
          paddingLeft: "16px",
          paddingRight: "8px",
          width: "100%",
          "&:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: border,
              borderWidth: "1px",
            },
          ".disabled & .MuiOutlinedInput-notchedOutline, .disabled &.Mui-focused .MuiOutlinedInput-notchedOutline, .disabled &:hover .MuiOutlinedInput-notchedOutline, .disabled &.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: borderLight,
            },

          ".form-modal-email & .MuiOutlinedInput-notchedOutline, .form-modal-email &.Mui-focused .MuiOutlinedInput-notchedOutline, .form-modal-email &:hover .MuiOutlinedInput-notchedOutline, .form-modal-email &.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderWidth: "0",
            },

          ".error &:hover .MuiOutlinedInput-notchedOutline, .error &.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: errorColor,
            },
          ".search &": {
            backgroundColor: "#fff",
          },
          ".form-modal-email &": {
            backgroundColor: "#F8F8F8",
            padding: 0,
          },
        },
        input: {
          height: inputHeight,
          boxSizing: "inherit",
          paddingLeft: "0",
          paddingRight: "8px",
          ".form-table &": {
            height: tableInputHeight,
          },
          ".search &": {
            height: searchHeight,
            backgroundColor: "#fff",
          },
          ".form-modal-email &": {
            padding: 0,
            height: "23px",
          },
        },
        notchedOutline: {
          borderColor: "#8ADEC6",
          ".error &": {
            borderColor: errorColor,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          height: inputHeight,
          paddingTop: "13px",
          paddingBottom: "13px",
          position: "relative",
          zIndex: "1",
          ".form-table &": {
            paddingTop: "10px",
            paddingBottom: "10px",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: mainText,
          "&:hover": {
            background: "none",
          },
          marginRight: "0",
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: "16px",
          boxShadow: "4px 4px 16px rgba(0, 0, 0, 0.07)",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          padding: "0",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "0",
        },
        head: {
          fontWeight: "700",
        },
      },
    },
  },
});

export const MuiThemeProvider: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
