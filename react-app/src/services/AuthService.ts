import http from "../utils/helpers/http-common";
import LocalStorageService from "./LocalStorageService";


const login = async (email: string, password: string) => {
  const data = {
    email: email,
    password: password
  }
  var result = await http.post(`/Public/login/`, data);
  LocalStorageService.set('token', result.data.token);
  LocalStorageService.set('tokenExpires', result.data.validTo);
  LocalStorageService.set('userId', result.data.userId);

  return result.data;
};

const checkLogin = () : boolean => {
  const token = LocalStorageService.get('token');
  var hasToken = token !== '';
  if (hasToken) {
    return true;
  }
  return false;
}

const getUserId = () : string | null => {
  return LocalStorageService.get('userId');
}

const getToken = () : string | null => {
  return LocalStorageService.get('token');
}

const AuthService = {
  login,
  checkLogin,
  getUserId,
  getToken
};

export default AuthService;