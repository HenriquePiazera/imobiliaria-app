import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
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

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  })) as Client[];
}

export async function deleteClient(
  id: string
) {
  const clientDoc = doc(
    db,
    "clients",
    id
  );

  await deleteDoc(clientDoc);
}