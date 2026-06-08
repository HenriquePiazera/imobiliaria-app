import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  getDocs as getDocsQuery,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Contract } from "@/types/contract";
import { Property } from "@/types/property";

const contractsCollection = collection(db, "contracts");
const propertiesCollection = collection(db, "properties");

export class ContractRepository {
  async getContracts(): Promise<Contract[]> {
    const snapshot = await getDocs(contractsCollection);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Contract[];
  }

  async createContract(data: Omit<Contract, "id">) {
    const propertyRef = doc(db, "properties", data.propertyId);
    const propertySnap = await getDoc(propertyRef);

    if (!propertySnap.exists()) throw new Error("Property not found");

    const property = propertySnap.data() as Property;

    const activeQuery = query(
      contractsCollection,
      where("propertyId", "==", data.propertyId),
      where("status", "==", "active")
    );

    const activeSnap = await getDocsQuery(activeQuery);

    if (activeSnap.size > 0) {
      throw new Error("Property already has an active contract");
    }

    if (data.type === "sale" && data.status === "active") {
      await updateDoc(propertyRef, { status: "Vendido" });
    }

    if (data.type === "rent" && data.status === "active") {
      await updateDoc(propertyRef, { status: "Alugado" });
    }

    return await addDoc(contractsCollection, data);
  }

  async updateContract(id: string, data: Partial<Contract>) {
    const contractRef = doc(db, "contracts", id);

    const snapshot = await getDoc(contractRef);
    if (!snapshot.exists()) return;

    const oldContract = snapshot.data() as Contract;

    const propertyRef = doc(db, "properties", oldContract.propertyId);

    if (data.status === "finished" || data.status === "canceled") {
      if (oldContract.type === "rent") {
        await updateDoc(propertyRef, { status: "Disponível" });
      }
    }

    return await updateDoc(contractRef, data);
  }

  async deleteContract(id: string) {
    const contractRef = doc(db, "contracts", id);

    const snapshot = await getDoc(contractRef);
    if (!snapshot.exists()) return;

    const contract = snapshot.data() as Contract;

    if (contract.type === "rent") {
      await updateDoc(doc(db, "properties", contract.propertyId), {
        status: "Disponível",
      });
    }

    await deleteDoc(contractRef);
  }
}