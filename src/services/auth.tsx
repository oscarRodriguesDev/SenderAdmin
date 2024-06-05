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
  let email = `${cpf}@sender.com.br`;

  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return 'logou';
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return 'não logou';
    });
}
