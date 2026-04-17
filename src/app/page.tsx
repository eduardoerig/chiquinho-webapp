import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Destaques } from "@/components/sections/Destaques";
import { MenuSection } from "@/components/sections/MenuSection";
import { Sobre } from "@/components/sections/Sobre";
import { Franchise } from "@/components/sections/Franchise";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Destaques />
      <Sobre />
      <MenuSection />
      <Franchise />
      <Footer />
    </main>
  );
}
