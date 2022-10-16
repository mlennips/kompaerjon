import { IAuthInfo } from "../@types/auth";
import http from "../utils/helpers/http-common";
import LocalStorageService from "./LocalStorageService";

let authInfo: IAuthInfo | null = null;

const init = () => {
  let authFromLocalStorage = LocalStorageService.get('auth'); 
  if (authFromLocalStorage) {
    authInfo = <IAuthInfo>JSON.parse(authFromLocalStorage);
    authInfo.expiresAt = new Date(authInfo.expiresAt);
    if (!check()) {
      authInfo = null;
    }
  } 
}

const login = (email: string , password: string) => {
    const data = { email: email, password: password };
    let postResult = http.post(`/Public/login/`, data)
      .then(response => {
        var token = response.data.token;
        var userId = response.data.userId;
        var expiresAt = new Date(response.data.expiresAt);
        authInfo = { token: token, userId: userId, expiresAt: expiresAt }
        LocalStorageService.set('auth', JSON.stringify(authInfo));
      });
    return postResult; 
};

const logout = () => {
  LocalStorageService.remove('auth');
  authInfo = null;
};

const check = () => {
  if (authInfo && authInfo.expiresAt) {
    return new Date().getTime() < authInfo.expiresAt.getTime();
  }
  return false;
}

const get = () => {
  check();
  return authInfo;
}

const AuthService = {
  login,
  logout,
  check,
  get,
  init
};

export default AuthService;