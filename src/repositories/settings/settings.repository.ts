import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Settings } from "@/types/settings";

export class SettingsRepository {
  constructor(private readonly ownerId: string) {}

  private get settingsRef() {
    return doc(db, "settings", this.ownerId);
  }

  async getSettings(): Promise<Settings | null> {
    const snapshot = await getDoc(this.settingsRef);

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data() as Settings;
  }

  async saveSettings(settings: Omit<Settings, "ownerId">) {
    await setDoc(this.settingsRef, {
      ...settings,
      ownerId: this.ownerId,
    });
  }
}
