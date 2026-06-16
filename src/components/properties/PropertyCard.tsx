import { Property } from "@/types/property";

type Props = {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
};

export function PropertyCard({ property, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
      <div className="h-52 bg-zinc-200 flex items-center justify-center relative">
        {property.imageUrl ? (
          <img
            src={property.imageUrl}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>Sem imagem</span>
        )}

        <span className="absolute top-3 right-3 bg-white px-2 py-1 text-xs rounded">
          {property.status}
        </span>
      </div>

      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold">{property.title}</h2>

        <p className="text-sm text-zinc-500">
          {property.district}, {property.city}
        </p>

        <p className="text-xl font-bold">
          R$ {property.price.toLocaleString("pt-BR")}
        </p>

        <p className="text-sm line-clamp-3">{property.description}</p>

        <div className="flex gap-2 pt-3">
          <button
            onClick={() => onEdit(property)}
            className="flex-1 bg-blue-600 text-white py-2 rounded"
          >
            Editar
          </button>

          <button
            onClick={() => onDelete(property.id)}
            className="flex-1 bg-red-600 text-white py-2 rounded"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}