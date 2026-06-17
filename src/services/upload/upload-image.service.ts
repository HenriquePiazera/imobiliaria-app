import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

export class UploadImageService {
  async upload(file: File): Promise<string> {
    const fileName = `${Date.now()}-${file.name}`;

    const storageRef = ref(storage, `properties/${fileName}`);

    await uploadBytes(storageRef, file);

    return await getDownloadURL(storageRef);
  }
}