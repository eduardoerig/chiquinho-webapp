"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { FranchiseModal } from "@/components/layout/FranchiseModal";

interface FranchiseContextType {
  openModal: () => void;
  closeModal: () => void;
}

const FranchiseContext = createContext<FranchiseContextType | undefined>(undefined);

export function FranchiseProvider({ 
  children,
  settings 
}: { 
  children: ReactNode,
  settings?: Record<string, string>
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <FranchiseContext.Provider value={{ openModal, closeModal }}>
      {children}
      <FranchiseModal isOpen={isOpen} onClose={closeModal} settings={settings} />
    </FranchiseContext.Provider>
  );
}

export function useFranchiseModal() {
  const context = useContext(FranchiseContext);
  if (context === undefined) {
    throw new Error("useFranchiseModal must be used within a FranchiseProvider");
  }
  return context;
}
