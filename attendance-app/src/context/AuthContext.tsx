import { createContext } from "react";

export interface AuthContextValue {
    accessToken: string | null
    isAuthenticated: boolean
    setAccessToken: (token: string) => void
    clearAccessToken: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null);