import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";

import { app } from "@/lib/firebase";

const auth = getAuth(app);

export async function registerUser(
  email: string,
  password: string
) {
  return createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
}

export async function loginUser(
  email: string,
  password: string
) {
  return signInWithEmailAndPassword(
    auth,
    email,
    password
  );
}

export async function logoutUser() {
  return signOut(auth);
}

export { auth };