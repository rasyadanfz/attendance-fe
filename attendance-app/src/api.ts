import { getAccessToken, handleUnauthorized } from "./tokenStore"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export type LoginBody = {
    email: string
    password: string
}

export type LoginAPIResponse = {
    accessToken: string
}

async function apiFetch(path: string, init: RequestInit = {}) {
    const token = getAccessToken()
    const headers = new Headers(init.headers)

    if (token) headers.set("Authorization", `Bearer ${token}`)

    const res = await fetch(path, { ...init, headers })
    if (res.status === 401 && token) handleUnauthorized()

    return res;
}

export async function login(url: string, { arg }: { arg: LoginBody }): Promise<LoginAPIResponse> {
    const res = await apiFetch(`${BASE_URL}${url}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arg)
    });

    if (!res.ok) {
        const body = await res.json()
        throw new Error(body.message ?? `Login Failed`)
    }

    return res.json()
}

export type AttendanceStatusResponse = {
    status: "NOT_CHECKED_IN" | "CHECKED_IN" | "COMPLETE"
    time?: string
}

export async function getAttendanceStatus(url: string): Promise<AttendanceStatusResponse>  {
    const res = await apiFetch(`${BASE_URL}${url}`, {
        method: 'GET'
    })

    if (!res.ok) {
        const body = await res.json()
        throw new Error(body.message ?? `Failed to fetch attendance status`)
    }

    return res.json()
}

export async function submitAttendance(url: string, { arg } : { arg: FormData }) {
    const res = await apiFetch(`${BASE_URL}${url}`, {
        method: 'POST',
        body: arg
    })

    if (!res.ok) {
        const body = await res.json()
        throw new Error(body.message ?? `Failed to submit attendance`)
    }
}