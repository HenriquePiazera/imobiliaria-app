import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { Client } from "@/types/client";

const clientsCollection = collection(
  db,
  "clients"
);

export async function createClient(
  client: Omit<Client, "id">
) {
  return await addDoc(
    clientsCollection,
    client
  );
}

export async function getClients() {
  const snapshot = await getDocs(
    clientsCollection
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Client[];
}

export async function updateClient(
  id: string,
  client: Omit<Client, "id">
) {
  const clientDoc = doc(
    db,
    "clients",
    id
  );

  return await updateDoc(
    clientDoc,
    client
  );
}

export async function deleteClient(
  id: string
) {
  const clientDoc = doc(
    db,
    "clients",
    id
  );

  return await deleteDoc(clientDoc);
}