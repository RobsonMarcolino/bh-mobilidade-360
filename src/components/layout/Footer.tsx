import { MapPin, Phone, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white font-bold">BH Mobilidade 360</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Plataforma cidadã para reportar e acompanhar problemas de
              mobilidade e infraestrutura urbana em Belo Horizonte.
            </p>
          </div>

          {/* Contatos úteis */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contatos Úteis</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>Central PBH: <strong className="text-white">156</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>BHTrans: <strong className="text-white">(31) 3277-6507</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>BHIP: <strong className="text-white">0800 001 0456</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>Defesa Civil: <strong className="text-white">199</strong></span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Links Oficiais</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://prefeitura.pbh.gov.br" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors">
                  <Globe className="w-4 h-4" />
                  Prefeitura de BH
                </a>
              </li>
              <li>
                <a href="https://dados.pbh.gov.br" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors">
                  <Globe className="w-4 h-4" />
                  Dados Abertos PBH
                </a>
              </li>
              <li>
                <a href="https://www.bhip.com.br" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors">
                  <Globe className="w-4 h-4" />
                  BHIP Iluminação
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs">
          <p>
            © {new Date().getFullYear()} BH Mobilidade 360 — Projeto de portfólio por{' '}
            <strong className="text-white">Robson Marcolino</strong>. Powered by Google Gemini AI.
          </p>
        </div>
      </div>
    </footer>
  );
}
