export const PATTERN_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PHONE_PATTERN = '+44 9999 999999';
export const PATTERN_PASSWORD = {
  countChars: {
    pattern: /[^\s]{8,}$/,
    message: "Minimum of 8 characters (without spaces)",
  },
  lowercase: {
    pattern: /[a-z]/,
    message: "Include at least one lowercase letter (a-z)",
  },
  uppercase: {
    pattern: /[A-Z]/,
    message: "Include at least one uppercase letter (A-Z)",
  },
  number: {
    pattern: /[0-9]/,
    message: "Include at least one number (0-9)",
  },
  character: {
    pattern: /[<>{}"|;:.,~!?@#$%^=&*_+]/,
    message: "Include at least one special character",
  },
  unprocessableSymbols: {
    pattern: /[/]/,
    message: "Exclude unprocessable symbols",
  },
};

export const NOT_EMPTY_PATTERN = /[^\s]/;

export const FILLED_PHONE_PATTERN = /[0-9]{5,}/;

// profile
export const USERNAME_PATTERN = /^[0-9a-zA-Z_.-]+$/;
export const FULLNAME_PATTERN = /^[a-zA-Z\s]+$/;
