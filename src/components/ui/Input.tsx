import { InputHTMLAttributes } from "react";

type InputProps =
  InputHTMLAttributes<HTMLInputElement>;

export function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={`
        w-full
        border
        border-zinc-300
        p-3
        rounded-lg
        outline-none
        focus:ring-2
        focus:ring-zinc-900
        ${className}
      `}
    />
  );
}