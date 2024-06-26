// authEmail.ts
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged,deleteUser,getIdToken} from "firebase/auth";
import { getDatabase, ref, get,set,remove, } from 'firebase/database';
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
export const APP = initializeApp(firebaseConfig);
export const authConfig = getAuth();
const database = getDatabase(APP); 



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
    const userCredential = await signInWithEmailAndPassword(authConfig, email, password);
    return true;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return false;
  }
}




// Função para logout do usuário
export async function userLogout(): Promise<boolean> {
  try {
    await signOut(authConfig);
    redirect('/');
    return true;
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    return false;
  }
}


export interface AuthStatus {
  loggedIn: boolean;
  email?: string | null | undefined;
  userName?: string | null | undefined;
}

// Função para obter o status de autenticação
export async function getAuthStatus(): Promise<AuthStatus> {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(authConfig, async (user) => {
      if (user) {
        const email = user.email;
        let userName = null;

        // Extrai o CPF do e-mail
        if (email) {
          const cpf = email.split('@')[0];
          const sendSesmtRef = ref(database, `SendSesmt/${cpf}`);

          try {
            // Busca o nome do usuário no nó SendSesmt com o CPF informado
            const snapshot = await get(sendSesmtRef);
            if (snapshot.exists()) {
              const userData = JSON.parse(snapshot.val());
              userName = userData.nome; // Supondo que a estrutura do nó contenha um campo "nome"
              console.log(userName);
            } else {
              console.error("CPF não encontrado no banco de dados.");
            }
          } catch (error) {
            console.error("Erro ao buscar o nome do usuário:", error);
          }
        }

        resolve({ loggedIn: true, email: email, userName: userName });
      } else {
        resolve({ loggedIn: false, email: null, userName: null });
      }
    }, (error) => {
      reject(error);
    });
  });
}



// Função para verificar se o usuário está logado
export async function isUserLoggedIn(): Promise<boolean> {
  return new Promise((resolve) => {
    onAuthStateChanged(authConfig, (user) => {
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
      const currentUserUID = authConfig.currentUser ? authConfig.currentUser.uid : null;
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



export async function notificar(cpf:string,status:string): Promise<void>{
  const sendSesmtRef = ref(database, `SendSesmt/${cpf}`);
  try {
    const sendSesmtSnapshot = await get(sendSesmtRef);
    if (sendSesmtSnapshot.exists()) {
      const sendSesmtData = sendSesmtSnapshot.val();
      if (sendSesmtData) {
        const parsedData = JSON.parse(sendSesmtData);
        const notificação = {'notificação':`Olá ${parsedData.nome} informamos que seu atestado foi ${status}`}
      parsedData.notificação = notificação.notificação ; // envia o alerta para o usuario
      
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

// Função para criar autenticação do usuario
export async function createUserEmail(email: string, password: string): Promise<boolean> {
  try {
    const userCredential = await createUserWithEmailAndPassword(authConfig, email, password);
    return true;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return false;
  }
}



//opção de criação de usuário confirmando se ele ja existe no banco de dados
export async function createUserAuthEmail(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const userCredential = await createUserWithEmailAndPassword(authConfig, email, password);
    console.log('vamos criar seu usuário!')
    return { success: true };
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
     //retornar o usuario no bnco de dados
     console.log('usuário ja existe')
       return {success: false}
    } else {
       //criar o usuario no banco de dados
       console.log('Ocorreu um erro desconhecido ao tentar criar o usuario informado!')
      return { success: false, error: error.message };
    }
  }
}


/// Função para salvar dados do usuário no banco de dados como strings JSON
export async function CreateUser(cpf: string, email: string, nome: string, senha: string, empresa: string, contrato: string): Promise<void> {
  const permission = await createUserAuthEmail(email, senha);
  if (permission.success) {
    const sendSesmtRef = ref(database, `SendSesmt/${cpf}`);
    try {
      const sendSesmtSnapshot = await get(sendSesmtRef);

      if (!sendSesmtSnapshot.exists()) {
        const newUser = {
          nome: nome,
          cpf: cpf,
          empresa: empresa,
          contrato: contrato,
          url: '',
          ultima_data: '00/00/00',
        };

        // Salva os dados como uma string JSON
        await set(sendSesmtRef, JSON.stringify(newUser));
        console.log('Usuário criado com sucesso.');
      } else {
        throw new Error(`Usuário já existe no banco de dados`);
      }
    } catch (error) {
      throw new Error(`Ocorreu um erro ao tentar salvar usuario`);
    }
  } else {
    if (permission.error === 'auth/email-already-in-use') {
      throw new Error(`Usuário já existe no banco de dados`);
    } else {
      throw new Error(`Erro ao tentar salvar usuario`);
    }
  }
}





//deletar dados do banco de dados
export async function deleteUsuario(cpf:string){
       try{
      
          const sendSesmtRef = ref(database, `SendSesmt/${cpf}`);
          remove(sendSesmtRef)
          
        
       }catch(err){
        throw new Error(`Erro ao tentar remover usuario`);
       }
}

/* dados de usuario para testes:
email:40744382670@sender.com.br
senha:88211663
*/