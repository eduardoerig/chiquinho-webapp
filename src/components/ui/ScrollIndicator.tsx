"use client";

import { motion } from "framer-motion";

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="flex flex-col items-center gap-2 py-6 bg-cream-50"
    >
      <span className="text-ink-300 text-[10px] font-bold uppercase tracking-[0.2em]">Role para baixo</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <svg className="w-5 h-5 text-ink-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </motion.div>
    </motion.div>
  );
}
