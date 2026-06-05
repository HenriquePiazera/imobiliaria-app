import { Property } from "@/types/property";

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
                  {property.district} - {property.city}
                </p>
              </div>

              <p className="font-semibold">
                {property.price.toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  }
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}