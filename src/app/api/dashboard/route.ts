import { NextResponse } from 'next/server';

// Dados de demonstração para o dashboard
const dashboardData = {
  totalReports: 1247,
  resolvedReports: 834,
  avgResolutionDays: 12.3,
  pendingReports: 413,
  reportsByRegional: [
    { regional: 'Centro-Sul', count: 234 },
    { regional: 'Venda Nova', count: 198 },
    { regional: 'Barreiro', count: 187 },
    { regional: 'Nordeste', count: 156 },
    { regional: 'Noroeste', count: 132 },
    { regional: 'Pampulha', count: 112 },
    { regional: 'Norte', count: 89 },
    { regional: 'Leste', count: 78 },
    { regional: 'Oeste', count: 61 },
  ],
  reportsByType: [
    { type: 'Buraco na via', count: 456 },
    { type: 'Poste apagado', count: 234 },
    { type: 'Lixo irregular', count: 189 },
    { type: 'Alagamento', count: 123 },
    { type: 'Semáforo quebrado', count: 98 },
    { type: 'Calçada danificada', count: 76 },
    { type: 'Árvore caída', count: 42 },
    { type: 'Esgoto aberto', count: 29 },
  ],
  reportsByStatus: [
    { status: 'Aberto', count: 287 },
    { status: 'Em análise', count: 126 },
    { status: 'Em execução', count: 98 },
    { status: 'Concluído', count: 834 },
    { status: 'Cancelado', count: 12 },
  ],
  trendData: [
    { month: 'Jan', reports: 156, resolved: 120 },
    { month: 'Fev', reports: 189, resolved: 145 },
    { month: 'Mar', reports: 234, resolved: 178 },
    { month: 'Abr', reports: 201, resolved: 167 },
    { month: 'Mai', reports: 245, resolved: 134 },
    { month: 'Jun', reports: 222, resolved: 90 },
  ],
};

export async function GET() {
  return NextResponse.json(dashboardData);
}
