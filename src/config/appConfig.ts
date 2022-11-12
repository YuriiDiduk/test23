// todo: fill API
const API_DEV = "https://nxs1api-dev.jelvix.dev";
const API_STAGE = "";

const { APP_NAME } = process.env;

let API_URL;

switch (APP_NAME) {
  case "stage":
    API_URL = API_STAGE;
    break;
  case "dev":
  default:
    API_URL = API_DEV;
}

export const AppConfig = {
  API_URL: API_URL,
};

export const Local = {
  TOKEN: "act",
  REFRESH_TOKEN: "rt",
  FIREBASE_TOKEN: "fbt",
};
//
