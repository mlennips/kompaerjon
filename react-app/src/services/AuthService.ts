import { IAuthInfo } from "../@types/auth";
import http from "../utils/helpers/http-common";
import LocalStorageService from "./LocalStorageService";

const authInfoDefault = {token: null, userId: null, expiresAt: null, isAuthenticated: false};
let authInfo: IAuthInfo = authInfoDefault;

const init = () => {
  let authFromLocalStorage = LocalStorageService.get('auth'); 
  if (authFromLocalStorage) {
    authInfo = JSON.parse(authFromLocalStorage) as IAuthInfo;
    if (authInfo && authInfo.expiresAt) {
      authInfo.expiresAt = new Date(authInfo.expiresAt);
    }
    if (!check()) {
      authInfo = authInfoDefault;
    }
  } 
}

const login = async (email: string , password: string) => {
    const data = { email: email, password: password };
    let postResult = await http.post(`/Public/login/`, data)
    var token = postResult.data.token;
    var userId = postResult.data.userId;
    var expiresAt = new Date(postResult.data.expiresAt);
    authInfo = { token: token, userId: userId, expiresAt: expiresAt, isAuthenticated: true }
    LocalStorageService.set('auth', JSON.stringify(authInfo));
    return postResult; 
};

const logout = () => {
  LocalStorageService.remove('auth');
  authInfo = authInfoDefault;
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