export const displayError = (error: any) => {
  if (typeof error === "object" && error.message) {
    return error.message;
  }
};

export const getPhoneMask = (phone: string) => {
  if (phone.startsWith("+44")) {
    return `${phone.slice(0, 3)} ${phone.slice(3, 7)} ${phone.slice(7)}`;
  }
  return phone;
};
