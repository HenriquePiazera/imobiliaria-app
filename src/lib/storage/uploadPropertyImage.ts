import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

export async function uploadPropertyImage(file: File): Promise<string> {
  const fileRef = ref(
    storage,
    `properties/${Date.now()}-${file.name}`
  );

  const snapshot = await uploadBytes(fileRef, file);

  const url = await getDownloadURL(snapshot.ref);

  return url;
}