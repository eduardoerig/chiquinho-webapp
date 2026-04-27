"use client";

import { useEditorStore } from "@/stores/editorStore";
import { SectionWrapper } from "./SectionWrapper";
import { useCallback, useRef, useState } from "react";
import { Plus } from "lucide-react";

export function EditorCanvas() {
  const { sections, moveSection, selectSection, selectedSectionId } = useEditorStore();
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const dragCounter = useRef(0);

  const handleDragStart = useCallback((index: number) => {
    setDragIndex(index);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      if (dragIndex !== null && index !== dragIndex) {
        setDropIndex(index);
      }
    },
    [dragIndex]
  );

  const handleDragEnter = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      dragCounter.current++;
      if (dragIndex !== null && index !== dragIndex) {
        setDropIndex(index);
      }
    },
    [dragIndex]
  );

  const handleDragLeave = useCallback(() => {
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDropIndex(null);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, toIndex: number) => {
      e.preventDefault();
      dragCounter.current = 0;
      if (dragIndex !== null && dragIndex !== toIndex) {
        moveSection(dragIndex, toIndex);
      }
      setDragIndex(null);
      setDropIndex(null);
    },
    [dragIndex, moveSection]
  );

  const handleDragEnd = useCallback(() => {
    setDragIndex(null);
    setDropIndex(null);
    dragCounter.current = 0;
  }, []);

  return (
    <div className="flex-1 bg-cream-50/50 overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto space-y-3">
        {sections.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 bg-cream-100 rounded-2xl flex items-center justify-center">
              <Plus className="w-7 h-7 text-ink-300" />
            </div>
            <h3 className="font-display font-bold text-ink-900 text-lg mb-1">
              Página vazia
            </h3>
            <p className="text-ink-400 text-sm">
              Clique em uma seção na barra lateral para começar
            </p>
          </div>
        ) : (
          sections.map((section, index) => (
            <div
              key={section.id}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
            >
              {/* Drop indicator */}
              {dropIndex === index && dragIndex !== null && dragIndex > index && (
                <div className="h-1 bg-brand-red rounded-full mb-2 mx-4 transition-all" />
              )}

              <SectionWrapper
                section={section}
                index={index}
                isSelected={selectedSectionId === section.id}
                isDragging={dragIndex === index}
                onSelect={() => selectSection(section.id)}
                onDragStart={() => handleDragStart(index)}
                onDragEnd={handleDragEnd}
              />

              {/* Drop indicator after */}
              {dropIndex === index && dragIndex !== null && dragIndex < index && (
                <div className="h-1 bg-brand-red rounded-full mt-2 mx-4 transition-all" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
