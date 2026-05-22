import { ButtonHTMLAttributes } from "react";

type ButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?:
      | "primary"
      | "danger"
      | "secondary";

    loading?: boolean;
  };

export function Button({
  children,
  variant = "primary",
  className = "",
  loading,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-zinc-900 text-white",

    danger:
      "bg-red-600 text-white",

    secondary:
      "bg-zinc-200 text-zinc-900",
  };

  return (
    <button
      className={`
        px-4
        py-2
        rounded-xl
        transition
        hover:opacity-90
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? "Carregando..." : children}
    </button>
  );
}