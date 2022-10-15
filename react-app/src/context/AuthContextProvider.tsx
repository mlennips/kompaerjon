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

  let authTokenFromStorage = LocalStorageService.get('authToken');
  let authUserIdFromStorage = LocalStorageService.get('authUserId');
  let authExpiresFromStorage = LocalStorageService.get('authExpires');

  const updateState = (token: string, userId: string, expiresAt: Date) => {
    if (token && userId && expiresAt) {
      LocalStorageService.set('authToken', token);
      LocalStorageService.set('authUserId', userId);
      LocalStorageService.set('authExpires', expiresAt.toString());
      authTokenFromStorage = token;
      authUserIdFromStorage = userId;
      authExpiresFromStorage = expiresAt.toString();
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      if (!authInfo.isAuthenticated || authInfo.token !== token) {
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
    delete axios.defaults.headers.common["Authorization"];
    if (authInfo.token != null) {
      setAuthInfo({ token: null, userId: null, expiresAt: null, isAuthenticated: false });
    }
  }

  const checkAuthentication = () => {
    if (authExpiresFromStorage) {
      const expiresAt = new Date(authExpiresFromStorage);
      console.log(99, 'auth', 'checkAuthentication', expiresAt, authInfo?.expiresAt);
      return new Date().getTime() < expiresAt.getTime();
    }
    return false;
  }

  const login = (email: string, password: string) => {
    const data = { email: email, password: password };
    http.post(`/Public/login/`, data)
      .then(response => {
        console.log(99, 'login-ok');
        updateState(response.data.token, response.data.userId, new Date(response.data.validTo));
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
    console.log(99, 'auth', 'firstRender', authTokenFromStorage);
    if (authTokenFromStorage && authUserIdFromStorage && authExpiresFromStorage) {
      console.log(99, 'auth', 'firstRender', 'LocalStorage Valid');
      // setAuthInfo({
      //   token: authExpiresFromStorage,
      //   userId: authUserIdFromStorage,
      //   expiresAt: new Date(authExpiresFromStorage || 0),
      //   isAuthenticated: true
      // });
      updateState(authTokenFromStorage, authUserIdFromStorage, new Date(authExpiresFromStorage));
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