import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "@/lib/firebase";
import { clearAuthCookie, setAuthCookie } from "@/lib/auth-cookie";

export async function registerUser(
  email: string,
  password: string
) {
  const result = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  setAuthCookie(true);
  return result;
}

export async function loginUser(
  email: string,
  password: string
) {
  const result = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  setAuthCookie(true);
  return result;
}

export async function logoutUser() {
  clearAuthCookie();
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