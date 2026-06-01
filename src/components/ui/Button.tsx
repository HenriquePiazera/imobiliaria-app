import {
  ButtonHTMLAttributes,
} from "react";

type ButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
  };

export function Button({
  children,
  loading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={
        disabled || loading
      }
      className={`
        rounded-lg
        bg-zinc-900
        px-4
        py-2
        text-sm
        font-medium
        text-white
        transition-opacity
        hover:opacity-90
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {loading
        ? "Carregando..."
        : children}
    </button>
  );
}