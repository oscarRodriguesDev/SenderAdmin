import { NextResponse } from 'next/server';
import {readAllData } from '@/app/auth/authEmail';





// Rota GET para buscar dados
export async function GET(request:Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    const data = await readAllData();
    return NextResponse.json(data);
  } catch (error) {
  console.log(error); 
  }
}



