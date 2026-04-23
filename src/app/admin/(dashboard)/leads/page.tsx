"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { Search, Mail, Phone, Calendar } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  status: string;
  created_at: string;
}

export default function LeadsAdmin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    void (async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) console.error('Erro ao buscar leads:', error);
      if (data) setLeads(data);
      setLoading(false);
    })();
  }, [supabase]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-black text-ink-900 tracking-tight">Leads (Franquia)</h1>
          <p className="text-ink-500 mt-1">Gerencie os contatos recebidos pelo formulário do site.</p>
        </div>
      </div>

      <div className="bg-white border border-ink-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-ink-100 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
            <input 
              type="text" 
              placeholder="Buscar por nome ou email..." 
              className="w-full pl-10 pr-4 py-2 border border-ink-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-brand-red"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cream-50 text-ink-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Contato</th>
                <th className="px-6 py-4 font-medium">Dados</th>
                <th className="px-6 py-4 font-medium">Mensagem</th>
                <th className="px-6 py-4 font-medium">Data</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-ink-400">Carregando leads...</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-ink-400">Nenhum formulário recebido ainda.</td></tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-cream-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-ink-900 text-sm">{lead.name}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-ink-500 space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3" /> {lead.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3" /> {lead.phone || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <p className="text-ink-500 line-clamp-2 max-w-xs">{lead.message || '-'}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-ink-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
