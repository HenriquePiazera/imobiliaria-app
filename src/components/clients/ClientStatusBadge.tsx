import { ClientStatus } from "@/types/client";

type ClientStatusBadgeProps = {
  status: ClientStatus;
};

const statusMap = {
  lead: {
    label: "Lead",
    className:
      "bg-blue-100 text-blue-700",
  },

  service: {
    label: "Em atendimento",
    className:
      "bg-yellow-100 text-yellow-700",
  },

  proposal: {
    label: "Proposta enviada",
    className:
      "bg-purple-100 text-purple-700",
  },

  closed: {
    label: "Cliente fechado",
    className:
      "bg-green-100 text-green-700",
  },

  lost: {
    label: "Perdido",
    className:
      "bg-red-100 text-red-700",
  },
};

export function ClientStatusBadge({
  status,
}: ClientStatusBadgeProps) {
  const config =
    statusMap[status];

  return (
    <span
      className={`
        inline-flex
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${config.className}
      `}
    >
      {config.label}
    </span>
  );
}