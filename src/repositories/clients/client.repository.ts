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
import { Client } from "@/types/client";

export class ClientRepository {
  constructor(private readonly ownerId: string) {}

  private get collectionRef() {
    return collection(db, "clients");
  }

  private get ownerQuery() {
    return query(
      this.collectionRef,
      where("ownerId", "==", this.ownerId)
    );
  }

  subscribe(callback: (clients: Client[]) => void): Unsubscribe {
    return onSnapshot(this.ownerQuery, (snapshot) => {
      callback(snapshot.docs.map((document) => mapDoc<Client>(document)));
    });
  }

  async getClients(): Promise<Client[]> {
    const snapshot = await getDocs(this.ownerQuery);

    return snapshot.docs.map((document) => mapDoc<Client>(document));
  }

  async createClient(data: Omit<Client, "id">) {
    return addDoc(this.collectionRef, {
      ...data,
      ownerId: this.ownerId,
    });
  }

  async updateClient(id: string, data: Partial<Client>) {
    const clientRef = doc(db, "clients", id);
    return updateDoc(clientRef, data);
  }

  async deleteClient(id: string) {
    const clientRef = doc(db, "clients", id);
    return deleteDoc(clientRef);
  }
}
