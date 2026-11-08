export const accessTokenName = "attendance-access-token"

let currentToken: string | null = localStorage.getItem(accessTokenName)

export function getAccessToken(): string | null {
    return currentToken
}

export const saveAccessToken = (token: string | null) => {
    currentToken = token
    if (token) {
        localStorage.setItem(accessTokenName, token)
    } else {
        localStorage.removeItem(accessTokenName)
    }
} 

// for fetch interceptors
let unauthorizedHandler: (() => void) | null = null  

export const setUnauthorizedHandler = (handler: (() => void) | null) => {
    unauthorizedHandler = handler
}

export const handleUnauthorized = () => {
    if (unauthorizedHandler) unauthorizedHandler()
}