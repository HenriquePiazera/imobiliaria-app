import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  runTransaction,
  Unsubscribe,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { mapDoc } from "@/lib/map-doc";
import { resolvePropertyStatus } from "@/utils/contract-rules";

import { Contract } from "@/types/contract";

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

  private async hasActiveContractForProperty(
    propertyId: string,
    excludeContractId?: string
  ) {
    const activeContractQuery = query(
      this.collectionRef,
      where("ownerId", "==", this.ownerId),
      where("propertyId", "==", propertyId),
      where("status", "==", "active")
    );

    const snapshot = await getDocs(activeContractQuery);

    if (!excludeContractId) {
      return !snapshot.empty;
    }

    return snapshot.docs.some((document) => document.id !== excludeContractId);
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

  async createContract(data: CreateContractDTO) {
    if (data.status === "active") {
      const hasActive = await this.hasActiveContractForProperty(
        data.propertyId
      );

      if (hasActive) {
        throw new Error("Já existe um contrato ativo para este imóvel.");
      }
    }

    const contractRef = doc(this.collectionRef);
    const propertyRef = doc(db, "properties", data.propertyId);

    await runTransaction(db, async (transaction) => {
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
        status: resolvePropertyStatus(data.type, data.status),
      });
    });

    return contractRef;
  }

  async updateContract(id: string, data: Partial<Contract>) {
    const contractRef = doc(db, "contracts", id);
    const currentSnapshot = await getDocs(
      query(this.collectionRef, where("ownerId", "==", this.ownerId))
    );
    const currentDoc = currentSnapshot.docs.find(
      (document) => document.id === id
    );

    if (!currentDoc) {
      throw new Error("Contrato não encontrado.");
    }

    const currentContract = currentDoc.data() as Contract;
    const propertyId = data.propertyId ?? currentContract.propertyId;
    const contractType = data.type ?? currentContract.type;
    const contractStatus = data.status ?? currentContract.status;

    if (contractStatus === "active") {
      const hasActive = await this.hasActiveContractForProperty(
        propertyId,
        id
      );

      if (hasActive) {
        throw new Error("Já existe um contrato ativo para este imóvel.");
      }
    }

    await runTransaction(db, async (transaction) => {
      const snapshot = await transaction.get(contractRef);

      if (!snapshot.exists()) {
        throw new Error("Contrato não encontrado.");
      }

      const propertyRef = doc(db, "properties", propertyId);

      transaction.update(contractRef, data);

      transaction.update(propertyRef, {
        status: resolvePropertyStatus(contractType, contractStatus),
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
