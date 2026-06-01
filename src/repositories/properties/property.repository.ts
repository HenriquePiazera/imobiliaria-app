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

const propertiesCollection =
  collection(db, "properties");

export class PropertyRepository {
  async getProperties(): Promise<
    Property[]
  > {
    const snapshot = await getDocs(
      propertiesCollection
    );

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Property[];
  }

  async createProperty(
    data: Omit<Property, "id">
  ) {
    return await addDoc(
      propertiesCollection,
      data
    );
  }

  async updateProperty(
    id: string,
    data: Partial<Property>
  ) {
    const propertyDoc = doc(
      db,
      "properties",
      id
    );

    return await updateDoc(
      propertyDoc,
      data
    );
  }

  async deleteProperty(id: string) {
    const propertyDoc = doc(
      db,
      "properties",
      id
    );

    return await deleteDoc(propertyDoc);
  }
}