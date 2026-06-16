import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import {
  Contract,
  ContractStatus,
  ContractType,
} from "@/types/contract";

const contractsCollection = collection(
  db,
  "contracts"
);

export type CreateContractDTO = Omit<
  Contract,
  "id" | "createdAt"
>;

export class ContractRepository {
  async getContracts(): Promise<
    Contract[]
  > {
    const snapshot = await getDocs(
      contractsCollection
    );

    return snapshot.docs.map(
      (document) =>
        ({
          ...document.data(),
          id: document.id,
        }) as Contract
    );
  }

  private async updatePropertyStatus(
    propertyId: string,
    contractType: ContractType,
    contractStatus: ContractStatus
  ) {
    const propertyRef = doc(
      db,
      "properties",
      propertyId
    );

    let propertyStatus:
      | "Disponível"
      | "Alugado"
      | "Vendido";

    if (contractStatus === "active") {
      propertyStatus =
        contractType === "sale"
          ? "Vendido"
          : "Alugado";
    } else if (
      contractStatus === "finished"
    ) {
      propertyStatus =
        contractType === "sale"
          ? "Vendido"
          : "Disponível";
    } else {
      propertyStatus = "Disponível";
    }

    await updateDoc(propertyRef, {
      status: propertyStatus,
    });
  }

  async createContract(
    data: CreateContractDTO
  ) {
    const activeContractQuery = query(
      contractsCollection,
      where(
        "propertyId",
        "==",
        data.propertyId
      ),
      where(
        "status",
        "==",
        "active"
      )
    );

    const existingContracts =
      await getDocs(
        activeContractQuery
      );

    if (!existingContracts.empty) {
      throw new Error(
        "Já existe um contrato ativo para este imóvel."
      );
    }

    const contractRef =
      await addDoc(
        contractsCollection,
        {
          ...data,
          createdAt:
            new Date().toISOString(),
        }
      );

    await this.updatePropertyStatus(
      data.propertyId,
      data.type,
      data.status
    );

    return contractRef;
  }

  async updateContract(
    id: string,
    data: Partial<Contract>
  ) {
    const contractRef = doc(
      db,
      "contracts",
      id
    );

    const snapshot =
      await getDoc(contractRef);

    if (!snapshot.exists()) {
      throw new Error(
        "Contrato não encontrado."
      );
    }

    const currentContract =
      snapshot.data() as Contract;

    await updateDoc(
      contractRef,
      data
    );

    const propertyId =
      data.propertyId ??
      currentContract.propertyId;

    const contractType =
      data.type ??
      currentContract.type;

    const contractStatus =
      data.status ??
      currentContract.status;

    await this.updatePropertyStatus(
      propertyId,
      contractType,
      contractStatus
    );
  }

  async deleteContract(
    id: string
  ) {
    const contractRef = doc(
      db,
      "contracts",
      id
    );

    const snapshot =
      await getDoc(contractRef);

    if (!snapshot.exists()) {
      return;
    }

    const contract =
      snapshot.data() as Contract;

    await deleteDoc(contractRef);

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
}