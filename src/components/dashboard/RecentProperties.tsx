import { Property }from "@/domain/properties/property.types";

import { Card } from "@/components/ui/Card";

type RecentPropertiesProps = {
  properties: Property[];
};

export function RecentProperties({
  properties,
}: RecentPropertiesProps) {
  return (
    <Card>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">
          Imóveis recentes
        </h2>

        <div className="space-y-3">
          {properties.map((property) => (
            <div
              key={property.id}
              className="
                flex
                items-center
                justify-between
                border-b
                pb-2
              "
            >
              <div>
                <p className="font-medium">
                  {property.title}
                </p>

                <p className="text-sm text-zinc-500">
                  {property.location}
                </p>
              </div>

              <p className="font-semibold">
                R$ {property.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}