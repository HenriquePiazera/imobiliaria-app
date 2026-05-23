export interface Property {
  id: string;

  title: string;

  type: string;

  city: string;

  price: number;

  area: number;

  bedrooms: number;

  bathrooms: number;

  status:
    | "available"
    | "rented"
    | "reserved"
    | "inactive";

  imageUrl?: string;

  images?: string[];

  createdAt: string;
}