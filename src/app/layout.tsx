import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'BH Mobilidade 360 | Plataforma Cidadã de BH',
  description:
    'Reporte problemas urbanos, consulte transporte público e acompanhe a infraestrutura de Belo Horizonte com inteligência artificial.',
  keywords: ['BH', 'Belo Horizonte', 'mobilidade', 'transporte', 'infraestrutura', 'buracos', 'IA'],
  authors: [{ name: 'Robson Marcolino' }],
  openGraph: {
    title: 'BH Mobilidade 360',
    description: 'Plataforma cidadã inteligente para mobilidade e infraestrutura urbana de BH',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
