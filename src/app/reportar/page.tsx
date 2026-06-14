'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { useGeolocation } from '@/hooks/useGeolocation';
import {
  Camera,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  Upload,
  Sparkles,
  AlertTriangle,
  X,
} from 'lucide-react';
import { REPORT_TYPE_LABELS, SEVERITY_LABELS, REGIONAL_LABELS } from '@/types';
import type { ReportType, Severity, Regional, AIClassification } from '@/types';

export default function ReportarPage() {
  const { latitude, longitude, loading: geoLoading } = useGeolocation();
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [type, setType] = useState<ReportType | ''>('');
  const [severity, setSeverity] = useState<Severity | ''>('');
  const [regional, setRegional] = useState<Regional | ''>('');
  const [address, setAddress] = useState('');
  const [bairro, setBairro] = useState('');
  const [isClassifying, setIsClassifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [protocol, setProtocol] = useState('');
  const [aiResult, setAiResult] = useState<AIClassification | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.slice(0, 3);
    setPhotos((prev) => [...prev, ...newFiles].slice(0, 3));

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviews((prev) => [...prev, reader.result as string].slice(0, 3));
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 3,
    maxSize: 10 * 1024 * 1024,
  });

  const classifyWithAI = async () => {
    if (photos.length === 0) return;

    setIsClassifying(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const response = await fetch('/api/ai/classify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: base64,
            mimeType: photos[0].type,
          }),
        });
        const data = await response.json();
        if (data.classification) {
          setAiResult(data.classification);
          setType(data.classification.tipo);
          setSeverity(data.classification.severidade);
          setDescription(data.classification.descricao);
        }
        setIsClassifying(false);
      };
      reader.readAsDataURL(photos[0]);
    } catch (error) {
      console.error('Erro na classificação:', error);
      setIsClassifying(false);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!type || !severity || !description || !regional) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          severity,
          description,
          regional,
          address: address || 'Endereço não informado',
          bairro: bairro || 'Não informado',
          latitude: latitude || -19.9167,
          longitude: longitude || -43.9345,
          userId: 'demo',
        }),
      });
      const data = await response.json();
      setProtocol(data.report.protocol);
      setSubmitted(true);
    } catch (error) {
      console.error('Erro ao enviar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Problema Reportado!</h1>
          <p className="text-gray-500 mb-6">Seu protocolo de acompanhamento:</p>
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <p className="text-2xl font-mono font-bold text-primary-600">{protocol}</p>
          </div>
          <p className="text-sm text-gray-500 mb-8">
            Guarde este número para acompanhar o andamento da sua solicitação.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => { setSubmitted(false); setPhotos([]); setPreviews([]); setDescription(''); setType(''); setSeverity(''); setAiResult(null); }} className="btn-primary">
              Reportar Outro
            </button>
            <a href="/mapa" className="btn-secondary">Ver no Mapa</a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reportar Problema</h1>
          <p className="text-gray-500">
            Tire uma foto do problema e nossa IA irá classificá-lo automaticamente.
          </p>
        </div>

        {/* Step 1: Foto */}
        <div className="card mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary-500" />
            1. Adicione fotos
          </h2>

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-500">
              {isDragActive ? 'Solte a foto aqui...' : 'Arraste fotos ou clique para selecionar'}
            </p>
            <p className="text-xs text-gray-400 mt-1">Máximo 3 fotos, 10MB cada</p>
          </div>

          {/* Previews */}
          {previews.length > 0 && (
            <div className="flex gap-3 mt-4">
              {previews.map((preview, i) => (
                <div key={i} className="relative w-24 h-24 rounded-2xl overflow-hidden">
                  <img src={preview} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => removePhoto(i)} className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* AI Classify Button */}
          {photos.length > 0 && !aiResult && (
            <button onClick={classifyWithAI} disabled={isClassifying} className="btn-primary mt-4 flex items-center gap-2 mx-auto">
              {isClassifying ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Analisando com IA...</>
              ) : (
                <><Sparkles className="w-4 h-4" /> Classificar com IA</>
              )}
            </button>
          )}

          {/* AI Result */}
          {aiResult && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">Classificação da IA (Confiança: {Math.round((aiResult.confianca || 0) * 100)}%)</span>
              </div>
              <p className="text-sm text-blue-700">{aiResult.descricao}</p>
              <p className="text-xs text-blue-500 mt-1">💡 {aiResult.recomendacao}</p>
            </motion.div>
          )}
        </div>

        {/* Step 2: Detalhes */}
        <div className="card mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning-500" />
            2. Detalhes do problema
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo do problema</label>
              <select value={type} onChange={(e) => setType(e.target.value as ReportType)} className="input">
                <option value="">Selecione...</option>
                {Object.entries(REPORT_TYPE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Severidade</label>
              <select value={severity} onChange={(e) => setSeverity(e.target.value as Severity)} className="input">
                <option value="">Selecione...</option>
                {Object.entries(SEVERITY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descreva o problema com detalhes..." rows={3} className="input resize-none" />
            </div>
          </div>
        </div>

        {/* Step 3: Localização */}
        <div className="card mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-success-500" />
            3. Localização
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Regional</label>
                <select value={regional} onChange={(e) => setRegional(e.target.value as Regional)} className="input">
                  <option value="">Selecione...</option>
                  {Object.entries(REGIONAL_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                <input value={bairro} onChange={(e) => setBairro(e.target.value)} placeholder="Ex: Savassi" className="input" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Endereço / Referência</label>
              <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Ex: Av. Amazonas, 1500 - próximo ao metrô" className="input" />
            </div>

            {latitude && longitude && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <MapPin className="w-4 h-4" />
                <span>GPS: {latitude.toFixed(4)}, {longitude.toFixed(4)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <button onClick={handleSubmit} disabled={!type || !severity || !description || !regional || isSubmitting} className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</>
          ) : (
            <><Send className="w-5 h-5" /> Enviar Relatório</>
          )}
        </button>
      </motion.div>
    </div>
  );
}
