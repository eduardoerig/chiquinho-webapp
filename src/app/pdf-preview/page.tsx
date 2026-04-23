import React from "react";
import { PremiumMenuTemplate } from "@/components/ui/PremiumMenuTemplate";

export const dynamic = "force-dynamic";

const mockItems = [
  { id: 1, category: "shake-mix", title: "Shake Mix Clássico", desc: "Camadas de sorvete, calda e toppings", img: "/imagens_originais/produtos_capa_shakemix_01.png" },
  { id: 2, category: "casquinha", title: "Cascão Recheado", desc: "Crocante, recheado com sorvete e cobertura", img: "/imagens_originais/cardapio_1.png" },
  { id: 3, category: "sundae", title: "Sundae", desc: "Sorvete Chiquinho com calda quente", img: "/imagens_originais/cardapio_4.png" },
  { id: 4, category: "top-mix", title: "Milkshake Chocotino", desc: "Sabor exclusivo", img: "/imagens_originais/chiquinho_milkshake_chocotino.png" },
  { id: 5, category: "shake-mix", title: "Shake Mix KitKat", desc: "A pausa perfeita com KitKat", img: "/imagens_originais/chiquinho-banner-kitkat-selo-02-1.png" }
];

export default function PDFPreview() {
  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center py-10">
      <div className="shadow-2xl">
        <PremiumMenuTemplate items={mockItems} />
      </div>
    </div>
  );
}
