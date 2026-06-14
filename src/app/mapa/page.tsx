'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useReports } from '@/hooks/useReports';
import { REPORT_TYPE_LABELS, SEVERITY_LABELS, STATUS_LABELS, REGIONAL_LABELS } from '@/types';
import { REPORT_TYPE_ICONS, SEVERITY_COLORS } from '@/utils/constants';
import { getSeverityColor, getStatusColor, timeAgo } from '@/utils/helpers';
import { Filter, MapPin, List, X } from 'lucide-react';
import type { Report, ReportType, Severity, Regional } from '@/types';

// Dynamic import do mapa (SSR disabled)
const MapComponent = dynamic(() => import('@/components/map/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center">
      <MapPin className="w-8 h-8 text-gray-300" />
    </div>
  ),
});

export default function MapaPage() {
  const { reports } = useReports();
  const [filterType, setFilterType] = useState<ReportType | ''>('');
  const [filterSeverity, setFilterSeverity] = useState<Severity | ''>('');
  const [filterRegional, setFilterRegional] = useState<Regional | ''>('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      if (filterType && r.type !== filterType) return false;
      if (filterSeverity && r.severity !== filterSeverity) return false;
      if (filterRegional && r.regional !== filterRegional) return false;
      return true;
    });
  }, [reports, filterType, filterSeverity, filterRegional]);

  const clearFilters = () => {
    setFilterType('');
    setFilterSeverity('');
    setFilterRegional('');
  };

  const hasFilters = filterType || filterSeverity || filterRegional;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mapa de BH</h1>
          <p className="text-gray-500">
            {filteredReports.length} problemas reportados
            {hasFilters && ' (filtrado)'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
            className="btn-secondary flex items-center gap-2 text-sm py-2"
          >
            {viewMode === 'map' ? <List className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
            {viewMode === 'map' ? 'Lista' : 'Mapa'}
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 text-sm py-2 px-4 rounded-2xl font-semibold transition-all ${
              showFilters ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filtros
            {hasFilters && (
              <span className="w-5 h-5 bg-white text-primary-600 rounded-full text-xs flex items-center justify-center font-bold">
                !
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="card mb-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value as ReportType)} className="input text-sm">
                <option value="">Todos</option>
                {Object.entries(REPORT_TYPE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Severidade</label>
              <select value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value as Severity)} className="input text-sm">
                <option value="">Todas</option>
                {Object.entries(SEVERITY_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Regional</label>
              <select value={filterRegional} onChange={(e) => setFilterRegional(e.target.value as Regional)} className="input text-sm">
                <option value="">Todas</option>
                {Object.entries(REGIONAL_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
          </div>
          {hasFilters && (
            <button onClick={clearFilters} className="mt-3 text-sm text-primary-500 hover:underline flex items-center gap-1">
              <X className="w-3 h-3" /> Limpar filtros
            </button>
          )}
        </motion.div>
      )}

      {/* Map or List View */}
      {viewMode === 'map' ? (
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <MapComponent
            reports={filteredReports}
            onSelectReport={setSelectedReport}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReports.map((report) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-hover cursor-pointer"
              onClick={() => setSelectedReport(report)}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{REPORT_TYPE_ICONS[report.type] || '📌'}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {REPORT_TYPE_LABELS[report.type]}
                    </h3>
                    <span className={`badge ${getSeverityColor(report.severity)}`}>
                      {SEVERITY_LABELS[report.severity]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{report.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {report.address}
                    </span>
                    <span>{timeAgo(report.createdAt)}</span>
                  </div>
                  <div className="mt-2">
                    <span className={`badge text-xs ${getStatusColor(report.status)}`}>
                      {STATUS_LABELS[report.status]}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Selected Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40" onClick={() => setSelectedReport(null)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 max-h-[80vh] overflow-y-auto"
          >
            <button onClick={() => setSelectedReport(null)} className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5 text-gray-400" />
            </button>
            <div className="text-center mb-4">
              <span className="text-4xl">{REPORT_TYPE_ICONS[selectedReport.type]}</span>
              <h2 className="text-xl font-bold text-gray-900 mt-2">
                {REPORT_TYPE_LABELS[selectedReport.type]}
              </h2>
              <p className="text-sm text-gray-400 font-mono">{selectedReport.protocol}</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Severidade</span>
                <span className={`badge ${getSeverityColor(selectedReport.severity)}`}>
                  {SEVERITY_LABELS[selectedReport.severity]}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <span className={`badge ${getStatusColor(selectedReport.status)}`}>
                  {STATUS_LABELS[selectedReport.status]}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Regional</span>
                <span className="text-sm font-medium">{REGIONAL_LABELS[selectedReport.regional]}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500 block mb-1">Descrição</span>
                <p className="text-sm text-gray-700">{selectedReport.description}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4" />
                {selectedReport.address}
              </div>
              {selectedReport.responsibleOrg && (
                <div className="bg-blue-50 rounded-2xl p-3">
                  <p className="text-xs text-blue-600 font-semibold">Órgão responsável:</p>
                  <p className="text-sm text-blue-800">{selectedReport.responsibleOrg}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
