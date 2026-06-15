'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: "https://prefeitura.pbh.gov.br/sites/default/files/2026-05/gripe-2026-banner-home-ampliacao-13-05-26.png",
    link: "https://prefeitura.pbh.gov.br/vacinacao-influenza"
  },
  {
    image: "https://prefeitura.pbh.gov.br/sites/default/files/estrutura-de-governo/_banners/2026/projetos-transformadores.png",
    link: "https://prefeitura.pbh.gov.br/projetos-transformadores"
  },
  {
    image: "https://prefeitura.pbh.gov.br/sites/default/files/estrutura-de-governo/_banners/2026/ilumina-bh.png",
    link: "https://prefeitura.pbh.gov.br/obras/ilumina-bh"
  },
  {
    image: "https://prefeitura.pbh.gov.br/sites/default/files/estrutura-de-governo/_banners/2026/banner_JornadaProdutiva.png",
    link: "https://prefeitura.pbh.gov.br/desenvolvimento-economico/jornada-produtiva"
  },
  {
    image: "https://prefeitura.pbh.gov.br/sites/default/files/estrutura-de-governo/_banners/2026/atendimento-veterinario.png",
    link: "https://prefeitura.pbh.gov.br/meio-ambiente/hospital-veterinario"
  },
  {
    image: "https://prefeitura.pbh.gov.br/sites/default/files/estrutura-de-governo/_banners/2026/arraia-de-belo.png",
    link: "https://prefeitura.pbh.gov.br/belotur/arraia-de-belo-horizonte"
  }
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Auto-advance every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl border border-gray-200 bg-white group" style={{ aspectRatio: '1000/300' }}>
      <AnimatePresence initial={false} mode="wait">
        <motion.a
          key={currentIndex}
          href={slides[currentIndex].link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 block cursor-pointer"
        >
          {/* Using img tag because these domains are not configured in next.config.js */}
          <img
            src={slides[currentIndex].image}
            alt={`Banner da campanha ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </motion.a>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button 
        onClick={(e) => { e.preventDefault(); prevSlide(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      <button 
        onClick={(e) => { e.preventDefault(); nextSlide(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.preventDefault(); setCurrentIndex(idx); }}
            className={`w-3 h-3 rounded-full shadow-sm transition-all ${
              idx === currentIndex ? 'bg-[#005DAA] scale-125' : 'bg-white/80 hover:bg-white'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
