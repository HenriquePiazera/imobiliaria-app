import {
    doc,
    getDoc,
    setDoc,
  } from "firebase/firestore";
  
  import { db } from "@/lib/firebase";
  
  import { Settings } from "@/types/settings";
  
  const SETTINGS_DOC_ID =
    "main";
  
  export async function getSettings() {
    const settingsRef = doc(
      db,
      "settings",
      SETTINGS_DOC_ID
    );
  
    const snapshot =
      await getDoc(settingsRef);
  
    if (!snapshot.exists()) {
      return null;
    }
  
    return snapshot.data() as Settings;
  }
  
  export async function saveSettings(
    settings: Settings
  ) {
    const settingsRef = doc(
      db,
      "settings",
      SETTINGS_DOC_ID
    );
  
    await setDoc(settingsRef, settings);
  }