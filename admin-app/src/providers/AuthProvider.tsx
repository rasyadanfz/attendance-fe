import { type ReactNode, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  accessTokenName,
  getAccessToken,
  saveAccessToken,
  setUnauthorizedHandler,
} from "../tokenStore";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(getAccessToken);

  const setAccessToken = (token: string) => {
    saveAccessToken(token);
    setToken(token);
  };

  const clearAccessToken = () => {
    saveAccessToken(null);
    setToken(null);
  };

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== accessTokenName && e.key !== null) return;

      const storedToken = localStorage.getItem(accessTokenName);
      saveAccessToken(storedToken);
      setToken(storedToken);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    // Set 401 handler for fetch interceptors
    setUnauthorizedHandler(clearAccessToken);
    return () => setUnauthorizedHandler(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken: token,
        isAuthenticated: token !== null,
        setAccessToken,
        clearAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
