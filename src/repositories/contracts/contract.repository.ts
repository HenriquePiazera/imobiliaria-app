import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { Contract } from "@/types/contract";

const contractsCollection = collection(db, "contracts");

export class ContractRepository {
  async getContracts(): Promise<Contract[]> {
    const snapshot = await getDocs(contractsCollection);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Contract[];
  }

  async createContract(data: Omit<Contract, "id">) {
    return await addDoc(contractsCollection, data);
  }

  async updateContract(id: string, data: Partial<Contract>) {
    const contractDoc = doc(db, "contracts", id);
    return await updateDoc(contractDoc, data);
  }

  async deleteContract(id: string) {
    const contractDoc = doc(db, "contracts", id);
    return await deleteDoc(contractDoc);
  }
}