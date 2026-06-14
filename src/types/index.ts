// ============================================
// BH Mobilidade 360 - Type Definitions
// ============================================

export type ReportType =
  | 'BURACO'
  | 'POSTE_APAGADO'
  | 'LIXO_IRREGULAR'
  | 'ALAGAMENTO'
  | 'SEMAFORO_QUEBRADO'
  | 'CALCADA_DANIFICADA'
  | 'ARVORE_CAIDA'
  | 'ESGOTO_ABERTO'
  | 'OUTRO';

export type Severity = 'BAIXA' | 'MEDIA' | 'ALTA' | 'CRITICA';

export type ReportStatus =
  | 'ABERTO'
  | 'EM_ANALISE'
  | 'EM_EXECUCAO'
  | 'CONCLUIDO'
  | 'CANCELADO';

export type Regional =
  | 'BARREIRO'
  | 'CENTRO_SUL'
  | 'LESTE'
  | 'NORDESTE'
  | 'NOROESTE'
  | 'NORTE'
  | 'OESTE'
  | 'PAMPULHA'
  | 'VENDA_NOVA';

export type BadgeType =
  | 'FISCAL_DO_BAIRRO'
  | 'GUARDIAO_DA_RUA'
  | 'OLHO_VIVO'
  | 'CIDADAO_EXEMPLAR'
  | 'HEROI_URBANO';

export interface Report {
  id: string;
  userId: string;
  type: ReportType;
  severity: Severity;
  description: string;
  aiDescription?: string;
  aiConfidence?: number;
  latitude: number;
  longitude: number;
  address: string;
  regional: Regional;
  bairro: string;
  photos: Photo[];
  status: ReportStatus;
  protocol: string;
  responsibleOrg?: string;
  estimatedDays?: number;
  upvotes: number;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
  user?: UserProfile;
}

export interface Photo {
  id: string;
  reportId: string;
  url: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  points: number;
  badges: Badge[];
  createdAt: string;
}

export interface Badge {
  id: string;
  type: BadgeType;
  earnedAt: string;
}

export interface Rating {
  id: string;
  userId: string;
  lineCode: string;
  lineName: string;
  lotacao: number;
  pontualidade: number;
  limpeza: number;
  conforto: number;
  comment?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'USER' | 'ASSISTANT';
  content: string;
  createdAt: string;
}

export interface AIClassification {
  tipo: ReportType;
  severidade: Severity;
  descricao: string;
  orgao_responsavel: string;
  confianca: number;
  recomendacao: string;
}

export interface DashboardStats {
  totalReports: number;
  resolvedReports: number;
  avgResolutionDays: number;
  reportsByRegional: { regional: string; count: number }[];
  reportsByType: { type: string; count: number }[];
  reportsByStatus: { status: string; count: number }[];
  recentReports: Report[];
  trendData: { month: string; reports: number; resolved: number }[];
}

export interface TransportLine {
  code: string;
  name: string;
  type: 'CONVENCIONAL' | 'MOVE' | 'SUPLEMENTAR' | 'METRO';
  avgRating: number;
  totalRatings: number;
}

export const REPORT_TYPE_LABELS: Record<ReportType, string> = {
  BURACO: 'Buraco na via',
  POSTE_APAGADO: 'Poste apagado',
  LIXO_IRREGULAR: 'Lixo irregular',
  ALAGAMENTO: 'Alagamento',
  SEMAFORO_QUEBRADO: 'Semáforo quebrado',
  CALCADA_DANIFICADA: 'Calçada danificada',
  ARVORE_CAIDA: 'Árvore caída',
  ESGOTO_ABERTO: 'Esgoto aberto',
  OUTRO: 'Outro',
};

export const SEVERITY_LABELS: Record<Severity, string> = {
  BAIXA: 'Baixa',
  MEDIA: 'Média',
  ALTA: 'Alta',
  CRITICA: 'Crítica',
};

export const STATUS_LABELS: Record<ReportStatus, string> = {
  ABERTO: 'Aberto',
  EM_ANALISE: 'Em análise',
  EM_EXECUCAO: 'Em execução',
  CONCLUIDO: 'Concluído',
  CANCELADO: 'Cancelado',
};

export const REGIONAL_LABELS: Record<Regional, string> = {
  BARREIRO: 'Barreiro',
  CENTRO_SUL: 'Centro-Sul',
  LESTE: 'Leste',
  NORDESTE: 'Nordeste',
  NOROESTE: 'Noroeste',
  NORTE: 'Norte',
  OESTE: 'Oeste',
  PAMPULHA: 'Pampulha',
  VENDA_NOVA: 'Venda Nova',
};
