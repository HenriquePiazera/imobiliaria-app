import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Property } from "@/types/property";

const propertiesCollection = collection(db, "properties");

export class PropertyRepository {
  async getProperties(): Promise<Property[]> {
    const snapshot = await getDocs(propertiesCollection);

    return snapshot.docs.map((doc) => ({
      ...(doc.data() as Omit<Property, "id">),
      id: doc.id,
    }));
  }

  async createProperty(data: Omit<Property, "id">) {
    return addDoc(propertiesCollection, data);
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