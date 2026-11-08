import { type ReactNode, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const accessTokenName = "attendance-access-token"

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
    const onStorage = (e: StorageEvent) => {
        const storedToken = localStorage.getItem(accessTokenName)
        if (e.key === accessTokenName) {
            setToken(storedToken)
        }

    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

    const setAccessToken = (token: string) => {
        localStorage.setItem(accessTokenName, token)
        setToken(token)
    }

    const clearAccessToken = () => {
        localStorage.removeItem(accessTokenName)
        setToken(null)
    }

    return <AuthContext.Provider value={{
        accessToken: token,
        isAuthenticated: token !== null,
        setAccessToken,
        clearAccessToken}}
    >
        {children}
    </AuthContext.Provider>
}