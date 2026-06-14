// ============================================
// BH Mobilidade 360 - Helper Functions
// ============================================

import { v4 as uuidv4 } from 'uuid';

/**
 * Gera um protocolo único para o report
 * Formato: BH-YYYYMMDD-XXXXX
 */
export function generateProtocol(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 99999)
    .toString()
    .padStart(5, '0');
  return `BH-${date}-${random}`;
}

/**
 * Formata data para exibição
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Formata data e hora
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Tempo relativo (ex: "há 2 horas")
 */
export function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'agora mesmo';
  if (seconds < 3600) return `há ${Math.floor(seconds / 60)} min`;
  if (seconds < 86400) return `há ${Math.floor(seconds / 3600)}h`;
  if (seconds < 2592000) return `há ${Math.floor(seconds / 86400)} dias`;
  return formatDate(dateString);
}

/**
 * Trunca texto com ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Gera cor baseada na severidade
 */
export function getSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    BAIXA: 'bg-green-100 text-green-800',
    MEDIA: 'bg-yellow-100 text-yellow-800',
    ALTA: 'bg-orange-100 text-orange-800',
    CRITICA: 'bg-red-100 text-red-800',
  };
  return colors[severity] || 'bg-gray-100 text-gray-800';
}

/**
 * Gera cor baseada no status
 */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    ABERTO: 'bg-red-100 text-red-800',
    EM_ANALISE: 'bg-yellow-100 text-yellow-800',
    EM_EXECUCAO: 'bg-blue-100 text-blue-800',
    CONCLUIDO: 'bg-green-100 text-green-800',
    CANCELADO: 'bg-gray-100 text-gray-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

/**
 * Calcula distância entre dois pontos (Haversine)
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Classnames merge utility
 */
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
