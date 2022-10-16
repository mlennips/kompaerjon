import React from "react";

export const defaultAuthContext: AuthContextProps = {
    token: null,
    userId: null,
    expiresAt: null,
    isAuthenticated: false,
    login: () => { },
    logout: () => { }
}

interface AuthContextProps {
    token: string | null;
    expiresAt: Date | null;
    userId: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextProps>(defaultAuthContext);
export default AuthContext;