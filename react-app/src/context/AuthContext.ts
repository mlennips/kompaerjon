import React from "react";

export const defaultAuthContext: AuthContextProps = {
    token: null,
    userId: null,
    expiresAt: null,
    login: () => { },
    logout: () => { },
    handleAuthentication: () => { }
}

interface AuthContextProps {
    token: string | null;
    expiresAt: Date | null;
    userId: string | null;
    handleAuthentication: () => void;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextProps>(defaultAuthContext);
export default AuthContext;