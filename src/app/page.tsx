import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-cream dark:bg-brown">
      <Header />
      <Hero />
    </main>
  );
}
