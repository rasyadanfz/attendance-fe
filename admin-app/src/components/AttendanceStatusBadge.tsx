import Badge from "./Badge";

type AttendanceStatus = "NOT_CHECKED_IN" | "CHECKED_IN" | "COMPLETE";

const statusLabel: Record<AttendanceStatus, string> = {
    NOT_CHECKED_IN: "Not checked in",
    CHECKED_IN: "Open",
    COMPLETE: "Complete",
};

const variantMap = {
    NOT_CHECKED_IN: "danger",
    CHECKED_IN: "warning",
    COMPLETE: "success",
} as const;

function AttendanceStatusBadge({ status = "NOT_CHECKED_IN" }: { status: AttendanceStatus }) {
    return <Badge variant={variantMap[status]}>{statusLabel[status]}</Badge>;
}

export default AttendanceStatusBadge;
