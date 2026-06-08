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

export type CreateContractDTO = Omit<
  Contract,
  "id" | "createdAt"
>;

export class ContractRepository {
  async getContracts(): Promise<Contract[]> {
    const snapshot = await getDocs(contractsCollection);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Contract[];
  }

  async createContract(data: CreateContractDTO) {
    return await addDoc(contractsCollection, {
      ...data,
      createdAt: new Date().toISOString(),
    });
  }

  async updateContract(id: string, data: Partial<Contract>) {
    const ref = doc(db, "contracts", id);
    return await updateDoc(ref, data);
  }

  async deleteContract(id: string) {
    const ref = doc(db, "contracts", id);
    return await deleteDoc(ref);
  }
}