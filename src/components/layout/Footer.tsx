import { Facebook, Instagram, Linkedin, MessageCircle, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#005DAA] text-white py-6 md:py-8 font-sans mt-0 relative z-10 w-full">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col xl:flex-row justify-between items-center gap-8 xl:gap-4">
        
        {/* Left: PBH Logo Area */}
        <div className="flex items-center">
          <img 
            src="https://prefeitura.pbh.gov.br/themes/gavias_vinor/logo-pbh.svg" 
            alt="Prefeitura de Belo Horizonte" 
            className="h-14 md:h-[72px] w-auto drop-shadow-sm" 
          />
        </div>

        {/* Center: Social & Info */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex items-center gap-4 md:gap-5">
            <a href="#" className="hover:opacity-80 transition-opacity"><Facebook className="w-6 h-6 fill-current" /></a>
            <a href="#" className="hover:opacity-80 transition-opacity"><Instagram className="w-6 h-6" /></a>
            <a href="#" className="hover:opacity-80 transition-opacity"><Linkedin className="w-6 h-6 fill-current" /></a>
            {/* TikTok SVG */}
            <a href="#" className="hover:opacity-80 transition-opacity">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.68a6.34 6.34 0 0012.67.6V8.6a8.36 8.36 0 004.77 1.52v-3.4a4.83 4.83 0 01-2.85-.03z"/></svg>
            </a>
            {/* WhatsApp SVG */}
            <a href="#" className="hover:opacity-80 transition-opacity">
              <svg className="w-[26px] h-[26px] fill-current" viewBox="0 0 24 24"><path d="M12.031 2C6.48 2 1.984 6.496 1.984 12.047c0 1.77.464 3.493 1.346 5.01L2 22l5.068-1.328a10.02 10.02 0 004.962 1.32h.004c5.55 0 10.046-4.496 10.046-10.047S17.58 2 12.03 2zm0 18.272c-1.498 0-2.966-.402-4.25-1.164l-.304-.18-3.16.828.84-3.08-.198-.314A8.258 8.258 0 013.784 12.05c0-4.55 3.702-8.252 8.25-8.252 2.205 0 4.276.86 5.836 2.42 1.558 1.56 2.416 3.633 2.416 5.84 0 4.552-3.702 8.254-8.252 8.254h-.003z"/></svg>
            </a>
            {/* X (Twitter) SVG */}
            <a href="#" className="hover:opacity-80 transition-opacity">
              <svg className="w-[22px] h-[22px] fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            {/* Flickr SVG */}
            <a href="#" className="hover:opacity-80 transition-opacity">
              <svg className="w-[26px] h-[26px] fill-current" viewBox="0 0 24 24"><path d="M6.5 16.5A4.5 4.5 0 1111 12a4.5 4.5 0 01-4.5 4.5zM17.5 16.5A4.5 4.5 0 1122 12a4.5 4.5 0 01-4.5 4.5z"/></svg>
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity"><Youtube className="w-[28px] h-[28px] fill-current" /></a>
          </div>
          <div className="text-[13px] md:text-sm tracking-wide mt-1">
            <p>Av. Afonso Pena, 1212 - Centro | 30130-003</p>
            <p className="mt-1">
              <a href="#" className="hover:underline">Política de privacidade</a> | <a href="#" className="hover:underline">Mapa do site</a>
            </p>
          </div>
        </div>

        {/* Right: CTA Button */}
        <div>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 bg-white text-[#005DAA] font-bold text-[15px] px-8 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
          >
            <MessageCircle className="w-5 h-5 fill-[#005DAA]" />
            FALE COM A PBH
          </a>
        </div>
        
      </div>
    </footer>
  );
}
