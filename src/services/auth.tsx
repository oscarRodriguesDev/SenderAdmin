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
};

const app = initializeApp(firebaseConfig);

//função para logar com email
export async function loginMail(cpf: string, password: string) {
  try {
    const email = `${cpf}@sender.com.br`;
    const userCredential = await signInWithEmailAndPassword(
      await getAuth(),
      email,
      password
    );
    const user = userCredential.user;
   
    return user; // Retorna o usuário autenticado
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error; // Lança o erro para que possa ser tratado no componente de login
  }
}


//Função para recuperar o usuário logado
export const userLogged = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    }, reject); // Caso ocorra um erro, rejeita a promessa
  });
};



//função para realizar o logout
export const userLogout = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        resolve(); // Logout bem-sucedido
      })
      .catch((error) => {
        console.error("Erro ao fazer logout:", error);
        reject(error); // Rejeita a promessa com o erro
      });
  });
};
