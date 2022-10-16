import React from "react";
import { IAuthInfo } from "../@types/auth";

export const defaultAuthContext: AuthContextProps = {
    token: null,
    userId: null,
    expiresAt: null,
    isAuthenticated: false,
    login: () => Promise.resolve({ token: null, userId: null, expiresAt: null, isAuthenticated: false}),
    logout: () => { }
}

interface AuthContextProps {
    token: string | null;
    expiresAt: Date | null;
    userId: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<IAuthInfo>;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextProps>(defaultAuthContext);
export default AuthContext;