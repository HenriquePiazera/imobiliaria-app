import { PropertyCard }
from "./PropertyCard";

import { Property }
from "@/domain/properties/property.types";

type PropertyListProps = {
  properties: Property[];

  onEdit: (
    property: Property
  ) => void;

  onDelete: (
    id: string
  ) => void;
};

export function PropertyList({
  properties,
  onEdit,
  onDelete,
}: PropertyListProps) {
  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      "
    >
      {properties.map(
        (property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )
      )}
    </div>
  );
}