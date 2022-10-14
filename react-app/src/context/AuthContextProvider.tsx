import { ReactNode, FC, useState } from 'react'
import LocalStorageService from '../services/LocalStorageService';
import AuthContext from './AuthContext'
import http from "../utils/helpers/http-common";
// import axios from 'axios';
import { IAuthInfo } from '../@types/auth';

interface Props {
  children: ReactNode
}

let isFirstRender = true;

const AuthProvider: FC<Props> = ({ children }) => {
  const [authInfo, setAuthInfo] = useState<IAuthInfo>();
  console.log(99, 'AuthProvider', 1, authInfo);

  const updateState = (token: string, userId: string, expiresAt: Date) => {
    LocalStorageService.set('authToken', token);
    LocalStorageService.set('authUserId', userId);
    LocalStorageService.set('authExpires', expiresAt.toString());
    // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    if (authInfo?.token !== token) {
      console.log(99, 'auth', 'state changed')
      setAuthInfo({ token: token, userId: userId, expiresAt: expiresAt });
    }
  }

  const deleteState = () => {
    LocalStorageService.remove('authToken');
    LocalStorageService.remove('authUserId');
    LocalStorageService.remove('authExpires');  
    // delete axios.defaults.headers.common["Authorization"];
    if (authInfo?.token != null) {
      setAuthInfo({ token: null, userId: null, expiresAt: null });
    }
  }

  const isAuthenticated = () => {
    const expiresAt = authInfo?.expiresAt || null
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
        updateState(response.data.token, response.data.userId, new Date(response.data.validTo));
      });
  }

  const logout = () => {
    deleteState()
  }

  const handleAuthentication = () => {
    if (isAuthenticated()) {
      console.log(99, 'auth', 'auth=true');
      // 
    } else {
      console.log(99, 'auth', 'auth=false');
      logout();
    }
  }

  if (isFirstRender) {
    isFirstRender = false;
    let authTokenFromStorage = LocalStorageService.get('authToken');
    let authUserIdFromStorage = LocalStorageService.get('authUserId');
    let authExpiresFromStorage = LocalStorageService.get('authExpires');
    if (authTokenFromStorage && authUserIdFromStorage && authExpiresFromStorage) {
      setAuthInfo({
        token: authTokenFromStorage,
        userId: authUserIdFromStorage,
        expiresAt: new Date(authExpiresFromStorage)
      });
    } 
  }

  handleAuthentication();

  return (
    <AuthContext.Provider value={{
      userId: authInfo?.userId ?? null,
      expiresAt: authInfo?.expiresAt ?? null,
      token: authInfo?.token ?? null,
      login: login,
      logout: logout,
      handleAuthentication: handleAuthentication
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;