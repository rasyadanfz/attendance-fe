import { getAccessToken, handleUnauthorized } from "./tokenStore";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type LoginBody = {
    email: string;
    password: string;
};

export type LoginAPIResponse = {
    accessToken: string;
};

async function apiFetch(path: string, init: RequestInit = {}) {
    const token = getAccessToken();
    const headers = new Headers(init.headers);

    if (token) headers.set("Authorization", `Bearer ${token}`);

    const res = await fetch(path, { ...init, headers });
    if (res.status === 401 && token) handleUnauthorized();

    return res;
}

export async function login(url: string, { arg }: { arg: LoginBody }): Promise<LoginAPIResponse> {
    const res = await apiFetch(`${BASE_URL}${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arg),
    });

    if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message ?? `Login Failed`);
    }

    return res.json();
}

export type EmployeeData = {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    position: string;
    department: string;
    status: "active" | "inactive";
    password: string;
};

export type GetEmployeeListResponse = {
    employees: EmployeeData[];
    total_count: number;
};

export async function getEmployees(url: string): Promise<GetEmployeeListResponse> {
    const res = await apiFetch(`${BASE_URL}${url}`, {
        method: "GET",
    });

    if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message ?? `Failed to fetch employee data`);
    }

    return res.json();
}

export type AddEmployeeBody = {
    full_name: string;
    email: string;
    position: string;
    department: string;
    status: "active" | "inactive";
    phone_number?: string;
    password: string;
};

export type AddEmployeeResponse = {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    position: string;
    department: string;
    status: "active" | "inactive";
    created_at: string;
};

export async function addEmployee(
    url: string,
    { arg }: { arg: AddEmployeeBody },
): Promise<AddEmployeeResponse> {
    const res = await apiFetch(`${BASE_URL}${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arg),
    });

    if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message ?? `Failed to create new employee`);
    }

    return res.json();
}

export type EditEmployeeBody = {
    fullName?: string;
    email?: string;
    position?: string;
    department?: string;
    status?: "active" | "inactive";
    phoneNumber?: string;
    password?: string;
};

export type EditEmployeeResponse = {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    position: string;
    department: string;
    status: "active" | "inactive";
    updated_at: string;
};

export async function editEmployee(
    url: string,
    { arg }: { arg: EditEmployeeBody },
): Promise<EditEmployeeResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...body } = arg;
    const res = await apiFetch(`${BASE_URL}${url}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message ?? `Failed to update employee`);
    }

    return res.json();
}

export type Attendance = {
    id: number;
    employeeId: number;
    date: string;
    action: "check_in" | "check_out";
    occuredAt: string;
    photoFilename: string | null;
    createdAt: string;
    attendancePhotoHolderId: number;
};

export type AttendanceResponse = {
    attendances: Attendance[];
    count: number;
};

export async function getAttendance(url: string): Promise<AttendanceResponse> {
    const res = await apiFetch(`${BASE_URL}${url}`, {
        method: "GET",
    });

    if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message ?? `Failed to fetch attendance data`);
    }

    return res.json();
}

export async function getPhoto(url: string) {
    const controller = new AbortController();
    const res = await apiFetch(`${BASE_URL}${url}`, {
        method: "GET",
        signal: controller.signal,
    });

    if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message ?? `Failed to fetch photo`);
    }

    return res.blob();
}
