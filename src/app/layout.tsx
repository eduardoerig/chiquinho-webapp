import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { Preloader } from "@/components/ui/Preloader";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: "Chiquinho Sorvetes — Felicidade em cada colherada",
  description: "Com receita exclusiva, mais de 100 opções no cardápio e mais de 1000 lojas pelo Brasil.",
  icons: {
    icon: "/imagens_originais/cropped-chiquinho-icone-1-270x270.png",
  },
};

export const viewport = {
  themeColor: "#A8151F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body className="antialiased font-sans">
        <Preloader />
        {children}
      </body>
    </html>
  );
}
