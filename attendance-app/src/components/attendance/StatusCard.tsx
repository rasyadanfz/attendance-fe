import { BiLoaderCircle } from "react-icons/bi";
import AttendanceStatusBadge from "./AttendanceStatusBadge";
import type { AttendanceStatus } from "./types";
import { useEffect, useState } from "react";

type StatusCardProps = {
    status?: AttendanceStatus;
    time?: string;
    isFetching: boolean;
    error?: Error;
};

function formatDate(date: Date): string {
    return new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).format(date);
}

function StatusCard({ status, time, isFetching, error }: StatusCardProps) {
    const [date, setDate] = useState(new Date());
    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    useEffect(() => {
        const interval = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col gap-1 items-center">
            {isFetching && <BiLoaderCircle className="animate-spin" />}
            {!isFetching && (
                <>
                    <p>{new Intl.DateTimeFormat("id-ID", dateOptions).format(date)}</p>
                    <p className="text-4xl font-semibold mb-2">
                        {date.getHours().toLocaleString("id-ID").padStart(2, "0")}:
                        {date.getMinutes().toLocaleString("id-ID").padStart(2, "0")}
                    </p>
                    {!error && status && <AttendanceStatusBadge status={status} />}
                    {status === "CHECKED_IN" && time && (
                        <p className="mt-2">You checked in at {formatDate(new Date(time))} WIB</p>
                    )}
                    {error && <p className="text-sm text-red-500">{error.message}</p>}
                </>
            )}
        </div>
    );
}

export default StatusCard;
