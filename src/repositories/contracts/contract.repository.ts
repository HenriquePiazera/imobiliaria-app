import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  runTransaction,
  Unsubscribe,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { mapDoc } from "@/lib/map-doc";

import {
  Contract,
  ContractStatus,
  ContractType,
} from "@/types/contract";

export type CreateContractDTO = Omit<Contract, "id" | "createdAt">;

export class ContractRepository {
  constructor(private readonly ownerId: string) {}

  private get collectionRef() {
    return collection(db, "contracts");
  }

  private get ownerQuery() {
    return query(
      this.collectionRef,
      where("ownerId", "==", this.ownerId)
    );
  }

  subscribe(callback: (contracts: Contract[]) => void): Unsubscribe {
    return onSnapshot(this.ownerQuery, (snapshot) => {
      callback(snapshot.docs.map((document) => mapDoc<Contract>(document)));
    });
  }

  async getContracts(): Promise<Contract[]> {
    const snapshot = await getDocs(this.ownerQuery);

    return snapshot.docs.map((document) => mapDoc<Contract>(document));
  }

  private resolvePropertyStatus(
    contractType: ContractType,
    contractStatus: ContractStatus
  ): "Disponível" | "Alugado" | "Vendido" {
    if (contractStatus === "active") {
      return contractType === "sale" ? "Vendido" : "Alugado";
    }

    if (contractStatus === "finished") {
      return contractType === "sale" ? "Vendido" : "Disponível";
    }

    return "Disponível";
  }

  async createContract(data: CreateContractDTO) {
    const contractRef = doc(this.collectionRef);
    const propertyRef = doc(db, "properties", data.propertyId);

    await runTransaction(db, async (transaction) => {
      const activeContractQuery = query(
        this.collectionRef,
        where("ownerId", "==", this.ownerId),
        where("propertyId", "==", data.propertyId),
        where("status", "==", "active")
      );

      const existingContracts = await transaction.get(activeContractQuery);

      if (!existingContracts.empty) {
        throw new Error("Já existe um contrato ativo para este imóvel.");
      }

      const propertySnapshot = await transaction.get(propertyRef);

      if (!propertySnapshot.exists()) {
        throw new Error("Imóvel não encontrado.");
      }

      transaction.set(contractRef, {
        ...data,
        ownerId: this.ownerId,
        createdAt: new Date().toISOString(),
      });

      transaction.update(propertyRef, {
        status: this.resolvePropertyStatus(data.type, data.status),
      });
    });

    return contractRef;
  }

  async updateContract(id: string, data: Partial<Contract>) {
    const contractRef = doc(db, "contracts", id);

    await runTransaction(db, async (transaction) => {
      const snapshot = await transaction.get(contractRef);

      if (!snapshot.exists()) {
        throw new Error("Contrato não encontrado.");
      }

      const currentContract = snapshot.data() as Contract;
      const propertyId = data.propertyId ?? currentContract.propertyId;
      const contractType = data.type ?? currentContract.type;
      const contractStatus = data.status ?? currentContract.status;
      const propertyRef = doc(db, "properties", propertyId);

      if (
        data.propertyId &&
        data.propertyId !== currentContract.propertyId &&
        contractStatus === "active"
      ) {
        const activeContractQuery = query(
          this.collectionRef,
          where("ownerId", "==", this.ownerId),
          where("propertyId", "==", data.propertyId),
          where("status", "==", "active")
        );

        const existingContracts = await transaction.get(activeContractQuery);

        if (!existingContracts.empty) {
          throw new Error("Já existe um contrato ativo para este imóvel.");
        }
      }

      transaction.update(contractRef, data);

      transaction.update(propertyRef, {
        status: this.resolvePropertyStatus(contractType, contractStatus),
      });

      if (
        data.propertyId &&
        data.propertyId !== currentContract.propertyId
      ) {
        const previousPropertyRef = doc(
          db,
          "properties",
          currentContract.propertyId
        );

        transaction.update(previousPropertyRef, {
          status: "Disponível",
        });
      }
    });
  }

  async deleteContract(id: string) {
    const contractRef = doc(db, "contracts", id);

    await runTransaction(db, async (transaction) => {
      const snapshot = await transaction.get(contractRef);

      if (!snapshot.exists()) {
        return;
      }

      const contract = snapshot.data() as Contract;
      const propertyRef = doc(db, "properties", contract.propertyId);

      transaction.delete(contractRef);
      transaction.update(propertyRef, { status: "Disponível" });
    });
  }
}
