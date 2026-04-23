"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { IceCream, Tags, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    leads: 0
  });
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    async function fetchStats() {
      const [productsRes, categoriesRes, leadsRes] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('categories').select('*', { count: 'exact', head: true }),
        supabase.from('leads').select('*', { count: 'exact', head: true }),
      ]);

      setStats({
        products: productsRes.count || 0,
        categories: categoriesRes.count || 0,
        leads: leadsRes.count || 0
      });
    }

    fetchStats();
  }, [supabase]);

  const statCards = [
    { title: "Total de Produtos", value: stats.products, icon: IceCream, color: "bg-orange-100 text-orange-600" },
    { title: "Categorias", value: stats.categories, icon: Tags, color: "bg-blue-100 text-blue-600" },
    { title: "Leads de Franquia", value: stats.leads, icon: Users, color: "bg-green-100 text-green-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-black text-ink-900 tracking-tight">Visão Geral</h1>
        <p className="text-ink-500 mt-2">Bem-vindo ao painel de controle do site Chiquinho Sorvetes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, i) => (
          <motion.div 
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-ink-100 shadow-sm flex items-center gap-6"
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-ink-400 text-sm font-medium">{stat.title}</p>
              <h3 className="text-3xl font-display font-bold text-ink-900 mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-ink-100 shadow-sm p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-brand-soft/20 flex items-center justify-center text-brand-red">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-ink-900">Últimas Atividades</h2>
            <p className="text-ink-400 text-sm">Resumo das ações recentes no site.</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center py-12 text-ink-400">
          <p>As atividades recentes aparecerão aqui.</p>
        </div>
      </div>
    </div>
  );
}
