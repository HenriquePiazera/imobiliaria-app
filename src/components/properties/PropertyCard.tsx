import { Property } from "@/types/property";

type Props = {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
};

export function PropertyCard({
  property,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="relative flex h-52 items-center justify-center bg-zinc-200">
        {property.imageUrl ? (
          <img
            src={property.imageUrl}
            alt={property.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>Sem imagem</span>
        )}

        <span className="absolute top-3 right-3 rounded bg-white px-2 py-1 text-xs shadow">
          {property.status}
        </span>
      </div>

      <div className="space-y-2 p-4">
        <h2 className="text-lg font-semibold">
          {property.title}
        </h2>

        <p className="text-sm text-zinc-500">
          {property.district}, {property.city}
        </p>

        <p className="text-xl font-bold">
          R$ {property.price.toLocaleString("pt-BR")}
        </p>

        <p className="line-clamp-3 text-sm">
          {property.description}
        </p>

        <div className="flex gap-2 pt-3">
          <button
            onClick={() => onEdit(property)}
            className="flex-1 rounded bg-blue-600 py-2 text-white"
          >
            Editar
          </button>

          <button
            onClick={() => onDelete(property.id)}
            className="flex-1 rounded bg-red-600 py-2 text-white"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}