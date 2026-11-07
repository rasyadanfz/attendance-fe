import Badge from "../Badge"
import type { AttendanceStatus } from "./types"

const statusLabel: Record<AttendanceStatus, string> = {
  NotClockedIn: "Not checked in",
  ClockedIn: "Open",
  ClockedOut: "Complete"
}

const variantMap = {
  NotClockedIn: "danger",
  ClockedIn: "warning",
  ClockedOut: "success"
} as const

function AttendanceStatusBadge({status = "NotClockedIn"}: {status: AttendanceStatus}) {
  return (
    <Badge variant={variantMap[status] }>
      {statusLabel[status]}
    </Badge>
  )
}

export default AttendanceStatusBadge