import { NextResponse } from 'next/server';
import { ref, get } from 'firebase/database';
import { db } from '../firebase/firebase';
import { getAuth } from 'firebase/auth';


// Função para ler dados do Firebase Realtime Database
async function readAllData() {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    const sendSesmtRef = ref(db, 'SendSesmt');
  
    Promise.all([
      get(sendSesmtRef),
    ]).then(([sendSesmtSnapshot]) => {
      const sendSesmtData = sendSesmtSnapshot.exists() ? sendSesmtSnapshot.val() : null;
      const currentUserUID = auth.currentUser ? auth.currentUser.uid : null;
    
      resolve({ sendSesmtData, currentUserUID });
    }).catch((error) => {
      reject(error);
    });
  });
}


// Rota GET para buscar dados
export async function GET(request:Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id'); // Obtém o ID dos parâmetros da URL

  try {
    const data = await readAllData();
    return NextResponse.json(data);
  } catch (error) {
  /*  console.log(error); */
  }
}



