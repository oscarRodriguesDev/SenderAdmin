import { readFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import { join } from 'path';

// Função para ler dados do arquivo JSON
async function readAllData() {
  try {
    // Ajuste o caminho para o arquivo JSON
    const filePath = join(process.cwd(), 'src', 'app', 'api', 'fake', 'fake.json');
    const data = await readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.error('Erro ao ler o arquivo JSON:', error);
    throw new Error('Erro ao ler o arquivo JSON');
  }
}

// Rota GET para buscar dados
export async function GET(request: Request) {
  try {
    const data = await readAllData();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Erro interno do servidor:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
