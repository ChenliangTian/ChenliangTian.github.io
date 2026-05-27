import { Header } from "@/components/Header";
import { ResearchCard } from "@/components/ResearchCard";

const quantumProjects = [
  {
    title: "Entanglement Swapping Protocol",
    description:
      "Optimizing the fidelity of entanglement swapping in noisy quantum repeater networks.",
    tags: ["Quantum", "Networking", "Protocol"],
    link: "#",
    image: "/images/entanglement-swapping.png",
  },
  {
    title: "QDC Resource Management",
    description:
      "A scheduler for allocating quantum memory and processing units in a distributed quantum data center.",
    tags: ["QDC", "Scheduling", "Optimization"],
    link: "#",
    image: "/images/qdc-resource-management.png",
  },
];

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-cream dark:bg-brown">
      <Header />
      <main className="container mx-auto max-w-5xl px-4 py-10 md:py-14">
        {/* Top runner */}
        <div className="flex items-center justify-between text-[0.625rem] md:text-xs font-bold uppercase tracking-[0.18em] text-taupe">
          <span>Research &middot; Chenliang Tian &middot; WashU</span>
          <span className="hidden sm:inline">Section &middot; N&ordm;&nbsp;02</span>
        </div>
        <hr className="mt-3 mb-12 border-0 border-t border-foreground/15" />

        {/* Title */}
        <header className="mb-16 md:mb-20">
          <p className="mb-5 text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-terracotta">
            Research &middot; Projects &amp; Protocols &middot; 2026
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-foreground">
            Research<br />&amp; projects.
          </h1>
          <p className="mt-6 font-display italic text-xl md:text-2xl text-terracotta max-w-2xl leading-snug">
            Exploring the intersection of time-critical systems and the future of quantum
            communication.
          </p>
        </header>

        <hr className="my-12 md:my-16 border-0 border-t border-foreground/15" />

        {/* Quantum chapter */}
        <section id="quantum">
          <header className="mb-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-baseline">
            <div className="md:col-span-3">
              <p className="font-display text-6xl md:text-7xl text-terracotta leading-none">I.</p>
              <p className="mt-2 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-taupe">
                Chapter One
              </p>
            </div>
            <div className="md:col-span-9">
              <h2 className="font-display text-3xl md:text-5xl leading-tight text-foreground">
                Quantum networking.
              </h2>
            </div>
          </header>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quantumProjects.map((project) => (
              <ResearchCard key={project.title} {...project} type="quantum" />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
