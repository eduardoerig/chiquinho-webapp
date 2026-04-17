"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Timeout de segurança: independente do load, remove após 3 segundos
    const safetyTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
        clearTimeout(safetyTimeout);
      }, 1200); 
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(safetyTimeout);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-3xl"
        >
          <motion.div 
            animate={{ 
              rotate: 360,
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2, 
              ease: "linear"
            }}
            className="relative w-28 h-28 drop-shadow-2xl"
          >
            <Image 
              src="/imagens_originais/cropped-chiquinho-icone-1-270x270.png" 
              alt="Carregando Chiquinho Sorvetes" 
              fill
              className="object-contain"
              priority
            />
          </motion.div>
          
          <motion.div 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="mt-6 text-brand-red font-bold tracking-widest text-sm uppercase"
          >
            Preparando a Fome...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
