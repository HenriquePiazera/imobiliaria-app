//serviço responsável por cadastro, login e logout

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
    return await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  }
  
  export async function loginUser(
    email: string,
    password: string
  ) {
    return await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  }
  
  export async function logoutUser() {
    return await signOut(auth);
  }
  
  export { auth };