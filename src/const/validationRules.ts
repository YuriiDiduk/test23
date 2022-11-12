import {
  NOT_EMPTY_PATTERN,
  PATTERN_EMAIL,
  PATTERN_PASSWORD,
  USERNAME_PATTERN,
  FULLNAME_PATTERN,
  FILLED_PHONE_PATTERN,
} from "./patterns";

const validateDate = (value: any) => {
  if (value.toString().includes("Invalid Date") || value > new Date()) {
    return "Invalid Date";
  };
  return true;
}

const validateMatchPassword = (newPassword: string) => (value: string) => {
  if (newPassword !== value) {
    return "Password did not match confirmation!";
  }
  return true;
};

const validatePassword = (value: string) => {
  if (!PATTERN_PASSWORD.countChars.pattern.test(value)) return PATTERN_PASSWORD.countChars.message;
  if (!PATTERN_PASSWORD.lowercase.pattern.test(value)) return PATTERN_PASSWORD.lowercase.message;
  if (!PATTERN_PASSWORD.uppercase.pattern.test(value)) return PATTERN_PASSWORD.uppercase.message;
  if (!PATTERN_PASSWORD.number.pattern.test(value)) return PATTERN_PASSWORD.number.message;
  if (!PATTERN_PASSWORD.character.pattern.test(value)) return PATTERN_PASSWORD.character.message;
  if (PATTERN_PASSWORD.unprocessableSymbols.pattern.test(value)) return PATTERN_PASSWORD.unprocessableSymbols.message;
}

const requiredObj = {
  value: true,
  message: "Field should not be empty",
};

export const REQUIRED = {
  required: requiredObj,
};

export const EMAIL_VALIDATION = {
  required: requiredObj,
  pattern: {
    value: PATTERN_EMAIL,
    message: "Email is invalid",
  },
};

export const NOT_EMPTY_VALIDATION = {
  required: requiredObj,
  pattern:  {
    value: NOT_EMPTY_PATTERN,
    message: 'Field should not be empty',
  }
};

export const PHONE_VALIDATION = {
  required: requiredObj,
  pattern: {
    value: FILLED_PHONE_PATTERN,
    message: "Phone should be filled ",
  },
};

export const USERNAME_VALIDATION = {
  required: requiredObj,
  pattern: {
    value: USERNAME_PATTERN,
    message: "Please use only letters, numbers, dot, hyphen and underscore",
  },
};

export const FULLNAME_VALIDATION = {
  required: requiredObj,
  pattern: {
    value: FULLNAME_PATTERN,
    message: "Please use only letters",
  },
};

export const DATE_VALIDATION = {
  required: requiredObj,
  validate: validateDate,
};

export const PASSWORD_VALIDATION = ({
  required: requiredObj,
  validate: validatePassword,
});

export const CONFIRM_PASSWORD_VALIDATION = (password: string) => ({
  required: requiredObj,
  validate: validateMatchPassword(password),
});
