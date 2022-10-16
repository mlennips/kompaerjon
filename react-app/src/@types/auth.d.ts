export interface IAuthInfo {
    token: string | null;
    expiresAt: Date | null;
    userId: string | null;
    isAuthenticated: boolean;
}

