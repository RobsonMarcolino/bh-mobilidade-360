import { FileText, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const mockTickets = [
  {
    id: 'REQ-202606-001',
    title: 'Buraco na via principal',
    date: '14 Jun 2026',
    status: 'Em Análise',
    location: 'Av. Afonso Pena, 1200 - Centro',
    icon: Clock,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    statusColor: 'bg-orange-100 text-orange-700'
  },
  {
    id: 'REQ-202605-089',
    title: 'Lâmpada do poste queimada',
    date: '28 Mai 2026',
    status: 'Resolvido',
    location: 'Rua da Bahia, 800 - Lourdes',
    icon: CheckCircle2,
    color: 'text-green-500',
    bg: 'bg-green-50',
    statusColor: 'bg-green-100 text-green-700'
  },
  {
    id: 'REQ-202605-042',
    title: 'Foco de dengue em lote vago',
    date: '15 Mai 2026',
    status: 'Em Execução',
    location: 'Rua São Paulo, 1500 - Savassi',
    icon: AlertCircle,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    statusColor: 'bg-blue-100 text-blue-700'
  }
];

export default function SolicitacoesPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Minhas Solicitações</h1>
          <p className="text-gray-600">Acompanhe o andamento dos problemas que você reportou na cidade.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          {mockTickets.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Nenhuma solicitação encontrada</h3>
              <p className="text-gray-500 mt-1">Você ainda não reportou nenhum problema.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {mockTickets.map((ticket) => {
                const Icon = ticket.icon;
                return (
                  <div key={ticket.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between sm:items-center flex-col sm:flex-row gap-4">
                      
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-2xl ${ticket.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                          <Icon className={`w-6 h-6 ${ticket.color}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-sm font-medium text-gray-500">{ticket.id}</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${ticket.statusColor}`}>
                              {ticket.status}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#005DAA] transition-colors">
                            {ticket.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{ticket.date}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="truncate">{ticket.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="w-full sm:w-auto mt-2 sm:mt-0 text-right">
                        <button className="text-[#005DAA] font-semibold text-sm hover:underline">
                          Ver detalhes
                        </button>
                      </div>
                      
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
