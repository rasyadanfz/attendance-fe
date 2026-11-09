import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { type AttendanceStatus } from "./types";
import FileInput from "./FileInput";
import Button from "../Button";
import { useState } from "react";

interface AttendanceActionProps {
  attendanceStatus: AttendanceStatus;
  isSubmitting: boolean;
  submit: (data: FormData) => Promise<void>;
  error?: Error;
  checkoutTime?: string;
}

interface FormValues {
  fileUpload: FileList | null;
}

function AttendanceAction({
  attendanceStatus,
  submit,
  isSubmitting,
  error,
  checkoutTime,
}: AttendanceActionProps) {
  const [isFileSelected, setIsFileSelected] = useState(false);
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      fileUpload: null,
    },
  });

  const onAttendanceSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    const jsonBody: { action: "check_in" | "check_out" } = {
      action: "check_in",
    };

    if (attendanceStatus === "CHECKED_IN") jsonBody.action = "check_out";
    if (attendanceStatus === "COMPLETE") return;

    if (data.fileUpload && data.fileUpload.length && data.fileUpload[0]) {
      formData.append("photo", data.fileUpload[0]);
    }

    formData.append("action", JSON.stringify(jsonBody));

    await submit(formData);
  };

  return (
    <>
      {attendanceStatus === "NOT_CHECKED_IN" && (
        <form
          onSubmit={handleSubmit(onAttendanceSubmit)}
          className="w-full flex flex-col gap-3"
        >
          <Controller
            name="fileUpload"
            control={control}
            rules={{
              required: true,
              validate: (value) => {
                if (value === null || value.length === 0)
                  return "Photo is required";
              },
            }}
            render={({ field }) => (
              <FileInput
                {...field}
                prompt="Upload a photo as proof"
                setIsFileSelected={setIsFileSelected}
              />
            )}
          />
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
          <Button
            className="disabled:bg-gray-500 md:mt-3"
            type="submit"
            disabled={isSubmitting || !isFileSelected}
          >
            Check in
          </Button>
        </form>
      )}
      {attendanceStatus === "CHECKED_IN" && (
        <form
          onSubmit={handleSubmit(onAttendanceSubmit)}
          className="w-full flex flex-col gap-3"
        >
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
          <Button
            className="disabled:bg-gray-500 md:mt-3"
            type="submit"
            disabled={isSubmitting}
          >
            Check out
          </Button>
        </form>
      )}
      {attendanceStatus === "COMPLETE" && (
        <p className="mt-2 text-center">
          You already checked out
          {checkoutTime && (
            <span className="font-semibold">
              &nbsp;
              {new Intl.DateTimeFormat("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }).format(new Date(checkoutTime))}
            </span>
          )}
        </p>
      )}
    </>
  );
}

export default AttendanceAction;
