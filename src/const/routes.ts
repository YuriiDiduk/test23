export const baseURL = "";
const signIn = `${baseURL}/login`;

export const AuthRoute = {
  ROOT: signIn,
  FORGOT_PASSWORD: "forgot-password",
  RESET_PASSWORD: "api/reset-password",
  PASSWORD_UPDATED: "password-updated",
};

export const PrivacyRoute = "privacy";
export const TermsRoute = "terms";

export const NotFoundRoute = "404";

export const DashboardRoute = "dashboard";

export const StaffRoute = "staff";

export const PatientsRoute = "patients";

export const MessagingRoute = "messaging";

export const HelpRoute = "help";
