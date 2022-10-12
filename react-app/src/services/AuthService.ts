import axios from "axios";
import http from "../utils/helpers/http-common";
import LocalStorageService from "./LocalStorageService";


const login = async (email: string, password: string) => {
  const data = {
    email: email,
    password: password
  }
  var result = await http.post(`/Public/login/`, data);
  LocalStorageService.set('token', result.data.token);
  LocalStorageService.set('userId', result.data.userId);
  LocalStorageService.set('userEmail', result.data.email);
};

const checkLogin = () : boolean => {
  const token = LocalStorageService.get('token');
  var hasToken = token !== '';
  if (hasToken) {
    console.log(99, 'token', token);
    return true;
  }
  return false;
}

const getUserId = () : string | null => {
  return LocalStorageService.get('userId');
}

const AuthService = {
  login,
  checkLogin,
  getUserId,
};

export default AuthService;