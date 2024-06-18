// authEmail.ts
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get,set } from 'firebase/database';
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

// Função para buscar a lista de e-mails autorizados do banco de dados
async function getAuthorizedEmails(): Promise<string[]> {
  const db = getDatabase();
  const authorizedEmailsRef = ref(db, 'adm');
  const snapshot = await get(authorizedEmailsRef);
  if (snapshot.exists()) {
    const authorizedEmailsObj = snapshot.val();
    const authorizedEmailsArray = Object.values(authorizedEmailsObj);
    return authorizedEmailsArray.map((email: string|any) => email.replace(/'/g, '')); // Remover aspas simples
  } else {
    console.error("Lista de e-mails autorizados não encontrada no banco de dados.");
    return [];
  }
}

// Função para login do usuário
export async function userLogin(cpf: string, password: string): Promise<boolean> {
  const email = `${cpf}@sender.com.br`;

  try {
    // Busca a lista de e-mails autorizados no banco de dados
    const authorizedEmails = await getAuthorizedEmails();

    // Verifica se o e-mail está na lista de autorizados
    if (!authorizedEmails.includes(email)) {
      console.error("E-mail não autorizado para login.");
      return false;
    }

    // Tenta fazer o login
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
  email?: string | null|undefined;
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


// Função para ler dados de um nó específico do Firebase Realtime Database
export async function readDataByLabel(label: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const specificRef = ref(database, `SendSesmt/${label}`);

    get(specificRef).then((snapshot) => {
      const data = snapshot.exists() ? snapshot.val() : null;
      resolve(data);
    }).catch((error) => {
      reject(error);
    });
  });
}

//função altera o aprove do objeto
export async function updateData(cpf: string, status: string): Promise<void> {
  const sendSesmtRef = ref(database, `SendSesmt/${cpf}`);
  
  try {
    const sendSesmtSnapshot = await get(sendSesmtRef);
    if (sendSesmtSnapshot.exists()) {
      const sendSesmtData = sendSesmtSnapshot.val();
      if (sendSesmtData) {
        const parsedData = JSON.parse(sendSesmtData);
        parsedData.aprove = status ; // atualiza o aprove
        
        // Salva os dados atualizados de volta no banco de dados
        await set(sendSesmtRef, JSON.stringify(parsedData));
      } else {
        throw new Error(`Não foi encontrado nenhum dado para o CPF ${cpf}`);
      }
    } else {
      throw new Error(`Não foi encontrado nenhum dado para o CPF ${cpf}`);
    }
  } catch (error) {
    throw new Error(`${error} ocorreu ao tentaar alterar o valor no banco de dados`);
  }
}


//função altera o alerta do objeto
export async function updateAlert(cpf: string, status: boolean): Promise<void> {
  const sendSesmtRef = ref(database, `SendSesmt/${cpf}`);
  
  try {
    const sendSesmtSnapshot = await get(sendSesmtRef);
    if (sendSesmtSnapshot.exists()) {
      const sendSesmtData = sendSesmtSnapshot.val();
      if (sendSesmtData) {
        const parsedData = JSON.parse(sendSesmtData);
        parsedData.alert = status ; // atualiza o alerta
        
        // Salva os dados atualizados de volta no banco de dados
        await set(sendSesmtRef, JSON.stringify(parsedData));
      } else {
        throw new Error(`Não foi encontrado nenhum dado para o CPF ${cpf}`);
      }
    } else {
      throw new Error(`Não foi encontrado nenhum dado para o CPF ${cpf}`);
    }
  } catch (error) {
    throw new Error(`${error} ocorreu ao tentaar alterar o valor no banco de dados`);
  }
}