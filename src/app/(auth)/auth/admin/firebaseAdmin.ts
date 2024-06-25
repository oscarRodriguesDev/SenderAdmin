import admin from 'firebase-admin';

interface FirebaseAdmin {
  projectId: string;
  clientEmail: string;
  storageBucket: string;
  privateKey: string;
}

function formatPrivateKey(key: string) {
   return key.replace(/\\n/g , '/n');  // Corrigido para o caractere de nova linha correto
}

export function createFirebaseAdminApp(params: FirebaseAdmin) {
  const privateKey = formatPrivateKey(params.privateKey);
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey
  });

  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
    storageBucket: params.storageBucket,
  });
}

export async function initAdmin() {
  const params = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET as string,
    privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
  };
  return createFirebaseAdminApp(params);
}
 

