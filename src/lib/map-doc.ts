import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export function mapDoc<T extends { id: string }>(
  document: QueryDocumentSnapshot<DocumentData>
): T {
  return {
    id: document.id,
    ...document.data(),
  } as T;
}
