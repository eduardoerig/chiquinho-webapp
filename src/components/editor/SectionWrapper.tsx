"use client";

import { useEditorStore, type PageSection } from "@/stores/editorStore";
import { sectionRegistry } from "./sections/registry";
import { GripVertical, Eye, EyeOff, Trash2, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  section: PageSection;
  index: number;
  isSelected: boolean;
  isDragging: boolean;
  onSelect: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

export function SectionWrapper({
  section,
  index,
  isSelected,
  isDragging,
  onSelect,
  onDragStart,
  onDragEnd,
}: SectionWrapperProps) {
  const { removeSection, toggleVisibility, duplicateSection } = useEditorStore();
  const entry = sectionRegistry[section.type];

  if (!entry) return null;

  const Icon = entry.icon;
  const title = (section.props.title as string) || entry.label;

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", section.id);
        onDragStart();
      }}
      onDragEnd={onDragEnd}
      onClick={onSelect}
      className={cn(
        "group relative bg-white border rounded-2xl transition-all cursor-pointer",
        isSelected
          ? "border-brand-red shadow-lg shadow-brand-red/10 ring-2 ring-brand-red/20"
          : "border-ink-100 hover:border-ink-200 hover:shadow-md",
        isDragging && "opacity-40 scale-[0.98]",
        !section.visible && "opacity-60"
      )}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Drag handle */}
        <div className="cursor-grab active:cursor-grabbing text-ink-300 hover:text-ink-500 transition-colors">
          <GripVertical className="w-5 h-5" />
        </div>

        {/* Icon & info */}
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
            isSelected ? "bg-brand-red/10 text-brand-red" : "bg-cream-50 text-ink-400"
          )}
        >
          <Icon className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-ink-900 truncate">{title}</span>
            <span className="text-[10px] font-mono text-ink-300 bg-cream-50 px-1.5 py-0.5 rounded">
              {entry.type}
            </span>
          </div>
          {!section.visible && (
            <span className="text-[10px] text-amber-600 font-medium">Oculto no site</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleVisibility(section.id);
            }}
            className="p-1.5 rounded-lg text-ink-400 hover:bg-ink-100 hover:text-ink-900 transition-colors"
            title={section.visible ? "Ocultar seção" : "Mostrar seção"}
          >
            {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              duplicateSection(section.id);
            }}
            className="p-1.5 rounded-lg text-ink-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            title="Duplicar seção"
          >
            <Copy className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              removeSection(section.id);
            }}
            className="p-1.5 rounded-lg text-ink-400 hover:bg-red-50 hover:text-red-600 transition-colors z-10"
            title="Remover seção"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Order badge */}
        <span className="text-[10px] text-ink-300 font-mono w-5 text-center flex-shrink-0">
          {index + 1}
        </span>
      </div>
    </div>
  );
}
