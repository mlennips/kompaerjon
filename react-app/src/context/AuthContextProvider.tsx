import { ReactNode, FC, useState } from 'react'
import AuthContext from './AuthContext'
import AuthService from '../services/AuthService';
import { IAuthInfo } from '../@types/auth';

interface Props {
  children: ReactNode
}

let isFirstRender = true;

const AuthProvider: FC<Props> = ({ children }) => { 
  if (isFirstRender) {
    isFirstRender = false;
    AuthService.init();
  }
  let [state, setState] = useState<IAuthInfo>(AuthService.get());

  const login = async (email: string, password: string) : Promise<IAuthInfo> => {
    let loginResult = await AuthService.login(email, password);
    let result = AuthService.get();
    if (loginResult) {
      setState(result);
    }
    return new Promise(x => x(result));  
  }

  const logout = () => {
    AuthService.logout();
    setState(AuthService.get());
  }
  
  return (
    <AuthContext.Provider value={{
      token: state?.token ?? null,
      userId: state?.userId ?? null,
      expiresAt: state?.expiresAt ?? null,
      isAuthenticated: !!state?.token,
      login: login,
      logout: logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;