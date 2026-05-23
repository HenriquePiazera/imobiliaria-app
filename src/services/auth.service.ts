import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

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

export function getAuthErrorMessage(
  errorCode: string
) {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "Este e-mail já está em uso.";

    case "auth/invalid-email":
      return "E-mail inválido.";

    case "auth/weak-password":
      return "A senha precisa ter pelo menos 6 caracteres.";

    case "auth/user-not-found":
      return "Usuário não encontrado.";

    case "auth/wrong-password":
      return "Senha incorreta.";

    case "auth/invalid-credential":
      return "E-mail ou senha inválidos.";

    default:
      return "Ocorreu um erro inesperado.";
  }
}