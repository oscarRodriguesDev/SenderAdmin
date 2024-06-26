import { NextResponse } from 'next/server';
import { readAllData, CreateUser,deleteUsuario } from '@/app/(auth)/auth/authEmail';
import { initAdmin, eraserUser} from '@/app/(auth)/auth/admin/firebaseAdmin';
import admin from 'firebase-admin';

let adminApp: admin.app.App;

export const initAdminApp = async () => {
  if (!adminApp) {
    adminApp = await initAdmin();
  }else{
    adminApp = await initAdmin();
  }
};

// Chamada em algum lugar do seu código para inicializar adminApp
initAdminApp().then(() => {
  // adminApp está pronto para uso aqui
});

export async function GET(request: Request) {
  try {
    const data = await readAllData();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: `Failed to fetch data: ${error}` }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { cpf, email, senha, nome, empresa, contrato } = await request.json();

    if (!cpf || !nome || !empresa || !contrato) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    try {
      await CreateUser(cpf, email, nome, senha, empresa, contrato);
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ success: false, error: `Failed to create user: ${error}` }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: `Failed to process request: ${error}` }, { status: 500 });
  }
}
//essa rota fica inativa nessa primeira versão 
 export async function DELETE(request: Request) {
  try {
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    try {
      console.log(`Deleting user with ID: ${id}`);  // Log para depuração
    
     await adminApp.auth().deleteUser(id);
    // await eraserUser(id)

      return NextResponse.json({ success: true, message: `User with ID ${id} deleted successfully` });
    } catch (error) {
      console.error(`Error deleting user: ${error}`);  // Log do erro
      return NextResponse.json({ success: false, error: `Failed to delete user: ${error}` }, { status: 500 });
    }
  } catch (error) {
    console.error(`Error processing request: ${error}`);  // Log do erro
    return NextResponse.json({ success: false, error: `Failed to process request: ${error}` }, { status: 500 });
  }
} 
 

//rota para deletar usuario pelo cpf


/* export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id: string | any = searchParams.get('id');
  try {
    await deleteUsuario(id);
    return NextResponse.json({ success: true, error: `User deleted in` }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: `Failed to delete user: ${error}` }, { status: 500 });
  }
} */