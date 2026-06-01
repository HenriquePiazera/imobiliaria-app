"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

type AuthUser = {
  uid: string;
  email: string | null;
};

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(mapUser(firebaseUser));
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function login(email: string, password: string) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    setUser(mapUser(result.user));
  }

  async function register(email: string, password: string) {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    setUser(mapUser(result.user));
  }

  async function logout() {
    await signOut(auth);
    setUser(null);
  }

  function mapUser(user: User): AuthUser {
    return {
      uid: user.uid,
      email: user.email,
    };
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);