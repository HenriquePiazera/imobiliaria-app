import { ButtonHTMLAttributes } from "react";

type ButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
  };

export function Button({
  children,
  loading,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`
        bg-zinc-900
        hover:bg-zinc-800
        text-white
        px-4
        py-3
        rounded-lg
        transition
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {loading ? "Carregando..." : children}
    </button>
  );
}