import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
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

export function subscribeToClients(
  callback: (clients: Client[]) => void
) {
  return onSnapshot(
    clientsCollection,
    (snapshot) => {
      const clients = snapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      ) as Client[];

      callback(clients);
    }
  );
}