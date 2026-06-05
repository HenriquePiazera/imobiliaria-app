import { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
}

export function PropertyCard({
  property,
  onEdit,
  onDelete,
}: PropertyCardProps) {
  function getStatusStyles() {
    switch (property.status) {
      case "Disponível":
        return "bg-green-100 text-green-700 border-green-200";
      case "Vendido":
        return "bg-red-100 text-red-700 border-red-200";
      case "Alugado":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-zinc-100 text-zinc-700 border-zinc-200";
    }
  }

  return (
    <div className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">

      {/* IMAGE */}
      <div className="relative h-52 bg-zinc-100">

        {property.imageUrl ? (
          <img
            src={property.imageUrl}
            className="w-full h-full object-cover"
            alt={property.title}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400">
            <span className="text-3xl">🏠</span>
            <span className="text-sm mt-1">Sem imagem</span>
          </div>
        )}

        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs border ${getStatusStyles()}`}
        >
          {property.status}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3">
        <h2 className="text-lg font-semibold">{property.title}</h2>

        <p className="text-sm text-zinc-500">
          {property.district}, {property.city}
        </p>

        <div className="text-xl font-bold">
          R$ {property.price.toLocaleString("pt-BR")}
        </div>

        <p className="text-sm text-zinc-600 line-clamp-3">
          {property.description}
        </p>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onEdit(property)}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
          >
            Editar
          </button>

          <button
            onClick={() => onDelete(property.id)}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}