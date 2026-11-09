import type { HTMLInputTypeAttribute } from "react";
import type { UseFormRegister, RegisterOptions } from "react-hook-form";

export type FormValues = {
    full_name: string;
    email: string;
    position: string;
    department: string;
    status: "active" | "inactive";
    phone_number?: string;
    password: string;
};

export function FormInput({
    register,
    label,
    disabled,
    id,
    formKey,
    placeholder,
    type,
    error,
    registerOptions,
}: {
    register: UseFormRegister<FormValues>;
    label: string;
    disabled?: boolean;
    id: string;
    formKey: keyof FormValues;
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
    error?: string;
    registerOptions?: RegisterOptions<FormValues, keyof FormValues>;
}) {
    return (
        <div className="flex flex-col gap-1 min-w-65">
            <label htmlFor={id} className="text-sm ml-px">
                {label}
            </label>
            <input
                disabled={disabled ?? false}
                type={type ?? "text"}
                id={id}
                className="p-2 text-sm border border-gray-300 rounded-md"
                placeholder={placeholder}
                {...register(formKey, registerOptions)}
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
    );
}
