import useSWR from "swr"
import AttendanceAction from "./AttendanceAction"
import StatusCard from "./StatusCard"
import { getAttendanceStatus, submitAttendance } from "../../api"
import useSWRMutation from "swr/mutation"
import { IoExitOutline } from "react-icons/io5"
import { useAuth } from "../../hooks/useAuth"

function AttendancePage() {
  const { clearAccessToken } = useAuth()
  const { data, error, isLoading, mutate: refetchStatus } = useSWR('/attendance/today', getAttendanceStatus, {
    revalidateOnFocus: false,
  })
  const { trigger, isMutating, error: submitError } = useSWRMutation('/attendance', submitAttendance, {
    throwOnError: false,
    onSuccess: () => refetchStatus()
  })
  return (
    <div className="flex grow flex-col justify-center gap-2 items-center max-w-200 mx-2">
      <button
        type="button"
        className="flex gap-3 items-center self-end border rounded-lg px-2 py-1 hover:bg-gray-50 hover:cursor-pointer hover:text-red-500 hover:font-medium"
        onClick={clearAccessToken}
      >
          <IoExitOutline />
          <p>Logout</p>
      </button>
      <div className="flex flex-col gap-5 self-stretch border rounded-lg p-4 py-8">
        <StatusCard status={data?.status} isFetching={isLoading} error={error} time={data?.time}/>
        {data && data.status && 
          <AttendanceAction 
            attendanceStatus={data?.status}
            submit={(data: FormData) => trigger(data)}
            isSubmitting={isMutating}
            error={submitError}
            checkoutTime={data.time}
          />}
      </div>
    </div>
  )
}

export default AttendancePage