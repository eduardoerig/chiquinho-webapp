"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { Plus, Edit2, Trash2, Search, X, Save, Loader2 } from "lucide-react";

interface Category {
  id: string;
  label: string;
  slug: string;
  created_at?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const supabase = useMemo(() => createClient(), []);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    label: "",
    slug: ""
  });
  const [isSaving, setIsSaving] = useState(false);

  const fetchCategories = useCallback(async () => {
    const { data, error } = await supabase.from('categories').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error(error);
      alert(`Erro ao buscar categorias: ${error.message}`);
    }
    if (data) setCategories(data);
    setLoading(false);


  }, [supabase]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  async function handleDelete(id: string) {
    if (confirm("Tem certeza que deseja excluir esta categoria? Produtos associados ficarão sem categoria.")) {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) alert(`Erro ao excluir: ${error.message}`);
      else fetchCategories();
    }
  }

  function openCreateModal() {
    setModalMode("create");
    setEditingCategory(null);
    setFormData({ label: "", slug: "" });
    setIsModalOpen(true);
  }

  function openEditModal(category: Category) {
    setModalMode("edit");
    setEditingCategory(category);
    setFormData({
      label: category.label || "",
      slug: category.slug || ""
    });
    setIsModalOpen(true);
  }

  function handleLabelChange(value: string) {
    setFormData({
      label: value,
      slug: modalMode === "create" ? slugify(value) : formData.slug
    });
  }

  async function handleSaveCategory() {
    if (!formData.label.trim()) {
      alert("O nome da categoria é obrigatório.");
      return;
    }
    if (!formData.slug.trim()) {
      alert("O slug é obrigatório.");
      return;
    }

    setIsSaving(true);
    let errorResult;

    if (modalMode === "create") {
      const { error } = await supabase.from('categories').insert([formData]);
      errorResult = error;
    } else if (editingCategory) {
      const { error } = await supabase.from('categories').update(formData).eq('id', editingCategory.id);
      errorResult = error;
    }

    setIsSaving(false);

    if (errorResult) {
      alert(`Erro ao salvar categoria: ${errorResult.message}`);
      console.error(errorResult);
    } else {
      setIsModalOpen(false);
      fetchCategories();
    }
  }

  const filteredCategories = useMemo(() => {
    return categories.filter(cat => {
      const search = searchTerm.toLowerCase();
      return (
        cat.label.toLowerCase().includes(search) ||
        cat.slug.toLowerCase().includes(search)
      );
    });
  }, [categories, searchTerm]);

  return (
    <>
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-black text-ink-900 tracking-tight">Categorias</h1>
          <p className="text-ink-500 mt-1">Gerencie as categorias do cardápio.</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-brand-red text-white px-5 py-2.5 rounded-xl font-bold hover:bg-brand-red/90 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Nova Categoria
        </button>
      </div>

      <div className="bg-white border border-ink-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-ink-100 flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
            <input 
              type="text" 
              placeholder="Buscar categorias..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-ink-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-brand-red"
            />
          </div>
          <span className="text-xs text-ink-400 font-medium whitespace-nowrap">
            {filteredCategories.length} {filteredCategories.length === 1 ? 'categoria' : 'categorias'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cream-50 text-ink-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Nome da Categoria</th>
                <th className="px-6 py-4 font-medium">Slug (URL)</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {loading ? (
                <tr><td colSpan={3} className="p-8 text-center text-ink-400">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-brand-red" />
                  Carregando categorias...
                </td></tr>
              ) : filteredCategories.length === 0 ? (
                <tr><td colSpan={3} className="p-8 text-center text-ink-400">Nenhuma categoria encontrada.</td></tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-cream-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-ink-900 text-sm">{category.label}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-ink-500">
                      <code className="bg-ink-100/50 px-2 py-0.5 rounded text-xs">{category.slug}</code>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(category)}
                          className="p-2 text-ink-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(category.id)}
                          className="p-2 text-ink-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-ink-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-ink-900">
                {modalMode === 'create' ? 'Nova Categoria' : 'Editar Categoria'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-ink-400 hover:text-ink-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-sm font-bold text-ink-700 mb-1">Nome da Categoria</label>
                <input 
                  type="text" 
                  value={formData.label}
                  onChange={e => handleLabelChange(e.target.value)}
                  placeholder="Ex: Milk Shakes"
                  className="w-full px-4 py-2 border border-ink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-ink-700 mb-1">Slug (URL)</label>
                <input 
                  type="text" 
                  value={formData.slug}
                  onChange={e => setFormData({...formData, slug: e.target.value})}
                  placeholder="Ex: milk-shakes"
                  className="w-full px-4 py-2 border border-ink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red font-mono text-sm"
                />
                <p className="text-xs text-ink-400 mt-1">Gerado automaticamente. Use letras minúsculas, sem acentos, separadas por hífen.</p>
              </div>
            </div>

            <div className="p-6 border-t border-ink-100 bg-cream-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 text-sm font-bold text-ink-600 hover:bg-ink-100 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSaveCategory}
                disabled={isSaving || !formData.label.trim()}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-brand-red hover:bg-brand-red/90 rounded-xl transition-colors disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isSaving ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
