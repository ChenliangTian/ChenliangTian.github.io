import { Header } from "@/components/Header";
import { Download, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description:
    "Academic CV of Chenliang Tian — PhD Student in Computer Science & Engineering at Washington University in St. Louis.",
};

// ───── Data ───────────────────────────────────────────────────────────────────

type Publication = {
  authors: string;
  title: string;
  venue: string;
  details?: string;
  year: string;
};

const publications: Publication[] = [
  {
    authors:
      "C. Tian, Z. Yang, R. Jain, R. Kompella, R. Nejabati, E. Kaur, A. Erbad, M. Abdallah, and M. Hamdi",
    title:
      "RADAR-Q: Resource-Aware Distributed Asynchronous Routing for Entanglement Distribution in Multi-Tenant Quantum Networks",
    venue: "5th International Conference on Innovations in Computing Research (ICR'26)",
    details: "Berlin, Germany",
    year: "Aug. 2026",
  },
  {
    authors:
      "C. Tian, Z. Yang, R. Kompella, A. Erbad, R. Nejabati, M. Hamdi, R. Jain, E. Kaur, and M. Abdallah",
    title: "Asynchronous Routing for Multipartite Entanglement in Quantum Networks",
    venue:
      "Proc. 2026 IEEE 16th Annual Computing and Communication Workshop and Conference (CCWC)",
    details: "Las Vegas, NV, USA, pp. 533–541",
    year: "2026",
  },
  {
    authors:
      "Z. Yang, C. Tian, R. Jain, R. Kompella, R. Nejabati, M. Hamdi, A. Erbad, and H. Shapourian",
    title: "Effective Scheduling for Quantum Data Centers",
    venue: "Proc. 2025 IEEE International Conference on Quantum Computing and Engineering (QCE)",
    details: "pp. 454–455",
    year: "2025",
  },
];

function renderAuthors(authors: string) {
  return authors.split(/(C\. Tian)/g).map((part, i) =>
    part === "C. Tian" ? (
      <strong key={i} className="font-bold text-foreground">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

type Education = {
  school: string;
  location: string;
  degree: string;
  period: string;
  notes?: string[];
};

const education: Education[] = [
  {
    school: "Washington University in St. Louis",
    location: "St. Louis, MO, USA",
    degree: "Ph.D. in Computer Science & Engineering",
    period: "Aug. 2025 – Present",
    notes: [
      "Advisor: Prof. Raj Jain",
      "Research focus: Quantum networking, entanglement distribution, multi-tenant quantum systems",
    ],
  },
  {
    school: "Washington University in St. Louis",
    location: "St. Louis, MO, USA",
    degree: "M.S. in Computer Science",
    period: "Aug. 2023 – May 2025",
  },
  {
    school: "Macao Polytechnic University (MPU)",
    location: "Macao SAR, China",
    degree: "B.Sc. in Computing",
    period: "Sep. 2018 – Jun. 2022",
    notes: ["Ranking: Top 2 of 60"],
  },
];

type Experience = {
  title: string;
  org: string;
  period: string;
  bullets: string[];
};

const research: Experience[] = [
  {
    title: "Graduate Researcher — Quantum Networking",
    org: "Washington University in St. Louis, with Prof. Raj Jain",
    period: "Jan. 2024 – Present",
    bullets: [
      "Designed RADAR-Q, a resource-aware distributed asynchronous routing scheme for entanglement distribution across multi-tenant quantum networks; demonstrated improved throughput and fairness under contention.",
      "Developed an asynchronous, tree-based routing protocol for multipartite (3-party GHZ) entanglement distribution, achieving higher entanglement rates than synchronous baselines as coherence time grows while reducing wasted entanglements.",
      "Collaborated on scheduling for distributed quantum data centers (QDCs), exploring allocation of quantum memory and processing units across tenants.",
      "Application targets: quantum secret sharing, distributed quantum computation, and multi-party quantum protocols.",
    ],
  },
];

const teaching: Experience[] = [
  {
    title: "Teaching Assistant",
    org: "McKelvey School of Engineering, Washington University in St. Louis",
    period: "Jan. 2024 – Present",
    bullets: [
      "Introduction to Artificial Intelligence — supported lectures, graded assignments, held weekly office hours.",
      "Computer Architecture — assisted with course material, debugging sessions, and exam preparation.",
    ],
  },
];

const industry: Experience[] = [
  {
    title: "Full Stack Software Engineer Intern",
    org: "BluPurple Design & Interactive Media Ltd., Macao SAR, China",
    period: "Oct. 2021 – Nov. 2021",
    bullets: [
      "Built a cross-platform Flutter application (Android / iOS) with separated merchant and consumer interfaces.",
      "Designed user-interface flows and implemented navigation logic across pages.",
      "Enabled sellers to create and manage online stores and buyers to browse products and place orders.",
    ],
  },
];

const awards = [
  {
    name: "1st Prize (Top 11 / 10000+)",
    detail: "Pan-Pearl River Delta Region+ University Student IT FYP Competition",
    year: "2021",
  },
  {
    name: "3rd Prize",
    detail: "Challenge Cup National Undergraduate Curricular Academic Science and Technology Contest",
    year: "2022",
  },
  {
    name: "Top 2 / 60 in cohort",
    detail: "Macao Polytechnic University, B.Sc. in Computing",
    year: "2022",
  },
];

const memberships = [
  "IEEE Graduate Student Member",
  "Institution of Engineering and Technology (IET)",
];

const skills: Record<string, string[]> = {
  Programming: ["Python", "Java", "C++", "JavaScript", "Dart"],
  "Frameworks & Tools": ["Flutter", "Django", "MongoDB", "MySQL", "LaTeX"],
  Web: ["HTML", "CSS", "TypeScript", "React / Next.js"],
};

const languages = [
  { name: "Mandarin", level: "Native" },
  { name: "English", level: "Working Proficient" },
  { name: "Cantonese", level: "Working Proficient" },
];

// ───── Layout primitives ─────────────────────────────────────────────────────

function ChapterHead({
  numeral,
  eyebrow,
  title,
  lede,
}: {
  numeral: string;
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="mb-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-baseline">
      <div className="md:col-span-3">
        <p className="font-display text-6xl md:text-7xl text-terracotta leading-none">
          {numeral}
        </p>
        <p className="mt-2 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-taupe">
          {eyebrow}
        </p>
      </div>
      <div className="md:col-span-9">
        <h2 className="font-display text-3xl md:text-5xl leading-tight text-foreground">
          {title}
        </h2>
        {lede && (
          <p className="mt-3 font-display italic text-lg md:text-xl text-foreground/70 max-w-2xl leading-snug">
            {lede}
          </p>
        )}
      </div>
    </header>
  );
}

function Rule() {
  return <hr className="my-16 md:my-20 border-0 border-t border-foreground/15" />;
}

// ───── Page ──────────────────────────────────────────────────────────────────

export default function CVPage() {
  return (
    <div className="min-h-screen bg-cream dark:bg-brown">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-10 md:py-14">
        {/* Top runner */}
        <div className="flex items-center justify-between text-[0.625rem] md:text-xs font-bold uppercase tracking-[0.18em] text-taupe">
          <span>Curriculum Vitae &middot; Chenliang Tian &middot; WashU</span>
          <span className="hidden sm:inline">Issue &middot; N&ordm;&nbsp;01</span>
        </div>
        <hr className="mt-3 mb-12 border-0 border-t border-foreground/15" />

        {/* Title block */}
        <section className="mb-16 md:mb-20">
          <p className="mb-5 text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-terracotta">
            The Author &middot; A Brief Record &middot; 2026
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight text-foreground">
            Chenliang
            <br />
            Tian.
          </h1>
          <p className="mt-6 font-display italic text-xl md:text-2xl text-terracotta leading-snug max-w-2xl">
            Ph.D. Student, Computer Science &amp; Engineering &mdash;{" "}
            <Link
              href="https://wustl.edu"
              className="not-italic underline decoration-terracotta/40 underline-offset-[5px] decoration-1 hover:decoration-terracotta"
            >
              Washington University in St. Louis
            </Link>
            .
          </p>

          {/* Contact grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-y-3 sm:gap-x-8 text-sm text-foreground/85">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-taupe" />
              <Link href="mailto:chenliang.t@wustl.edu" className="hover:text-terracotta">
                chenliang.t@wustl.edu
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-taupe" />
              <span>+1 (314) 574-7476</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-taupe" />
              <span>St. Louis, MO 63130</span>
            </div>
          </div>

          {/* Download links */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-6">
            <a
              href="/CV_Chenliang_Tian.pdf"
              download
              className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-foreground border-b-2 border-foreground pb-1 transition-colors hover:text-terracotta hover:border-terracotta"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
            <a
              href="/CV_Chenliang_Tian.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-foreground/75 border-b-2 border-foreground/20 pb-1 transition-colors hover:text-terracotta hover:border-terracotta"
            >
              <ExternalLink className="h-4 w-4" />
              View in Browser
            </a>
          </div>
        </section>

        <Rule />

        {/* Research interests */}
        <section>
          <ChapterHead
            numeral="I."
            eyebrow="Chapter One"
            title="Research interests."
            lede="Quantum networking and quantum data centers — distributed routing, scheduling, multipartite entanglement, and the interface between quantum and classical systems."
          />
        </section>

        <Rule />

        {/* Education */}
        <section>
          <ChapterHead numeral="II." eyebrow="Chapter Two" title="Education." />
          <ul className="flex flex-col divide-y divide-foreground/10">
            {education.map((e) => (
              <li
                key={`${e.school}-${e.degree}`}
                className="py-6 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8"
              >
                <p className="md:col-span-3 text-xs font-bold uppercase tracking-[0.18em] text-taupe">
                  {e.period}
                </p>
                <div className="md:col-span-9">
                  <h3 className="font-display text-2xl md:text-3xl leading-tight text-foreground">
                    {e.school}
                  </h3>
                  <p className="mt-1 font-display italic text-lg text-terracotta">{e.degree}</p>
                  <p className="mt-1 text-sm text-taupe">{e.location}</p>
                  {e.notes && e.notes.length > 0 && (
                    <ul className="mt-3 list-disc pl-5 space-y-1 text-sm md:text-base text-foreground/85 marker:text-taupe">
                      {e.notes.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <Rule />

        {/* Publications */}
        <section>
          <ChapterHead numeral="III." eyebrow="Chapter Three" title="Publications." />
          <ul className="flex flex-col divide-y divide-foreground/10">
            {publications.map((p) => (
              <li key={p.title} className="py-7 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8">
                <p className="md:col-span-3 text-xs font-bold uppercase tracking-[0.18em] text-taupe">
                  {p.year}
                </p>
                <div className="md:col-span-9">
                  <h3 className="font-display text-xl md:text-2xl leading-snug text-foreground">
                    &ldquo;{p.title}&rdquo;
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                    {renderAuthors(p.authors)}
                  </p>
                  <p className="mt-2 font-display italic text-base text-taupe">
                    {p.venue}
                    {p.details ? `, ${p.details}` : ""}.
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <Rule />

        {/* Research Experience */}
        <section>
          <ChapterHead numeral="IV." eyebrow="Chapter Four" title="Research experience." />
          <ExperienceList items={research} />
        </section>

        <Rule />

        {/* Teaching */}
        <section>
          <ChapterHead numeral="V." eyebrow="Chapter Five" title="Teaching experience." />
          <ExperienceList items={teaching} />
        </section>

        <Rule />

        {/* Industry */}
        <section>
          <ChapterHead numeral="VI." eyebrow="Chapter Six" title="Industry experience." />
          <ExperienceList items={industry} />
        </section>

        <Rule />

        {/* Awards */}
        <section>
          <ChapterHead numeral="VII." eyebrow="Chapter Seven" title="Honors &amp; awards." />
          <ul className="flex flex-col divide-y divide-foreground/10">
            {awards.map((a) => (
              <li
                key={`${a.name}-${a.detail}`}
                className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8"
              >
                <p className="md:col-span-3 text-xs font-bold uppercase tracking-[0.18em] text-taupe">
                  {a.year}
                </p>
                <div className="md:col-span-9">
                  <p className="font-display text-xl text-foreground">{a.name}</p>
                  <p className="mt-1 text-sm text-foreground/75">{a.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <Rule />

        {/* Skills + Languages + Memberships — three columns */}
        <section>
          <ChapterHead numeral="VIII." eyebrow="Colophon" title="Skills, languages, memberships." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div>
              <p className="eyebrow mb-4">Technical Skills</p>
              <div className="space-y-4">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <p className="font-display italic text-base text-terracotta mb-1">
                      {category}
                    </p>
                    <p className="text-sm text-foreground/85 leading-relaxed">
                      {items.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-4">Languages</p>
              <ul className="space-y-3">
                {languages.map((l) => (
                  <li key={l.name}>
                    <p className="font-display text-lg text-foreground">{l.name}</p>
                    <p className="text-xs italic text-taupe">{l.level}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4">Memberships</p>
              <ul className="space-y-3 text-sm text-foreground/85">
                {memberships.map((m) => (
                  <li key={m} className="font-display italic text-base">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <hr className="mt-20 mb-8 border-0 border-t border-foreground/15" />
        <p className="text-center text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-taupe">
          End of Document &middot; Last Updated May 2026
        </p>
      </main>
    </div>
  );
}

function ExperienceList({ items }: { items: Experience[] }) {
  return (
    <ul className="flex flex-col divide-y divide-foreground/10">
      {items.map((j) => (
        <li key={j.title} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8">
          <p className="md:col-span-3 text-xs font-bold uppercase tracking-[0.18em] text-taupe">
            {j.period}
          </p>
          <div className="md:col-span-9">
            <h3 className="font-display text-2xl leading-tight text-foreground">{j.title}</h3>
            <p className="mt-1 font-display italic text-base text-terracotta">{j.org}</p>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm md:text-base text-foreground/85 marker:text-taupe">
              {j.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
