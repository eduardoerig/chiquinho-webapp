"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, IceCream, Tags, Users, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const menuItems = [
  { name: "Visão Geral", icon: LayoutDashboard, path: "/admin" },
  { name: "Produtos", icon: IceCream, path: "/admin/products" },
  { name: "Categorias", icon: Tags, path: "/admin/categories" },
  { name: "Leads (Franquia)", icon: Users, path: "/admin/leads" },
  { name: "Configurações", icon: Settings, path: "/admin/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    // Simulando logout ou fazendo real caso tenha Auth
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 bg-white border-r border-ink-100 min-h-screen flex flex-col">
      <div className="h-20 flex items-center px-8 border-b border-ink-100">
        <span className="text-xl font-display font-black text-brand-red tracking-tight">Chiquinho <span className="text-ink-900">Admin</span></span>
      </div>

      <nav className="flex-1 py-8 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-medium text-sm",
                isActive 
                  ? "bg-brand-red text-white shadow-md shadow-brand-red/20" 
                  : "text-ink-500 hover:bg-cream-50 hover:text-brand-red"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-ink-400 group-hover:text-brand-red")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-ink-100">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-ink-500 hover:bg-red-50 hover:text-brand-red transition-colors text-sm font-medium"
        >
          <LogOut className="w-5 h-5" />
          Sair do Sistema
        </button>
      </div>
    </aside>
  );
}
