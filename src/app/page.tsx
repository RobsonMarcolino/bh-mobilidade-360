'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  MapPin,
  AlertTriangle,
  Bus,
  BarChart3,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
} from 'lucide-react';

const features = [
  {
    icon: AlertTriangle,
    title: 'Reportar Problema',
    description: 'Tire uma foto e a IA classifica automaticamente o tipo e a severidade do problema.',
    href: '/reportar',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
  },
  {
    icon: MapPin,
    title: 'Mapa Colaborativo',
    description: 'Veja todos os problemas reportados em BH no mapa interativo em tempo real.',
    href: '/mapa',
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Bus,
    title: 'Transporte Público',
    description: 'Consulte linhas de ônibus, MOVE e metrô com avaliações dos usuários.',
    href: '/transporte',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: BarChart3,
    title: 'Dashboard',
    description: 'Indicadores de qualidade urbana por regional com gráficos interativos.',
    href: '/dashboard',
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: MessageSquare,
    title: 'Chat IA',
    description: 'Pergunte qualquer coisa sobre mobilidade e infraestrutura de BH.',
    href: '/chat',
    color: 'from-cyan-500 to-blue-500',
    bgColor: 'bg-cyan-50',
  },
];

const stats = [
  { icon: TrendingUp, value: '1.247', label: 'Problemas Reportados', color: 'text-blue-600' },
  { icon: CheckCircle2, value: '834', label: 'Resolvidos', color: 'text-green-600' },
  { icon: Users, value: '3.456', label: 'Cidadãos Ativos', color: 'text-purple-600' },
  { icon: Clock, value: '12 dias', label: 'Tempo Médio Resolução', color: 'text-orange-600' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-blue-600 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Powered by Google Gemini AI
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              BH Mobilidade
              <span className="block text-blue-200">360</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
              A plataforma cidadã inteligente para reportar, acompanhar e resolver
              problemas de <strong className="text-white">mobilidade e infraestrutura urbana</strong> em
              Belo Horizonte.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/reportar" className="btn-primary bg-white text-primary-600 hover:bg-blue-50 shadow-xl flex items-center gap-2 text-base">
                <AlertTriangle className="w-5 h-5" />
                Reportar Problema
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/mapa" className="btn-secondary bg-white/10 text-white border border-white/20 hover:bg-white/20 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Ver Mapa
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 50L48 45C96 40 192 30 288 35C384 40 480 60 576 65C672 70 768 60 864 50C960 40 1056 30 1152 35C1248 40 1344 60 1392 70L1440 80V100H0V50Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card text-center"
              >
                <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Tudo que BH precisa em um só lugar
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Ferramentas inteligentes para você, cidadão de Belo Horizonte, fazer a diferença na sua cidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <Link href={feature.href} className="card-hover block group">
                  <div className={`w-14 h-14 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-7 h-7 bg-gradient-to-br ${feature.color} bg-clip-text`} style={{ color: feature.color.includes('orange') ? '#f97316' : feature.color.includes('blue') ? '#3b82f6' : feature.color.includes('green') ? '#22c55e' : feature.color.includes('purple') ? '#a855f7' : '#06b6d4' }} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    Acessar <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-br from-primary-500 to-blue-600 rounded-3xl p-8 sm:p-12 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Sua voz transforma BH 🏙️
          </h2>
          <p className="text-blue-100 max-w-xl mx-auto mb-8">
            Cada problema reportado é um passo para uma Belo Horizonte melhor.
            Junte-se a milhares de cidadãos que já estão fazendo a diferença.
          </p>
          <Link href="/reportar" className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-blue-50 transition-all active:scale-95">
            Comece Agora <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
