import { NextRequest, NextResponse } from 'next/server';

// Dados de demonstração de linhas de transporte
const transportLines = [
  { code: '2103', name: 'Circular Av. do Contorno', type: 'CONVENCIONAL', avgRating: 3.2, totalRatings: 156 },
  { code: '4103', name: 'Est. São Gabriel / Centro (MOVE)', type: 'MOVE', avgRating: 3.8, totalRatings: 234 },
  { code: '5106', name: 'Est. Vilarinho / Centro (MOVE)', type: 'MOVE', avgRating: 3.1, totalRatings: 312 },
  { code: '9250', name: 'Barreiro / Centro via Anel', type: 'CONVENCIONAL', avgRating: 2.9, totalRatings: 189 },
  { code: '3070', name: 'Pampulha / Centro', type: 'CONVENCIONAL', avgRating: 3.5, totalRatings: 145 },
  { code: 'METRO-1', name: 'Metrô - Linha 1 (Eldorado-Vilarinho)', type: 'METRO', avgRating: 4.1, totalRatings: 567 },
  { code: '4106', name: 'Est. Barreiro / Centro (MOVE)', type: 'MOVE', avgRating: 3.4, totalRatings: 278 },
  { code: '1502', name: 'Padre Eustáquio / Savassi', type: 'CONVENCIONAL', avgRating: 3.3, totalRatings: 98 },
  { code: '9103', name: 'Venda Nova / Centro via C. Machado', type: 'CONVENCIONAL', avgRating: 2.7, totalRatings: 201 },
  { code: '5201', name: 'Est. Pampulha / Centro (MOVE)', type: 'MOVE', avgRating: 3.6, totalRatings: 167 },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase();
  const type = searchParams.get('type');

  let filtered = [...transportLines];

  if (query) {
    filtered = filtered.filter(
      (l) =>
        l.name.toLowerCase().includes(query) ||
        l.code.toLowerCase().includes(query)
    );
  }

  if (type) {
    filtered = filtered.filter((l) => l.type === type);
  }

  return NextResponse.json({ lines: filtered });
}
