import { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;

  onEdit: (
    property: Property
  ) => void;

  onDelete: (
    id: string
  ) => void;
}

export function PropertyCard({
  property,
  onEdit,
  onDelete,
}: PropertyCardProps) {
  function getStatusStyles() {
    switch (property.status) {
      case "Disponível":
        return `
          bg-green-100
          text-green-700
          border-green-200
        `;

      case "Vendido":
        return `
          bg-red-100
          text-red-700
          border-red-200
        `;

      case "Alugado":
        return `
          bg-yellow-100
          text-yellow-700
          border-yellow-200
        `;

      default:
        return `
          bg-zinc-100
          text-zinc-700
          border-zinc-200
        `;
    }
  }

  return (
    <div
      className="
        bg-white
        border
        rounded-2xl
        overflow-hidden
        shadow-sm
        hover:shadow-md
        transition-shadow
      "
    >
      <div
        className="
          relative
          h-52
          bg-gradient-to-br
          from-zinc-200
          to-zinc-300
          flex
          items-center
          justify-center
        "
      >
        <span
          className="
            text-zinc-600
            font-medium
          "
        >
          Imóvel
        </span>

        <div
          className={`
            absolute
            top-4
            right-4
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
            border
            ${getStatusStyles()}
          `}
        >
          {property.status}
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="space-y-1">
          <h2
            className="
              text-xl
              font-semibold
              text-zinc-800
            "
          >
            {property.title}
          </h2>

          <p className="text-zinc-500">
            {property.district},{" "}
            {property.city}
          </p>
        </div>

        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              text-sm
              text-zinc-500
            "
          >
            {property.type}
          </span>

          <span
            className="
              text-sm
              font-medium
              text-zinc-700
            "
          >
            {property.purpose}
          </span>
        </div>

        <div>
          <p
            className="
              text-2xl
              font-bold
              text-zinc-900
            "
          >
            R${" "}
            {property.price.toLocaleString(
              "pt-BR"
            )}
          </p>
        </div>

        <p
          className="
            text-sm
            text-zinc-600
            line-clamp-3
          "
        >
          {property.description}
        </p>

        <div
          className="
            flex
            gap-3
            pt-2
          "
        >
          <button
            onClick={() =>
              onEdit(property)
            }
            className="
              flex-1
              bg-blue-600
              hover:bg-blue-700
              transition-colors
              text-white
              px-4
              py-2
              rounded-lg
              font-medium
            "
          >
            Editar
          </button>

          <button
            onClick={() =>
              onDelete(
                property.id
              )
            }
            className="
              flex-1
              bg-red-600
              hover:bg-red-700
              transition-colors
              text-white
              px-4
              py-2
              rounded-lg
              font-medium
            "
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}