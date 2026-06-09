import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Contract } from "@/types/contract";

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

    const propertyRef = doc(
      db,
      "properties",
      data.propertyId
    );

    await updateDoc(propertyRef, {
      status:
        data.type === "sale"
          ? "Vendido"
          : "Alugado",
    });

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

    await updateDoc(
      contractRef,
      data
    );

    if (
      data.status &&
      data.propertyId
    ) {
      const propertyRef = doc(
        db,
        "properties",
        data.propertyId
      );

      if (
        data.status === "canceled"
      ) {
        await updateDoc(
          propertyRef,
          {
            status:
              "Disponível",
          }
        );
      }

      if (
        data.status === "finished"
      ) {
        await updateDoc(
          propertyRef,
          {
            status:
              data.type === "sale"
                ? "Vendido"
                : "Disponível",
          }
        );
      }
    }
  }

  async deleteContract(
    id: string
  ) {
    const contractRef = doc(
      db,
      "contracts",
      id
    );

    return await deleteDoc(
      contractRef
    );
  }
}