import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

export class UploadImageService {
  constructor(private readonly ownerId: string) {}

  async upload(file: File): Promise<string> {
    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(
      storage,
      `users/${this.ownerId}/properties/${fileName}`
    );

    await uploadBytes(storageRef, file);

    return getDownloadURL(storageRef);
  }
}
