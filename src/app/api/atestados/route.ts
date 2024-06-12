import { NextResponse } from 'next/server';
import { ref, get } from 'firebase/database';
import { db } from '../firebase/firebase';

// Função para ler dados do Firebase Realtime Database
// Função para ler todos os dados do Firebase Realtime Database
async function readAllData() {
    return new Promise((resolve, reject) => {
      const sendSesmtRef = ref(db, 'SendSesmt');
      const atestadosRef = ref(db, 'atestados');
  
      Promise.all([
        get(sendSesmtRef),
        get(atestadosRef)
      ]).then(([sendSesmtSnapshot, atestadosSnapshot]) => {
        const sendSesmtData = sendSesmtSnapshot.exists() ? sendSesmtSnapshot.val() : null;
        const atestadosData = atestadosSnapshot.exists() ? atestadosSnapshot.val() : null;
        resolve({ sendSesmtData, atestadosData });
      }).catch((error) => {
        reject(error);
      });
    });
  }

// Rota GET para buscar dados
export async function GET(request:Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id'); // Obtém o ID dos parâmetros da URL

  if (!id) {
   
  }

  try {
    const data = await readAllData();
    return NextResponse.json(data);
  } catch (error) {
   
  }
}



