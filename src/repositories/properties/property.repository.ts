import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  Unsubscribe,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { mapDoc } from "@/lib/map-doc";
import { Property } from "@/types/property";

export class PropertyRepository {
  constructor(private readonly ownerId: string) {}

  private get collectionRef() {
    return collection(db, "properties");
  }

  private get ownerQuery() {
    return query(
      this.collectionRef,
      where("ownerId", "==", this.ownerId)
    );
  }

  subscribe(callback: (properties: Property[]) => void): Unsubscribe {
    return onSnapshot(this.ownerQuery, (snapshot) => {
      callback(snapshot.docs.map((document) => mapDoc<Property>(document)));
    });
  }

  async getProperties(): Promise<Property[]> {
    const snapshot = await getDocs(this.ownerQuery);

    return snapshot.docs.map((document) => mapDoc<Property>(document));
  }

  async createProperty(data: Omit<Property, "id">) {
    return addDoc(this.collectionRef, {
      ...data,
      ownerId: this.ownerId,
    });
  }

  async updateProperty(id: string, data: Partial<Property>) {
    const ref = doc(db, "properties", id);
    return updateDoc(ref, data);
  }

  async deleteProperty(id: string) {
    const ref = doc(db, "properties", id);
    return deleteDoc(ref);
  }
}
