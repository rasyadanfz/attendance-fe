import type { UseFormRegister, RegisterOptions } from "react-hook-form";
import type { FormValues } from "./FormInput";

export function FormSelect({
  register,
  label,
  id,
  formKey,
  options,
  error,
  registerOptions,
}: {
  register: UseFormRegister<FormValues>;
  label: string;
  id: string;
  formKey: keyof FormValues;
  options: { value: string; label: string }[];
  error?: string;
  registerOptions?: RegisterOptions<FormValues, keyof FormValues>;
}) {
  return (
    <div className="flex flex-col gap-1 min-w-65">
      <label htmlFor={id} className="text-sm ml-px">
        {label}
      </label>
      <select
        id={id}
        className="p-2 text-sm border border-gray-300 rounded-md bg-white"
        {...register(formKey, registerOptions)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
