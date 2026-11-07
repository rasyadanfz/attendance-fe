import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Access Token

const accessTokenName = "attendance-access-token"

function getToken(): string | null {
    return localStorage.getItem(accessTokenName)
}

function setToken(token: string) {
    localStorage.setItem(accessTokenName, token)
}

function clearToken(){
    localStorage.removeItem(accessTokenName)
}

// Tailwind cn merge
const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export { getToken, setToken, clearToken, cn }