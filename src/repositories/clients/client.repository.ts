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

export class ClientRepository {
  static async getClients(): Promise<
    Client[]
  > {
    const snapshot = await getDocs(
      clientsCollection
    );

    return snapshot.docs.map(
      (document) =>
        ({
          id: document.id,
          ...document.data(),
        }) as Client
    );
  }

  static async createClient(
    data: Omit<Client, "id">
  ) {
    return await addDoc(
      clientsCollection,
      data
    );
  }

  static async updateClient(
    id: string,
    data: Partial<Client>
  ) {
    const clientDoc = doc(
      db,
      "clients",
      id
    );

    return await updateDoc(
      clientDoc,
      data
    );
  }

  static async deleteClient(
    id: string
  ) {
    const clientDoc = doc(
      db,
      "clients",
      id
    );

    return await deleteDoc(clientDoc);
  }
}