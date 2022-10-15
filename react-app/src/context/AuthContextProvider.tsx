import { ReactNode, FC, useState } from 'react'
import LocalStorageService from '../services/LocalStorageService';
import AuthContext from './AuthContext'
import http from "../utils/helpers/http-common";
import axios from 'axios';
import { IAuthInfo } from '../@types/auth';

interface Props {
  children: ReactNode
}

let isFirstRender = true;
let isLocalStorageHandled = false;

const AuthProvider: FC<Props> = ({ children }) => {
  const [authInfo, setAuthInfo] = useState<IAuthInfo>({token: null, expiresAt: null, userId: null, isAuthenticated: false});

  let token = authInfo.token;
  let userId = authInfo.userId;
  let expiresAt = authInfo.expiresAt;

  const updateState = () => {
    if (token && userId && expiresAt) {
      LocalStorageService.set('authToken', token);
      LocalStorageService.set('authUserId', userId);
      LocalStorageService.set('authExpires', expiresAt.toString());
      //axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log(99, 'auth', 'localStorage changed', token, userId, expiresAt);
      if (authInfo.token !== token) {
        console.log(99, 'auth', 'state changed', '!!!');
        setAuthInfo({ token: token, userId: userId, expiresAt: expiresAt, isAuthenticated: true});
      }
    } else {
      console.log(99, 'auth', 'updateState', 'invalid');
    }
  }

  const deleteState = () => {
    LocalStorageService.remove('authToken');
    LocalStorageService.remove('authUserId');
    LocalStorageService.remove('authExpires');  
    token = null;
    userId = null;
    expiresAt = null;
    delete axios.defaults.headers.common["Authorization"];
    if (authInfo.token != null) {
      setAuthInfo({ token: null, userId: null, expiresAt: null, isAuthenticated: false });
    }
  }

  const checkAuthentication = () => {
    const expiresAt = authInfo.expiresAt;
    console.log(99, 'auth', 'isAuthenticated', expiresAt, authInfo?.expiresAt);
    if (expiresAt) {
      return new Date().getTime() < expiresAt.getTime();
    } else {
      return false;
    }
  }

  const login = (email: string, password: string) => {
    const data = { email: email, password: password };
    http.post(`/Public/login/`, data)
      .then(response => {
        console.log(99, 'login-ok');
        token = response.data.token;
        userId = response.data.userId;
        expiresAt = new Date(response.data.validTo);
        updateState();
      });
  }

  const logout = () => {
    console.log(99, 'auth', 'logout', isFirstRender, isLocalStorageHandled);
    deleteState()
  }

  const handleAuthentication = () => {
    if (checkAuthentication()) {
      console.log(99, 'auth', 'auth=true');
      // 
    } else {
      console.log(99, 'auth', 'auth=false');
      deleteState();
    }
  }

  if (isFirstRender) {
    console.log(99, 'auth', 'firstRender');
    isFirstRender = false;
    let authTokenFromStorage = LocalStorageService.get('authToken');
    let authUserIdFromStorage = LocalStorageService.get('authUserId');
    let authExpiresFromStorage = LocalStorageService.get('authExpires');
    console.log(99, 'auth', 'firstRender', authTokenFromStorage, authUserIdFromStorage, authExpiresFromStorage);
    if (authTokenFromStorage && authUserIdFromStorage && authExpiresFromStorage) {
      console.log(99, 'auth', 'firstRender', 'LocalStorage Valid');
      token = authExpiresFromStorage;
      userId = authUserIdFromStorage;
      expiresAt = new Date(authExpiresFromStorage);
      setAuthInfo({
        token: token,
        userId: userId,
        expiresAt: expiresAt,
        isAuthenticated: true
      });
      isLocalStorageHandled = true;
    } 
  }
  
  handleAuthentication();

  return (
    <AuthContext.Provider value={{
      userId: authInfo.userId,
      expiresAt: authInfo.expiresAt,
      token: authInfo.token,
      isAuthenticated: authInfo.isAuthenticated,
      login: login,
      logout: logout,
      handleAuthentication: handleAuthentication
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;