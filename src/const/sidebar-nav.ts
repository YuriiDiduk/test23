import {
  DashboardRoute,
  HelpRoute,
  MessagingRoute,
  PatientsRoute,
  PrivacyRoute,
  StaffRoute,
  TermsRoute,
} from "./routes";

export const mainNavigation = [
  {
    label: "Dashboard",
    link: `/${DashboardRoute}`,
  },
  {
    label: "Staff",
    link: `/${StaffRoute}`,
  },
  {
    label: "Patients",
    link: `/${PatientsRoute}`,
  },
  {
    label: "Patient Messaging",
    link: `/${MessagingRoute}`,
  },
  {
    label: "Help Centre",
    link: `/${HelpRoute}`,
  },
];

export const staticNavigation = [
  {
    label: "Privacy Policy",
    link: `/${PrivacyRoute}`,
  },
  {
    label: "Terms and Conditions",
    link: `/${TermsRoute}`,
  },
];
