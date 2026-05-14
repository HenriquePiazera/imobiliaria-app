import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
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
    const propertyRef = doc(
      db,
      "properties",
      id
    );
  
    return await updateDoc(
      propertyRef,
      data
    );
  }
  
  export async function deleteProperty(
    id: string
  ) {
    const propertyRef = doc(
      db,
      "properties",
      id
    );
  
    return await deleteDoc(
      propertyRef
    );
  }
  
  export function subscribeToProperties(
    callback: (
      properties: Property[]
    ) => void
  ) {
    const q = query(
      propertiesCollection,
      orderBy("createdAt", "desc")
    );
  
    return onSnapshot(q, (snapshot) => {
      const properties =
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Property[];
  
      callback(properties);
    });
  }