import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { Property } from "@/types/property";

export class DashboardRepository {
  async getTotalProperties(): Promise<number> {
    const snapshot = await getDocs(
      collection(db, "properties")
    );

    return snapshot.size;
  }

  async getRecentProperties(): Promise<Property[]> {
    const q = query(
      collection(db, "properties"),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Property[];
  }
}