import { ReactNode, FC, useState } from 'react'
import AuthContext, { defaultAuthContext } from './AuthContext'
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
  let [state, setState] = useState<IAuthInfo | null>(AuthService.get());
  console.log(99, 'AuthProvider', 1);
  
  const login = (email: string, password: string) => {
    AuthService.login(email, password).then(() => {
      let authInfo = AuthService.get();
      if (authInfo) {
        setState({
          token: authInfo.token,
          userId: authInfo.userId,
          expiresAt: authInfo.expiresAt,          
        });
      }
    });    
  }

  const logout = () => {
    AuthService.logout();
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