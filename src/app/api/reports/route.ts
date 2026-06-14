import { NextRequest, NextResponse } from 'next/server';
import { generateProtocol } from '@/utils/helpers';

// Em produção, usar Prisma. Por ora, armazena em memória para demo.
const reports: any[] = [];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const regional = searchParams.get('regional');
  const type = searchParams.get('type');
  const status = searchParams.get('status');

  let filtered = [...reports];

  if (regional) filtered = filtered.filter((r) => r.regional === regional);
  if (type) filtered = filtered.filter((r) => r.type === type);
  if (status) filtered = filtered.filter((r) => r.status === status);

  return NextResponse.json({ reports: filtered });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const report = {
      id: Date.now().toString(),
      ...body,
      protocol: generateProtocol(),
      status: 'ABERTO',
      upvotes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    reports.unshift(report);

    return NextResponse.json({ report }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar report:', error);
    return NextResponse.json(
      { error: 'Erro ao criar relatório' },
      { status: 500 }
    );
  }
}
