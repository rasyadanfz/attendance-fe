const BASE_URL = import.meta.env.VITE_API_BASE_URL

export type LoginBody = {
    email: string
    password: string
}

export type LoginAPIResponse = {
    accessToken: string
}

export async function login(url: string, { arg }: { arg: LoginBody }): Promise<LoginAPIResponse> {
    const res = await fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(arg)
    });

    if (!res.ok) {
        const body = await res.json()
        throw new Error(body.message ?? `Login Failed`)
    }

    return res.json()
}