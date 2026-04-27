"use client";

import { sectionTypes, type SectionRegistryEntry } from "./sections/registry";
import { useEditorStore } from "@/stores/editorStore";
import { cn } from "@/lib/utils";

export function SectionLibrary() {
  const { sections, addSection } = useEditorStore();

  const canAdd = (entry: SectionRegistryEntry) => {
    if (!entry.maxInstances) return true;
    const count = sections.filter((s) => s.type === entry.type).length;
    return count < entry.maxInstances;
  };

  return (
    <div className="w-64 border-r border-ink-100 bg-white flex flex-col h-full overflow-hidden">
      <div className="px-4 py-4 border-b border-ink-100">
        <h3 className="font-display font-bold text-ink-900 text-sm">Seções</h3>
        <p className="text-[11px] text-ink-400 mt-0.5">Clique para adicionar</p>
      </div>

      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-1">
        {sectionTypes.map((entry) => {
          const disabled = !canAdd(entry);
          const Icon = entry.icon;

          return (
            <button
              key={entry.type}
              onClick={() => !disabled && addSection(entry.type)}
              disabled={disabled}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all group",
                disabled
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-brand-red/5 hover:text-brand-red cursor-pointer"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                  disabled
                    ? "bg-ink-100 text-ink-300"
                    : "bg-cream-50 text-ink-400 group-hover:bg-brand-red/10 group-hover:text-brand-red"
                )}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-ink-900 truncate">
                  {entry.label}
                </div>
                <div className="text-[10px] text-ink-400 truncate">
                  {entry.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
