import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { Property } from "@/types/property";

const propertiesCollection = collection(
  db,
  "properties"
);

export class DashboardRepository {
  async getTotalProperties(): Promise<number> {
    const snapshot = await getDocs(
      propertiesCollection
    );

    return snapshot.size;
  }

  async getRecentProperties(): Promise<
    Property[]
  > {
    const propertiesQuery = query(
      propertiesCollection,
      orderBy("createdAt", "desc"),
      limit(5)
    );

    const snapshot = await getDocs(
      propertiesQuery
    );

    return snapshot.docs.map(
      (document) =>
        ({
          id: document.id,
          ...document.data(),
        }) as Property
    );
  }
}