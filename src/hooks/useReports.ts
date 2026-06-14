'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Report } from '@/types';

// Dados de demonstração
const DEMO_REPORTS: Report[] = [
  {
    id: '1',
    userId: 'demo',
    type: 'BURACO',
    severity: 'ALTA',
    description: 'Buraco grande na Av. Amazonas, próximo ao nº 1500. Risco de acidente para motos.',
    aiDescription: 'Cratera de aproximadamente 40cm de diâmetro na faixa da direita.',
    aiConfidence: 0.92,
    latitude: -19.9285,
    longitude: -43.9485,
    address: 'Av. Amazonas, 1500 - Centro',
    regional: 'CENTRO_SUL',
    bairro: 'Centro',
    photos: [],
    status: 'ABERTO',
    protocol: 'BH-20260614-00001',
    responsibleOrg: 'Secretaria de Obras e Infraestrutura',
    estimatedDays: 15,
    upvotes: 23,
    createdAt: '2026-06-12T10:30:00Z',
    updatedAt: '2026-06-12T10:30:00Z',
  },
  {
    id: '2',
    userId: 'demo',
    type: 'POSTE_APAGADO',
    severity: 'MEDIA',
    description: 'Poste apagado na Rua Padre Eustáquio, esquina com Rua Pium-í. Rua muito escura à noite.',
    latitude: -19.9145,
    longitude: -43.9567,
    address: 'Rua Padre Eustáquio, esq. Rua Pium-í',
    regional: 'NOROESTE',
    bairro: 'Padre Eustáquio',
    photos: [],
    status: 'EM_ANALISE',
    protocol: 'BH-20260613-00042',
    responsibleOrg: 'BHIP - BH Iluminação Pública',
    estimatedDays: 7,
    upvotes: 15,
    createdAt: '2026-06-11T18:00:00Z',
    updatedAt: '2026-06-13T09:00:00Z',
  },
  {
    id: '3',
    userId: 'demo',
    type: 'ALAGAMENTO',
    severity: 'CRITICA',
    description: 'Alagamento constante na Av. Vilarinho após chuvas. Água invade as casas.',
    latitude: -19.8133,
    longitude: -43.9567,
    address: 'Av. Vilarinho, 2000 - Venda Nova',
    regional: 'VENDA_NOVA',
    bairro: 'Venda Nova',
    photos: [],
    status: 'EM_EXECUCAO',
    protocol: 'BH-20260610-00088',
    responsibleOrg: 'SUDECAP',
    estimatedDays: 30,
    upvotes: 87,
    createdAt: '2026-06-08T20:15:00Z',
    updatedAt: '2026-06-14T08:00:00Z',
  },
  {
    id: '4',
    userId: 'demo',
    type: 'SEMAFORO_QUEBRADO',
    severity: 'ALTA',
    description: 'Semáforo no cruzamento da Av. Cristiano Machado com Rua Jacuí está piscando amarelo há 3 dias.',
    latitude: -19.8867,
    longitude: -43.9233,
    address: 'Av. Cristiano Machado, esq. Rua Jacuí',
    regional: 'NORDESTE',
    bairro: 'Cidade Nova',
    photos: [],
    status: 'ABERTO',
    protocol: 'BH-20260613-00055',
    responsibleOrg: 'BHTrans',
    estimatedDays: 5,
    upvotes: 34,
    createdAt: '2026-06-11T07:30:00Z',
    updatedAt: '2026-06-11T07:30:00Z',
  },
  {
    id: '5',
    userId: 'demo',
    type: 'LIXO_IRREGULAR',
    severity: 'MEDIA',
    description: 'Descarte irregular de entulho na Rua Itapecerica, Barreiro. Lixo tomando conta da calçada.',
    latitude: -20.0067,
    longitude: -44.0133,
    address: 'Rua Itapecerica, 350 - Barreiro',
    regional: 'BARREIRO',
    bairro: 'Barreiro',
    photos: [],
    status: 'ABERTO',
    protocol: 'BH-20260614-00012',
    responsibleOrg: 'SLU - Superintendência de Limpeza Urbana',
    estimatedDays: 10,
    upvotes: 8,
    createdAt: '2026-06-14T06:00:00Z',
    updatedAt: '2026-06-14T06:00:00Z',
  },
  {
    id: '6',
    userId: 'demo',
    type: 'CALCADA_DANIFICADA',
    severity: 'BAIXA',
    description: 'Calçada levantada por raiz de árvore na Av. Antônio Carlos, próximo à UFMG.',
    latitude: -19.8667,
    longitude: -43.9633,
    address: 'Av. Antônio Carlos, próx. UFMG - Pampulha',
    regional: 'PAMPULHA',
    bairro: 'Pampulha',
    photos: [],
    status: 'CONCLUIDO',
    protocol: 'BH-20260601-00033',
    responsibleOrg: 'Secretaria de Obras e Infraestrutura',
    estimatedDays: 20,
    upvotes: 5,
    resolvedAt: '2026-06-10T14:00:00Z',
    createdAt: '2026-06-01T11:00:00Z',
    updatedAt: '2026-06-10T14:00:00Z',
  },
];

export function useReports() {
  const [reports, setReports] = useState<Report[]>(DEMO_REPORTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = useCallback(async () => {
    // Em produção, buscar da API
    // Por enquanto, usa dados demo
    setReports(DEMO_REPORTS);
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const addReport = useCallback((report: Report) => {
    setReports((prev) => [report, ...prev]);
  }, []);

  return { reports, loading, error, fetchReports, addReport };
}
