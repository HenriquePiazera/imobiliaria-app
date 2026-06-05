import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
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

    const snapshot = await getDoc(contractDoc);

    if (!snapshot.exists()) return;

    const contract = snapshot.data() as Contract;

    if (contract.status === "active" && contract.propertyId) {
      await updateDoc(doc(db, "properties", contract.propertyId), {
        status: "Disponível",
      });
    }

    await deleteDoc(contractDoc);
  }
}