import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

export function Card({
  children,
}: CardProps) {
  return (
    <div
      className="
        bg-white
        border
        rounded-2xl
        p-5
        shadow-sm
      "
    >
      {children}
    </div>
  );
}