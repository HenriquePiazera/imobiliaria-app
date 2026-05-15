import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { Property } from "@/types/property";

const propertiesCollection =
  collection(db, "properties");

export async function createProperty(
  property: Omit<Property, "id">
) {
  return await addDoc(
    propertiesCollection,
    property
  );
}

export async function updateProperty(
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

export async function deleteProperty(
  id: string
) {
  const propertyDoc = doc(
    db,
    "properties",
    id
  );

  return await deleteDoc(
    propertyDoc
  );
}

export function subscribeToProperties(
  callback: (
    properties: Property[]
  ) => void
) {
  return onSnapshot(
    propertiesCollection,
    (snapshot) => {
      const properties =
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Property[];

      callback(properties);
    }
  );
}