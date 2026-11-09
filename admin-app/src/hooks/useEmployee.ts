import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { getEmployees } from "../api";
import useSWR from "swr";

interface EmployeeListFilters {
    page: number;
    limit: number;
    search: string;
}

function buildQueryString(filter: EmployeeListFilters): string {
    let query = `?page=${filter.page}&limit=${filter.limit}`;
    if (filter.search !== "") query += `&search=${filter.search}`;

    return query;
}

export function useEmployee() {
    const [filters, setFilters] = useState<EmployeeListFilters>({
        page: 1,
        limit: 10,
        search: "",
    });
    const debouncedSearch = useDebounce(filters.search, 200);
    const {
        data: employees,
        isLoading,
        error,
        mutate: refresh,
    } = useSWR(`/employees${buildQueryString({ ...filters, search: debouncedSearch })}`, getEmployees, {
        revalidateOnFocus: false,
    });

    useEffect(() => {
        if (debouncedSearch) refresh();
    }, [debouncedSearch, refresh]);

    return {
        data: { employees: employees?.employees ?? [], totalCount: employees?.total_count ?? 0 },
        isLoading,
        error,
        refresh,
        filters,
        setFilters,
    };
}
