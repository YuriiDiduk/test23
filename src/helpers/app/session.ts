import { storageSvc } from "./local-storage";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { Local } from "config/appConfig";
import { ISigninResp } from "interfaces";

class AuthSessionService {
  private _expiredDate = 0;

  constructor() {
    this.saveExpiredDate();
  }

  private saveExpiredDate(token?: string) {
    const access_token = token || storageSvc.getItem(Local.TOKEN);
    if (access_token) {
      const details = jwt_decode<JwtPayload>(access_token);
      this._expiredDate = details.exp ? details.exp * 1000 : 0;
    }
  }

  isRegistered() {
    return !!this.getToken();
  }

  saveData({ token, refreshToken }: ISigninResp): void {
    this.clearData();

    const storage = localStorage;
    storageSvc.setItem(Local.TOKEN, token, storage);
    storageSvc.setItem(Local.REFRESH_TOKEN, refreshToken, storage);

    this.saveExpiredDate(token);
  }

  isExpired(): boolean {
    return (
      this.isRegistered() &&
      this._expiredDate > 0 &&
      this._expiredDate < +new Date()
    );
  }

  getToken(): string | null {
    return storageSvc.getItem(Local.TOKEN);
  }

  getRefreshToken(): string | null {
    return storageSvc.getItem(Local.REFRESH_TOKEN);
  }

  clearData() {
    storageSvc.removeItem(Local.TOKEN);
    storageSvc.removeItem(Local.REFRESH_TOKEN);
  }

  saveFirebaseToken(token: string) {
    storageSvc.setItem(Local.FIREBASE_TOKEN, token);
  }

  getFirebaseToken(): string | null {
    return storageSvc.getItem(Local.FIREBASE_TOKEN);
  }

  removeFirebaseToken() {
    storageSvc.removeItem(Local.FIREBASE_TOKEN);
  }
}

export const session = new AuthSessionService();
