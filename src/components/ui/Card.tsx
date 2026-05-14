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
        rounded-xl
        shadow
        p-6
      "
    >
      {children}
    </div>
  );
}