import { ClientStatus } from "@/types/client";

interface ClientStatusBadgeProps {
  status: ClientStatus;
}

const statusMap: Record<
  ClientStatus,
  {
    label: string;
    className: string;
  }
> = {
  lead: {
    label: "Lead",

    className:
      "bg-blue-100 text-blue-700",
  },

  client: {
    label: "Cliente",

    className:
      "bg-green-100 text-green-700",
  },

  inactive: {
    label: "Inativo",

    className:
      "bg-zinc-200 text-zinc-700",
  },
};

export function ClientStatusBadge({
  status,
}: ClientStatusBadgeProps) {
  const currentStatus =
    statusMap[status];

  return (
    <span
      className={`
        inline-flex items-center
        rounded-full px-3 py-1
        text-xs font-medium
        ${currentStatus.className}
      `}
    >
      {currentStatus.label}
    </span>
  );
}