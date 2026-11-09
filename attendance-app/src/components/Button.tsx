import React, { type ButtonHTMLAttributes } from 'react'
import { cn } from '../utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean,
    variant?: "primary" | "secondary",
    size?: "sm" | "md" | "lg"
}

const variants = {
  primary: "bg-black text-white hover:bg-gray-700",
  secondary: "border border-gray-300 text-gray-800 hover:bg-gray-100",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg",
};

function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className = "",
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button 
      type={type}
      disabled={disabled || loading}
      className={cn(`text-base font-semibold rounded-lg hover:cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]}`, className)}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button