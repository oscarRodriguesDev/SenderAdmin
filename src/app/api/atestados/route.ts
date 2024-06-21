import { NextResponse } from 'next/server';
import {readAllData,CreateUser } from '@/app/(auth)/auth/authEmail';
// Rota GET para buscar dados
export async function GET(request:Request) {
  const { searchParams } = new URL(request.url);
  try {
    const data = await readAllData();
    return NextResponse.json(data);
  } catch (error) {
  console.log(error); 
  }
}



export async function POST(request: Request) {
  try {
    const { cpf, email, senha, nome,empresa,contrato } = await request.json();

    // Verifique se todos os campos obrigatórios estão presentes
    if (!cpf  || !nome || !empresa || !contrato) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Chama a função CreateUser
    await CreateUser(cpf, email, nome, senha, empresa, contrato);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json({ success: false, error:error}, { status: 500 });
  }
}


