import { type RefObject } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../Button";
import { type EmployeeData } from "../../api";
import { FormInput, type FormValues } from "./FormInput";
import { FormSelect } from "./FormSelect";

interface ModifyEmployeeProps {
    action: "add" | "edit";
    ref: RefObject<HTMLDialogElement | null>;
    onFormSubmit: (data: FormValues) => Promise<unknown>;
    error: Error;
    isModifying: boolean;
    employee?: EmployeeData | null;
    onClose?: () => void;
}

const EMPTY_FORM: FormValues = {
    full_name: "",
    email: "",
    position: "",
    department: "",
    phone_number: "",
    password: "",
    status: "active",
};

function ModifyEmployee({
    action,
    ref,
    onFormSubmit,
    error,
    isModifying,
    employee,
    onClose,
}: ModifyEmployeeProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<FormValues>({
        defaultValues: EMPTY_FORM,
        values: employee ?? EMPTY_FORM,
    });
    const email = watch("email");

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await onFormSubmit({
            full_name: data.full_name,
            email: data.email,
            phone_number: data.phone_number,
            position: data.position,
            department: data.department,
            status: data.status,
            password: data.password,
        });
        reset(EMPTY_FORM);
        ref.current?.close();
    };

    return (
        <dialog
            className="absolute inset-0 place-self-center z-5 rounded-lg bg-white backdrop-[rgba(0,0,0,0.7)] backdrop-blur-lg p-4"
            ref={ref}
            closedby="any"
            onClose={() => {
                reset();
                onClose?.();
            }}
        >
            <h1 className="text-xl font-bold">
                {action === "add" ? "Add New Employee" : "Change Employee Data"}
            </h1>
            <form
                className="mt-3"
                onSubmit={async (e) => {
                    await handleSubmit(onSubmit)(e);
                }}
            >
                <div>
                    <h2 className="flex font-semibold text-base mb-3">Employee Data</h2>
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-5 items-center">
                            <FormInput
                                register={register}
                                label="Full Name"
                                id="fullName"
                                formKey="full_name"
                                placeholder="ex: John Doe"
                                type="text"
                                error={errors.full_name?.message}
                                registerOptions={{ required: "Full name is required" }}
                            />
                            <FormInput
                                register={register}
                                label="Email"
                                id="email1"
                                formKey="email"
                                placeholder="ex: user@company.com"
                                type="email"
                                error={errors.email?.message}
                                registerOptions={{ required: "Email is required" }}
                            />
                        </div>
                        <div className="flex gap-5 items-center">
                            <FormInput
                                register={register}
                                label="Position"
                                id="position"
                                formKey="position"
                                placeholder="ex: Software Engineer"
                                type="text"
                                error={errors.position?.message}
                                registerOptions={{ required: "Position is required" }}
                            />
                            <FormInput
                                register={register}
                                label="Department"
                                id="department"
                                formKey="department"
                                placeholder="ex: IT"
                                type="text"
                                error={errors.department?.message}
                                registerOptions={{ required: "Department is required" }}
                            />
                        </div>
                        <div className="flex gap-5 items-center">
                            <FormInput
                                register={register}
                                label="Phone Number"
                                id="phoneNumber"
                                formKey="phone_number"
                                placeholder="ex: 081234567891"
                                type="text"
                                error={errors.phone_number?.message}
                            />
                            <FormSelect
                                register={register}
                                label="Status"
                                id="status"
                                formKey="status"
                                options={[
                                    { value: "active", label: "Active" },
                                    { value: "inactive", label: "Inactive" },
                                ]}
                                error={errors.status?.message}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <h2 className="flex font-semibold text-base mb-3">Login Account</h2>
                    <div className="flex gap-5 items-center">
                        <div className="flex flex-col gap-1 min-w-65">
                            <p className="text-sm ml-px">Email</p>
                            <div
                                className={`p-2 text-sm border ${!email ? "text-gray-600" : ""} border-gray-300 rounded-md`}
                            >
                                {email || "Fill in the email above"}
                            </div>
                        </div>
                        {action === "add" && (
                            <FormInput
                                register={register}
                                label="Password"
                                id="password"
                                formKey="password"
                                placeholder="ex: password"
                                type="text"
                                error={errors.password?.message}
                                registerOptions={{
                                    required: action === "add" ? "Password is required" : false,
                                    minLength: {
                                        value: 7,
                                        message: "Password must be at least 7 characters",
                                    },
                                }}
                            />
                        )}
                    </div>
                </div>
                {error && error.message && (
                    <span className="px-2 py-1 bg-red-400 text-xs text-white">{error.message}</span>
                )}
                <div className="flex gap-4 justify-end mt-4">
                    <Button
                        type="button"
                        disabled={isModifying}
                        className="bg-white text-black border"
                        onClick={() => ref.current?.close()}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isModifying}>
                        Submit
                    </Button>
                </div>
            </form>
        </dialog>
    );
}

export default ModifyEmployee;
