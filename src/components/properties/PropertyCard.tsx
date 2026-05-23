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
  return (
    <div
      className="
        bg-white
        border
        rounded-2xl
        overflow-hidden
        shadow-sm
      "
    >
      <div
        className="
          h-52
          bg-zinc-200
        "
      >
        {property.imageUrl ? (
          <img
            src={
              property.imageUrl
            }
            alt={property.title}
            className="
              w-full
              h-full
              object-cover
            "
          />
        ) : (
          <div
            className="
              w-full
              h-full
              flex
              items-center
              justify-center
              text-zinc-500
            "
          >
            Sem imagem
          </div>
        )}
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h2
            className="
              text-xl
              font-semibold
            "
          >
            {property.title}
          </h2>

          <p className="text-zinc-500">
            {property.city}
          </p>
        </div>

        <div
          className="
            flex
            flex-wrap
            gap-2
          "
        >
          {property.images?.map(
            (image, index) => (
              <img
                key={index}
                src={image}
                alt="Miniatura"
                className="
                  w-16
                  h-16
                  object-cover
                  rounded-lg
                  border
                "
              />
            )
          )}
        </div>

        <div
          className="
            grid
            grid-cols-2
            gap-3
            text-sm
          "
        >
          <div>
            <strong>
              Tipo:
            </strong>{" "}
            {property.type}
          </div>

          <div>
            <strong>
              Área:
            </strong>{" "}
            {property.area}m²
          </div>

          <div>
            <strong>
              Quartos:
            </strong>{" "}
            {
              property.bedrooms
            }
          </div>

          <div>
            <strong>
              Banheiros:
            </strong>{" "}
            {
              property.bathrooms
            }
          </div>
        </div>

        <div>
          <p
            className="
              text-2xl
              font-bold
            "
          >
            R${" "}
            {property.price.toLocaleString(
              "pt-BR"
            )}
          </p>
        </div>

        <div
          className="
            flex
            gap-3
          "
        >
          <button
            onClick={() =>
              onEdit(property)
            }
            className="
              flex-1
              bg-blue-600
              text-white
              px-4
              py-2
              rounded-lg
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
              text-white
              px-4
              py-2
              rounded-lg
            "
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}