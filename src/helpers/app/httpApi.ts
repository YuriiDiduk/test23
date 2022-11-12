import axios from "axios";
import { AppConfig } from "config/appConfig";
import store from "store/store";
import { StatusCode, MESSAGE } from "const";
import { session } from "helpers";
import { refreshTokenSaga } from "sagas/authWatcher";
import { isArray } from "lodash";
import { signoutAction } from "actions/authActions";
import { pickBy, isNil } from "lodash";
import { ShowToastMessage } from "components/common/Toast";

interface IPayload extends IRequestData {
  partUrl: string;
  baseURL?: string;
  formData?: boolean;
  isAuthorized?: boolean;
}

interface HttpError {
  error: boolean;
  status: any;
  description: string;
}

interface HttpSuccess<T> {
  message: T;
  status: "ok" | "failed";
}

export type HttpResp<T = { [key in any]: string } | {}> = T &
  HttpError &
  HttpSuccess<T>;

interface IHeaders {
  "Content-Type"?:
    | "application/json"
    | "application/x-www-form-urlencoded"
    | "multipart/form-data";
  Authorization?: string;
}

interface IRequestData {
  data: {} | null;
  method: string;
  headers: IHeaders;
  signal?: AbortSignal;
}

export const headerWithToken = () => {
  const headers: IHeaders = {};
  if (session.getToken()) {
    headers.Authorization = `Bearer ${session.getToken()}`;
  }
  return headers;
};

export const getHeaders = (formData: boolean, existed?: IHeaders): IHeaders => {
  let headers: IHeaders;

  if (existed) {
    // just upd authorization if it needs
    headers = existed;
    if (headers.Authorization && /(Bearer)/.test(headers.Authorization)) {
      headers = {
        ...headers,
        ...headerWithToken(),
      };
    }
  } else {
    // create as default
    headers = {
      "Content-Type": formData ? "multipart/form-data" : "application/json",
      ...headerWithToken(),
    };
  }
  return headers;
};

export const toFormData = (data: any) => {
  const formData = new FormData();
  const filteredData = pickBy(data, (a) => !isNil(a));
  Object.keys(filteredData).forEach((field) => {
    const value = data[field];

    if (Array.isArray(value)) {
      value.forEach((valuePart, i) => {
        formData.append(`${field}[${i}]`, valuePart);
      });
    } else {
      if (field === "file") {
        formData.append(field, value, "newFile.png");
        return;
      }
      formData.append(field, value);
    }
  });

  return formData;
};

const prepareRequestData = (payload: IPayload): IRequestData | any => {
  const { headers, method = "GET", formData = false, data = {} } = payload;

  const params = {
    data: formData ? toFormData(data) : data,
    method,
    headers: getHeaders(formData, headers),
  };
  return params;
};

let isRefreshing = false;
let pendingPromises: any[] = [];
const continueStream = () => {
  return new Promise((resolve) => {
    pendingPromises.forEach((promise) => {
      promise();
    });
    pendingPromises = [];
    resolve(null);
  });
};

const updateToken = async (partUrl: string, payload: IPayload | any) => {
  if (isRefreshing) {
    const promise = new Promise((resolve) => pendingPromises.push(resolve));
    return promise;
  }

  // REFRESH TOKEN PROCESS
  if (session.isExpired() && (!isRefreshing || /token/.test(partUrl))) {
    // don't use as an action because we should await for refreshed token
    // before send rest requests
    if (!/token/.test(partUrl)) {
      isRefreshing = true;
      try {
        store.dispatch(
          refreshTokenSaga({ payload: session.getRefreshToken() } as any)
        );
      } catch (err) {
        store.dispatch(signoutAction(null));
        ShowToastMessage({
          title: MESSAGE.SESSION_EXPIRED,
        });
        isRefreshing = false;
      }
    } else {
      const { status, data } = await axios(
        `${AppConfig.API_URL}${partUrl}`,
        prepareRequestData(payload)
      );

      console.log("REFRESH request", status);
      isRefreshing = false;
      continueStream();
      return status >= StatusCode.OK && status < StatusCode.MULTIPLY_CHOICE
        ? data
        : {};
    }
  }
};

export async function httpApi(payload: IPayload | any) {
  const { partUrl, isAuthorized = true } = payload;
  try {
    await updateToken(partUrl, payload);

    const { status, data, headers }: any = await axios(
      `${AppConfig.API_URL}${partUrl}`,
      prepareRequestData(payload)
    );

    return status >= StatusCode.OK && status < StatusCode.MULTIPLY_CHOICE
      ? headers
        ? { ...data } || {}
        : data || {}
      : {};
  } catch (error: any) {
    const { response } = error;
    const { status = StatusCode.OFFLINE, data = {} } = response;
    const err: HttpError = {
      status,
      error: true,
      description: data.message || MESSAGE.ERROR_DEFAULT,
    };

    if (status === StatusCode.OFFLINE && !window.navigator.onLine) {
      err.description = MESSAGE.NO_NETWORK;
      ShowToastMessage({ title: MESSAGE.NO_NETWORK });
    }

    if (status === StatusCode.TOKEN_EXPIRED) {
      await updateToken(partUrl, payload);
      return;
    }

    if (status === StatusCode.UNAUTHORIZED && isAuthorized) {
      store.dispatch(signoutAction(null));
      return;
    }

    console.error("API ERROR ==>", { err, response });
    return err;
  }
}

// Encode data to x-www-form-urlencoded type
export const encodeDataToUrl = (
  params: { [key: string]: any },
  isSkipNull: boolean = true
) =>
  Object.keys(params)
    .filter((key) => !isSkipNull || (isSkipNull && params[key]))
    .map((key) => {
      if (isArray(params[key])) {
        const out = params[key].map(
          (p: number) => `${encodeURIComponent(key)}[]=${p}`
        );

        return out.join("&");
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    })
    .join("&");

export const encodeDataToForm = (data: any) => {
  let formBody = [];
  for (let prop in data) {
    var encodedKey = encodeURIComponent(prop);
    var encodedValue = encodeURIComponent(data[prop]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  return formBody.join("&");
};
