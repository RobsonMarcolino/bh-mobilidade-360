// ============================================
// BH Mobilidade 360 - Constants
// ============================================

// Coordenadas centrais de BH
export const BH_CENTER = {
  lat: -19.9167,
  lng: -43.9345,
};

export const BH_ZOOM = 12;

// Coordenadas aproximadas das regionais de BH
export const REGIONAL_COORDS: Record<string, { lat: number; lng: number }> = {
  BARREIRO: { lat: -20.0111, lng: -44.0139 },
  CENTRO_SUL: { lat: -19.9245, lng: -43.9352 },
  LESTE: { lat: -19.9167, lng: -43.9067 },
  NORDESTE: { lat: -19.8733, lng: -43.9133 },
  NOROESTE: { lat: -19.8917, lng: -43.9667 },
  NORTE: { lat: -19.8367, lng: -43.9533 },
  OESTE: { lat: -19.9433, lng: -43.9767 },
  PAMPULHA: { lat: -19.8567, lng: -43.9733 },
  VENDA_NOVA: { lat: -19.8033, lng: -43.9617 },
};

// Cores por severidade
export const SEVERITY_COLORS: Record<string, string> = {
  BAIXA: '#22C55E',
  MEDIA: '#F59E0B',
  ALTA: '#FF6B35',
  CRITICA: '#DC2626',
};

// Cores por status
export const STATUS_COLORS: Record<string, string> = {
  ABERTO: '#DC2626',
  EM_ANALISE: '#F59E0B',
  EM_EXECUCAO: '#3B82F6',
  CONCLUIDO: '#22C55E',
  CANCELADO: '#6B7280',
};

// Ícones por tipo de problema (emoji)
export const REPORT_TYPE_ICONS: Record<string, string> = {
  BURACO: '🕳️',
  POSTE_APAGADO: '💡',
  LIXO_IRREGULAR: '🗑️',
  ALAGAMENTO: '🌊',
  SEMAFORO_QUEBRADO: '🚦',
  CALCADA_DANIFICADA: '🚶',
  ARVORE_CAIDA: '🌳',
  ESGOTO_ABERTO: '🚰',
  OUTRO: '📌',
};

// Órgãos responsáveis
export const RESPONSIBLE_ORGS: Record<string, string> = {
  BURACO: 'Secretaria de Obras e Infraestrutura',
  POSTE_APAGADO: 'BHIP - BH Iluminação Pública',
  LIXO_IRREGULAR: 'SLU - Superintendência de Limpeza Urbana',
  ALAGAMENTO: 'SUDECAP - Superintendência de Desenvolvimento da Capital',
  SEMAFORO_QUEBRADO: 'BHTrans',
  CALCADA_DANIFICADA: 'Secretaria de Obras e Infraestrutura',
  ARVORE_CAIDA: 'Secretaria de Meio Ambiente',
  ESGOTO_ABERTO: 'COPASA',
  OUTRO: 'Prefeitura de BH - Central 156',
};

// Contatos úteis
export const USEFUL_CONTACTS = [
  { name: 'Central PBH', phone: '156', description: 'Atendimento geral da Prefeitura' },
  { name: 'BHTrans', phone: '(31) 3277-6507', description: 'Trânsito e transporte' },
  { name: 'BHIP', phone: '0800 001 0456', description: 'Iluminação pública' },
  { name: 'COPASA', phone: '115', description: 'Água e esgoto' },
  { name: 'Defesa Civil', phone: '199', description: 'Emergências e desastres' },
  { name: 'SAMU', phone: '192', description: 'Emergência médica' },
  { name: 'Bombeiros', phone: '193', description: 'Incêndio e resgate' },
  { name: 'SLU', phone: '(31) 3277-9390', description: 'Limpeza urbana' },
];

// Badges configuration
export const BADGE_CONFIG: Record<string, { label: string; icon: string; minReports: number }> = {
  FISCAL_DO_BAIRRO: { label: 'Fiscal do Bairro', icon: '🔍', minReports: 10 },
  GUARDIAO_DA_RUA: { label: 'Guardião da Rua', icon: '🛡️', minReports: 50 },
  OLHO_VIVO: { label: 'Olho Vivo', icon: '👁️', minReports: 100 },
  CIDADAO_EXEMPLAR: { label: 'Cidadão Exemplar', icon: '⭐', minReports: 200 },
  HEROI_URBANO: { label: 'Herói Urbano', icon: '🦸', minReports: 500 },
};

// Tarifa de transporte atual
export const TARIFA_MUNICIPAL = 6.25;
export const TARIFA_METROPOLITANA = 7.55;
