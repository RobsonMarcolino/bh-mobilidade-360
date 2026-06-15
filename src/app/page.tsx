'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
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
import Carousel from '@/components/ui/Carousel';

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
      <section className="relative overflow-hidden text-white min-h-[600px] flex items-center">
        {/* Background Video without dark overlays */}
        <div className="absolute inset-0 z-0 bg-black">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="object-cover w-full h-full opacity-100"
          >
            <source src="/bh-mobilidade-360/hero-video.mp4" type="video/mp4" />
          </video>
          {/* Subtle gradient at the bottom just to blend with the wave nicely */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-50/80 to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] tracking-tight">
              BH Mobilidade
              <span className="block text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">360</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white mb-10 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-semibold max-w-3xl mx-auto">
              A plataforma cidadã inteligente para reportar, acompanhar e resolver
              problemas de <strong className="text-white font-bold drop-shadow-md">mobilidade e infraestrutura urbana</strong> em
              Belo Horizonte.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/reportar" className="btn-primary bg-primary-600 border border-primary-500 text-white hover:bg-primary-500 shadow-[0_8px_16px_rgb(0,0,0,0.4)] flex items-center gap-2 text-lg px-8 py-4">
                <AlertTriangle className="w-5 h-5" />
                Reportar Problema
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/mapa" className="btn-secondary bg-white text-primary-800 border-none hover:bg-gray-100 flex items-center gap-2 shadow-[0_8px_16px_rgb(0,0,0,0.4)] text-lg px-8 py-4">
                <MapPin className="w-5 h-5" />
                Ver Mapa
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-20 sm:h-24">
            <path d="M0 50L48 45C96 40 192 30 288 35C384 40 480 60 576 65C672 70 768 60 864 50C960 40 1056 30 1152 35C1248 40 1344 60 1392 70L1440 80V100H0V50Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      <div className="relative bg-gray-50">
        {/* Subtle dot pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60 z-0" />



      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight drop-shadow-sm">
            Tudo que BH precisa em um só lugar
          </h2>
          <p className="text-lg text-gray-600">
            Uma plataforma integrada para facilitar a sua vida na cidade, com as 
            ferramentas certas para cada necessidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card group hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100 bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-3xl flex flex-col justify-between"
              >
                <Link href={feature.href} className="block w-full h-full">
                  <div>
                    <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                      <Icon className={`w-7 h-7 bg-gradient-to-br ${feature.color} bg-clip-text`} style={{ color: feature.color.includes('orange') ? '#f97316' : feature.color.includes('blue') ? '#3b82f6' : feature.color.includes('green') ? '#22c55e' : feature.color.includes('cyan') ? '#06b6d4' : '#a855f7' }} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#005DAA] transition-colors">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">{feature.description}</p>
                  </div>
                  <div className="mt-8 flex items-center gap-2 text-sm font-bold text-[#005DAA] opacity-0 group-hover:opacity-100 transition-opacity">
                    Acessar Ferramenta <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Carousel Section (Substituiu o CTA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        <Carousel />
      </section>
      </div>
    </div>
  );
}
