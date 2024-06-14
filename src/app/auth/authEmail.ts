// authEmail.ts
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from 'firebase/database';
import { redirect } from "next/navigation";

// Configurações do Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, 
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

// Função para criar usuário
export async function createUserEmail(email: string, password: string): Promise<boolean> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return false;
  }
}

// Função para login do usuário
export async function userLogin(cpf: string, password: string): Promise<boolean> {
  const email = `${cpf}@sender.com.br`;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return false;
  }
}

// Função para logout do usuário
export async function userLogout(): Promise<boolean> {
  try {
    await signOut(auth);
    redirect('/');
    return true;
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    return false;
  }
}

// Interface para status de autenticação
export interface AuthStatus {
  loggedIn: boolean;
  email?: string | null;
}

// Função para obter o status de autenticação
export async function getAuthStatus(): Promise<AuthStatus> {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve({ loggedIn: true, email: user.email });
      } else {
        resolve({ loggedIn: false, email: null });
      }
    }, (error) => {
      reject(error);
    });
  });
}

// Função para verificar se o usuário está logado
export async function isUserLoggedIn(): Promise<boolean> {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(!!user);
    });
  });
}

// Função para ler dados do Firebase Realtime Database
export async function readAllData(): Promise<{ sendSesmtData: any, currentUserUID: string | null }> {
  return new Promise((resolve, reject) => {
    const sendSesmtRef = ref(database, 'SendSesmt');

    get(sendSesmtRef).then((sendSesmtSnapshot) => {
      const sendSesmtData = sendSesmtSnapshot.exists() ? sendSesmtSnapshot.val() : null;
      const currentUserUID = auth.currentUser ? auth.currentUser.uid : null;
      resolve({ sendSesmtData, currentUserUID });
    }).catch((error) => {
      reject(error);
    });
  });
}
