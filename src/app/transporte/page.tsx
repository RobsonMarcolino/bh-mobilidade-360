'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Bus,
  Train,
  Search,
  Star,
  Filter,
  Users,
  Clock,
  Sparkles,
} from 'lucide-react';
import { TARIFA_MUNICIPAL, TARIFA_METROPOLITANA } from '@/utils/constants';
import type { TransportLine } from '@/types';

const transportLinesData: TransportLine[] = [
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

export default function TransportePage() {
  const [lines, setLines] = useState<TransportLine[]>([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLines();
  }, [filterType]);

  const fetchLines = () => {
    setLoading(true);
    let filtered = [...transportLinesData];
    const query = search.toLowerCase();

    if (query) {
      filtered = filtered.filter(
        (l) => l.name.toLowerCase().includes(query) || l.code.toLowerCase().includes(query)
      );
    }

    if (filterType) {
      filtered = filtered.filter((l) => l.type === filterType);
    }

    setLines(filtered);
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLines();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'METRO': return <Train className="w-5 h-5 text-blue-600" />;
      case 'MOVE': return <Bus className="w-5 h-5 text-green-600" />;
      default: return <Bus className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'METRO': return 'Metrô';
      case 'MOVE': return 'MOVE';
      case 'SUPLEMENTAR': return 'Suplementar';
      default: return 'Convencional';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'METRO': return 'bg-blue-100 text-blue-800';
      case 'MOVE': return 'bg-green-100 text-green-800';
      case 'SUPLEMENTAR': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
      />
    ));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Transporte Público</h1>
        <p className="text-gray-500">Consulte linhas, avaliações e informações do transporte de BH.</p>
      </div>

      {/* Tarifa Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="card bg-gradient-to-br from-blue-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Bus className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tarifa Municipal</p>
              <p className="text-2xl font-bold text-gray-900">R$ {TARIFA_MUNICIPAL.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="card bg-gradient-to-br from-green-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <Train className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tarifa Metropolitana</p>
              <p className="text-2xl font-bold text-gray-900">R$ {TARIFA_METROPOLITANA.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="card mb-6">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar linha por nome ou código..."
              className="input pl-10"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="input w-auto"
          >
            <option value="">Todos</option>
            <option value="CONVENCIONAL">Convencional</option>
            <option value="MOVE">MOVE</option>
            <option value="METRO">Metrô</option>
          </select>
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Search className="w-4 h-4" /> Buscar
          </button>
        </form>
      </div>

      {/* Lines List */}
      <div className="space-y-4">
        {lines.map((line, i) => (
          <motion.div
            key={line.code}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card-hover"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {getTypeIcon(line.type)}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-primary-600">{line.code}</span>
                    <span className={`badge text-xs ${getTypeBadgeColor(line.type)}`}>
                      {getTypeLabel(line.type)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{line.name}</h3>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  {renderStars(line.avgRating)}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  <Users className="w-3 h-3 inline mr-1" />
                  {line.totalRatings} avaliações
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {lines.length === 0 && !loading && (
          <div className="text-center py-12">
            <Bus className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400">Nenhuma linha encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
}
