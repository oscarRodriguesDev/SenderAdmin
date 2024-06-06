import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcjvg1udkNPcHPsZZzxoIFsv7iClodqOM",
  authDomain: "sender-345a7.firebaseapp.com",
  databaseURL: "https://sender-345a7-default-rtdb.firebaseio.com",
  projectId: "sender-345a7",
  storageBucket: "sender-345a7.appspot.com",
  messagingSenderId: "837903181475",
  appId: "1:837903181475:web:82d843adc09d3ddc0d0116",

  /*     apiKey:process.env.APIKEY as string,
    authDomain:process.env.AUTHDOMAIN  as string, 
    databaseURL:process.env.DATABASEURL  as string,
    projectId: process.env.PROJECTID  as string,
    storageBucket: process.env.STORAGEBUCKET  as string,
    messagingSenderId: process.env.MESSAGINGSENDERID  as string,
    appId: process.env.APPID  as string, 
    
    */
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();

//função para logar com email
export async function loginMail(cpf: string, password: string) {
  try {
    const email = `${cpf}@sender.com.br`;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    window.location.href = "/aplication";
    return user; // Retorna o usuário autenticado
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error; // Lança o erro para que possa ser tratado no componente de login
  }
}
