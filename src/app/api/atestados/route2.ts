import { NextResponse } from 'next/server';
import { readDataByLabel } from '@/app/auth/authEmail';

// Nova rota GET para buscar dados por label
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const label = searchParams.get('label');

  if (!label) {
    return NextResponse.json({ error: 'Label parameter is required' }, { status: 400 });
  }

  try {
    const data = await readDataByLabel(label);
    if (data) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: 'Data not found' }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}




