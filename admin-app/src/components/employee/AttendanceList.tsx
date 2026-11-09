import Table, { type TableColumn } from "../Table";
import { FaEye, FaSearch } from "react-icons/fa";
import { useEmployee } from "../../hooks/useEmployee";
import { useAttendance } from "../../hooks/useAttendance";
import AttendanceStatusBadge from "../AttendanceStatusBadge";
import Pagination from "../Pagination";
import { useState } from "react";
import ProofModal from "./ProofModal";

type AttendanceTableRow = {
    employeeId: number;
    full_name: string;
    position: string;
    department: string;
    attendanceId?: number;
    attendanceDate?: string;
    attendanceOccuredAt?: string;
    attendanceAction?: "check_in" | "check_out";
    attendancePhotoFilename?: string | null;
    attendancePhotoHolderId?: number;
};

type AttendanceTableData = {
    data: AttendanceTableRow[];
};

function AttendanceList() {
    const now = new Date();
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];
    const [selectedDate, setSelectedDate] = useState(localDate);

    const [proofId, setProofId] = useState<number | null>(null);
    const { data, isLoading, error, filters, setFilters } = useEmployee();
    const { attendance } = useAttendance(
        data.employees.map((e) => e.id),
        selectedDate,
        selectedDate,
    );

    const tableData: AttendanceTableData = { data: [] };
    for (const e of data.employees) {
        const employeeRowData: AttendanceTableRow = {
            employeeId: e.id,
            full_name: e.full_name,
            position: e.position,
            department: e.department,
        };
        const attendanceData = attendance?.attendances.find((a) => a.employeeId === e.id);
        if (attendanceData) {
            employeeRowData.attendanceId = attendanceData.id;
            employeeRowData.attendanceDate = attendanceData.date;
            employeeRowData.attendanceAction = attendanceData.action;
            employeeRowData.attendanceOccuredAt = attendanceData.occuredAt;
            employeeRowData.attendancePhotoFilename = attendanceData.photoFilename;
            employeeRowData.attendancePhotoHolderId = attendanceData.attendancePhotoHolderId;
        }
        tableData.data.push(employeeRowData);
    }

    const columns: TableColumn<AttendanceTableRow>[] = [
        {
            header: "Employee",
            key: "employee",
            cell: (d) => (
                <div>
                    <p className="font-semibold text-sm">{d.full_name}</p>
                </div>
            ),
        },
        { header: "Position", key: "position", cell: (d) => d.position },
        { header: "Department", key: "department", cell: (d) => d.department },
        {
            header: "Attendance",
            key: "attendance",
            cell: (d) => {
                if (d.attendanceAction === "check_in")
                    return <AttendanceStatusBadge status="CHECKED_IN" />;
                if (d.attendanceAction === "check_out")
                    return <AttendanceStatusBadge status="COMPLETE" />;
                if (!d.attendanceAction) return <AttendanceStatusBadge status="NOT_CHECKED_IN" />;
            },
        },
        {
            header: "Time",
            key: "time",
            cell: (d) => {
                return d.attendanceOccuredAt ? (
                    <p>{new Date(d.attendanceOccuredAt).toLocaleTimeString("id-ID")} WIB</p>
                ) : (
                    <p></p>
                );
            },
        },
        {
            header: "Proof",
            key: "proof",
            cell: (d) => {
                if (d.attendancePhotoFilename && d.attendancePhotoHolderId)
                    return (
                        <button
                            className="w-full cursor-pointer"
                            onClick={() => setProofId(d.attendancePhotoHolderId ?? null)}
                        >
                            <FaEye size={20} />
                        </button>
                    );
            },
        },
    ];
    return (
        <div>
            <h1 className="font-bold text-2xl mb-6">Employee Attendance</h1>
            <div className="flex mb-3 md:mb-6 gap-6">
                <div className="flex grow max-w-80 md:max-w-140 gap-2 items-center bg-white border border-gray-300 p-2 rounded-lg">
                    <FaSearch className="text-gray-400" />
                    <input
                        type="text"
                        className="text-base w-full focus:outline-none placeholder:text-sm"
                        placeholder="Search employee by name"
                        onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                    />
                </div>
                <input
                    type="date"
                    value={selectedDate}
                    max={localDate}
                    onChange={(e) => e.target.value && setSelectedDate(e.target.value)}
                    className="bg-white border border-gray-300 p-2 rounded-lg text-sm"
                />
            </div>
            <Table
                data={tableData.data}
                isLoading={isLoading}
                columns={columns}
                keyExtractor={(e) => e.employeeId}
                emptyMessage={error ? error.message : undefined}
            />
            <Pagination
                currentPage={filters.page}
                limit={filters.limit}
                totalCount={data.totalCount}
                entityName="employees"
                onPrevClick={() => setFilters((prev) => ({ ...prev, page: Math.max(0, prev.page - 1) }))}
                onNextClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
            />
            {proofId && <ProofModal id={proofId} onClose={() => setProofId(null)} />}
        </div>
    );
}

export default AttendanceList;
