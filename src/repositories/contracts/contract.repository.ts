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
import { Property } from "@/types/property";

const contractsCollection = collection(db, "contracts");

export class ContractRepository {
  async getContracts(): Promise<Contract[]> {
    const snapshot = await getDocs(contractsCollection);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Contract[];
  }

  private async updatePropertyStatusByContract(
    propertyId: string,
    contractStatus: Contract["status"]
  ) {
    const propertyDoc = doc(db, "properties", propertyId);

    const propertySnapshot = await getDoc(propertyDoc);

    if (!propertySnapshot.exists()) return;

    const property = {
      id: propertySnapshot.id,
      ...propertySnapshot.data(),
    } as Property;

    let newStatus: Property["status"];

    if (contractStatus === "active") {
      newStatus =
        property.purpose === "Aluguel"
          ? "Alugado"
          : "Vendido";
    } else if (contractStatus === "finished") {
      newStatus =
        property.purpose === "Aluguel"
          ? "Disponível"
          : "Vendido";
    } else {
      newStatus = "Disponível";
    }

    await updateDoc(propertyDoc, {
      status: newStatus,
    });
  }

  async createContract(data: Omit<Contract, "id">) {
    const result = await addDoc(
      contractsCollection,
      data
    );

    if (data.propertyId) {
      await this.updatePropertyStatusByContract(
        data.propertyId,
        data.status
      );
    }

    return result;
  }

  async updateContract(
    id: string,
    data: Partial<Contract>
  ) {
    const contractDoc = doc(
      db,
      "contracts",
      id
    );

    const snapshot = await getDoc(contractDoc);

    if (!snapshot.exists()) return;

    const currentContract =
      snapshot.data() as Contract;

    await updateDoc(contractDoc, data);

    const propertyId =
      data.propertyId ??
      currentContract.propertyId;

    const status =
      data.status ??
      currentContract.status;

    if (propertyId) {
      await this.updatePropertyStatusByContract(
        propertyId,
        status
      );
    }
  }

  async deleteContract(id: string) {
    const contractDoc = doc(
      db,
      "contracts",
      id
    );

    const snapshot = await getDoc(contractDoc);

    if (!snapshot.exists()) return;

    const contract =
      snapshot.data() as Contract;

    if (contract.propertyId) {
      await updateDoc(
        doc(
          db,
          "properties",
          contract.propertyId
        ),
        {
          status: "Disponível",
        }
      );
    }

    await deleteDoc(contractDoc);
  }
}