import useSWR from "swr";
import { getAttendance } from "../api";
import { useMemo } from "react";

interface AttendanceFilter {
    page: number;
    limit: number;
    from?: string;
    to?: string;
    employeeIds?: number[];
}

function buildQueryString(filter: AttendanceFilter): string {
    let query = `?page=${filter.page}&limit=${filter.limit}`;

    if (filter.from) query += `&from=${filter.from}`;
    if (filter.to) query += `&to=${filter.to}`;

    let idString = "";
    if (filter.employeeIds && filter.employeeIds.length) {
        filter.employeeIds?.forEach((id, index) => {
            if (index !== 0) idString += ",";
            idString += id;
        });
        query += `&employeeIds=${idString}`;
    }

    return query;
}

export function useAttendance(employeeIds: number[], from?: string, to?: string) {
    const filters: AttendanceFilter = useMemo(
        () => ({
            page: 1,
            limit: employeeIds.length,
            from,
            to,
            employeeIds,
        }),
        [employeeIds, from, to],
    );

    const {
        data: attendance,
        isLoading,
        error,
    } = useSWR(
        () => (filters.employeeIds?.length ? `/attendance${buildQueryString(filters)}` : null),
        getAttendance,
        {
            refreshInterval: 30 * 1000,
        },
    );

    return { attendance, isLoading, error };
}
