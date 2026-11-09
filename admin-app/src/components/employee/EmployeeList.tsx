import useSWR from "swr";
import Table, { type TableColumn } from "../Table";
import { useEffect, useRef, useState } from "react";
import { addEmployee, editEmployee, getEmployees, type EmployeeData } from "../../api";
import { BsPencilSquare } from "react-icons/bs";
import { useDebounce } from "../../hooks/useDebounce";
import { FaPlus, FaSearch } from "react-icons/fa";
import Button from "../Button";
import Pagination from "../Pagination";
import ModifyEmployee from "./ModifyEmployee";
import useSWRMutation from "swr/mutation";

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

function EmployeeList() {
    const [filters, setFilters] = useState<EmployeeListFilters>({
        page: 1,
        limit: 10,
        search: "",
    });
    const [employeeEditData, setEmployeeEditData] = useState<EmployeeData | null>(null);
    const debouncedSearch = useDebounce(filters.search, 200);
    const { data, isLoading, error, mutate } = useSWR(
        `/employees${buildQueryString({ ...filters, search: debouncedSearch })}`,
        getEmployees,
        {
            revalidateOnFocus: false,
        },
    );
    const {
        trigger: create,
        error: createError,
        isMutating: isCreating,
    } = useSWRMutation("/employees", addEmployee, {
        onSuccess: () => mutate(),
        throwOnError: false,
    });

    const {
        trigger: update,
        error: updateError,
        isMutating: isUpdating,
    } = useSWRMutation(
        () => (employeeEditData ? `/employees/${employeeEditData.id}` : null),
        editEmployee,
        {
            onSuccess: () => mutate(),
            throwOnError: false,
        },
    );
    const addEmployeeModal = useRef<HTMLDialogElement>(null);
    const editEmployeeModal = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (debouncedSearch) mutate();
    }, [debouncedSearch, mutate]);

    useEffect(() => {
        if (employeeEditData && !editEmployeeModal.current?.open) {
            editEmployeeModal.current?.showModal();
        }
    }, [employeeEditData]);

    const employeeColumns: TableColumn<EmployeeData>[] = [
        {
            header: "Employee",
            key: "employee",
            cell: (e) => (
                <div>
                    <p className="font-semibold text-sm">{e.full_name}</p>
                    <p className="font-normal text-xs">{e.email}</p>
                </div>
            ),
        },
        { header: "Position", key: "position", cell: (e) => e.position },
        { header: "Department", key: "department", cell: (e) => e.department },
        { header: "Phone Number", key: "phone_number", cell: (e) => e.phone_number },
        {
            header: "Action",
            key: "action",
            cell: (employeeData) => (
                <button
                    type="button"
                    onClick={() => {
                        setEmployeeEditData(employeeData);
                    }}
                    className="flex gap-3 items-center border rounded-md p-2 hover:cursor-pointer hover:bg-gray-200"
                >
                    <BsPencilSquare size={20} />
                </button>
            ),
        },
    ];
    return (
        <div>
            <h1 className="font-bold text-2xl mb-6">Data Karyawan</h1>
            <div className="flex justify-between mb-3 md:mb-6 gap-3">
                <div className="flex grow max-w-80 md:max-w-140 gap-2 items-center bg-white border border-gray-300 p-2 rounded-lg">
                    <FaSearch className="text-gray-400" />
                    <input
                        type="text"
                        className="text-base w-full focus:outline-none placeholder:text-sm"
                        placeholder="Search employee by name"
                        onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                    />
                </div>
                <Button
                    className="flex gap-2 items-center"
                    size="sm"
                    onClick={() => addEmployeeModal.current?.showModal()}
                >
                    <FaPlus size={12} />
                    <p className="font-semibold text-2xs">Add New Employee</p>
                </Button>
            </div>
            <Table
                data={data?.employees ?? []}
                isLoading={isLoading}
                columns={employeeColumns}
                keyExtractor={(e) => e.id}
                emptyMessage={error ? error.message : undefined}
            />
            <Pagination
                currentPage={filters.page}
                limit={filters.limit}
                totalCount={data?.total_count ?? 0}
                entityName="employees"
                onPrevClick={() => setFilters((prev) => ({ ...prev, page: Math.max(0, prev.page - 1) }))}
                onNextClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
            />
            <ModifyEmployee
                action="add"
                ref={addEmployeeModal}
                onFormSubmit={async (data) => {
                    await create(data);
                }}
                error={createError}
                isModifying={isCreating}
            />
            {employeeEditData && (
                <ModifyEmployee
                    action="edit"
                    ref={editEmployeeModal}
                    employee={employeeEditData}
                    onFormSubmit={async (data) => {
                        if (!employeeEditData) return;
                        await update(data);
                    }}
                    error={updateError}
                    isModifying={isUpdating}
                    onClose={() => setEmployeeEditData(null)}
                />
            )}
        </div>
    );
}

export default EmployeeList;
