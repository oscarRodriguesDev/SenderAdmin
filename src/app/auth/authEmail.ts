

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut, onAuthStateChanged, User } from "firebase/auth";
import { redirect } from "next/navigation";



const firebaseConfig = {

  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, 
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/* Esta função permite o usuario criar um login usando email e senha */
export async function createUserEmail(email: string, password: string): Promise<boolean> {
  try {
    const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
    const user = userCredential.user;
    return true;
  } catch (error) {
    return false;
  }
}

/* Esta função permite que o usuario faça login utilizando o email e senha criados anteriormente */
export async function userLogin(cpf: string, password: string): Promise<boolean> {
  const  email = `${cpf}@sender.com.br`
  try {
    const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
    const user = userCredential.user;
    return true;
  } catch (error) {
    return false;
  }
}

/* Esta função permite que o usuairo faça logout de sua aplicação */
export async function userLogout(): Promise<boolean> {
  try {
    await signOut(getAuth());
    redirect('/')
   
    } catch (error) {
      console.log(error)
      return false
      }
}


//futuramente vai para os tipos
export interface AuthStatus {
  loggedIn: boolean;
  email?: string | null;

  }
  
  /*Esta função retorna a session no sistema, e o email do usuario logado */
export async function getAuthStatus(): Promise<AuthStatus> {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(getAuth(), (user) => {
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