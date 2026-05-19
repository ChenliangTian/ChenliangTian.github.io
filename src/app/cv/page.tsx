import { Header } from "@/components/Header";
import { Download, Mail, Phone, MapPin, ExternalLink, GraduationCap, BookOpen, FlaskConical, Presentation, Award, Wrench, Languages, Users } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description: "Academic CV of Chenliang (Momo) Tian — PhD Student in Computer Science & Engineering at Washington University in St. Louis.",
};

type Publication = {
  authors: string;
  title: string;
  venue: string;
  details?: string;
  year: string;
};

const publications: Publication[] = [
  {
    authors: "C. Tian, Z. Yang, R. Jain, R. Kompella, R. Nejabati, E. Kaur, A. Erbad, M. Abdallah, and M. Hamdi",
    title: "RADAR-Q: Resource-Aware Distributed Asynchronous Routing for Entanglement Distribution in Multi-Tenant Quantum Networks",
    venue: "5th International Conference on Innovations in Computing Research (ICR'26)",
    details: "Berlin, Germany",
    year: "Aug. 2026",
  },
  {
    authors: "C. Tian, Z. Yang, R. Kompella, A. Erbad, R. Nejabati, M. Hamdi, R. Jain, E. Kaur, and M. Abdallah",
    title: "Asynchronous Routing for Multipartite Entanglement in Quantum Networks",
    venue: "Proc. 2026 IEEE 16th Annual Computing and Communication Workshop and Conference (CCWC)",
    details: "Las Vegas, NV, USA, pp. 533–541",
    year: "2026",
  },
  {
    authors: "Z. Yang, C. Tian, R. Jain, R. Kompella, R. Nejabati, M. Hamdi, A. Erbad, and H. Shapourian",
    title: "Effective Scheduling for Quantum Data Centers",
    venue: "Proc. 2025 IEEE International Conference on Quantum Computing and Engineering (QCE)",
    details: "pp. 454–455",
    year: "2025",
  },
];

function renderAuthors(authors: string) {
  return authors.split(/(C\. Tian)/g).map((part, i) =>
    part === "C. Tian" ? (
      <strong key={i} className="font-bold text-brown dark:text-cream">
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
    notes: ["Advisor: Prof. Raj Jain", "Research focus: Quantum networking, entanglement distribution, multi-tenant quantum systems"],
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

const research = [
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

const teaching = [
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

const industry = [
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

const skills = {
  Programming: ["Python", "Java", "C++", "JavaScript", "Dart"],
  "Frameworks & Tools": ["Flutter", "Django", "MongoDB", "MySQL", "LaTeX"],
  Web: ["HTML", "CSS", "TypeScript", "React / Next.js"],
};

const languages = [
  { name: "Mandarin", level: "Native" },
  { name: "English", level: "Working Proficient" },
  { name: "Cantonese", level: "Working Proficient" },
];

function SectionHeading({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3 border-b-2 border-brown/15 pb-3 dark:border-cream/15">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pastel-pink/15 text-pastel-pink dark:bg-pastel-pink/20">
        <Icon className="h-5 w-5" />
      </span>
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-brown dark:text-cream">{children}</h2>
    </div>
  );
}

export default function CVPage() {
  return (
    <div className="min-h-screen bg-cream dark:bg-brown">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        {/* Header card */}
        <section className="mb-12 rounded-3xl border border-brown/10 bg-white p-8 shadow-sm dark:border-cream/10 dark:bg-white/5 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="mb-2 font-heading text-4xl font-bold text-brown dark:text-cream md:text-5xl">
                Chenliang (Momo) Tian
              </h1>
              <p className="mb-4 text-lg text-brown/80 dark:text-cream/80">
                Ph.D. Student, Computer Science &amp; Engineering
                <br />
                <Link
                  href="https://wustl.edu"
                  className="font-medium underline decoration-brown/30 underline-offset-4 hover:decoration-brown dark:decoration-cream/30 dark:hover:decoration-cream"
                >
                  Washington University in St. Louis
                </Link>
              </p>
              <ul className="flex flex-col gap-2 text-sm text-brown/75 dark:text-cream/75 md:text-base">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />
                  <Link href="mailto:chenliang.t@wustl.edu" className="hover:text-brown dark:hover:text-cream">
                    chenliang.t@wustl.edu
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>+1 (314) 574-7476</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>6640 Washington Ave, St. Louis, MO 63130</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="/CV_Chenliang_Tian.pdf"
                download
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-brown px-6 py-3 text-base font-bold text-cream transition-all hover:scale-105 hover:shadow-xl hover:shadow-brown/20 dark:bg-cream dark:text-brown dark:hover:shadow-white/10"
              >
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                Download CV (PDF)
              </a>
              <a
                href="/CV_Chenliang_Tian.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-brown/80 px-6 py-3 text-base font-medium text-brown transition-all hover:bg-brown/5 dark:border-cream/80 dark:text-cream dark:hover:bg-cream/10"
              >
                <ExternalLink className="h-4 w-4" />
                View in browser
              </a>
            </div>
          </div>
        </section>

        {/* Research Interests */}
        <section className="mb-12">
          <SectionHeading icon={FlaskConical}>Research Interests</SectionHeading>
          <p className="text-base leading-relaxed text-brown/85 dark:text-cream/85 md:text-lg">
            Quantum networking and quantum data centers, with a focus on distributed routing and
            scheduling for entanglement distribution, multi-tenant resource management,
            multipartite (GHZ) entanglement protocols, and the interface between quantum and
            classical network systems.
          </p>
        </section>

        {/* Education */}
        <section className="mb-12">
          <SectionHeading icon={GraduationCap}>Education</SectionHeading>
          <div className="flex flex-col gap-6">
            {education.map((e) => (
              <div
                key={`${e.school}-${e.degree}`}
                className="rounded-2xl border border-brown/10 bg-white p-6 dark:border-cream/10 dark:bg-white/5"
              >
                <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-heading text-xl font-bold text-brown dark:text-cream">{e.school}</h3>
                  <span className="text-sm font-medium text-brown/60 dark:text-cream/60">{e.period}</span>
                </div>
                <p className="mb-1 italic text-brown/80 dark:text-cream/80">{e.degree}</p>
                <p className={`text-sm text-brown/60 dark:text-cream/60 ${e.notes && e.notes.length > 0 ? "mb-3" : ""}`}>{e.location}</p>
                {e.notes && e.notes.length > 0 && (
                  <ul className="list-disc space-y-1 pl-5 text-sm text-brown/75 dark:text-cream/75 md:text-base">
                    {e.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section className="mb-12">
          <SectionHeading icon={BookOpen}>Publications</SectionHeading>
          <ul className="flex list-none flex-col gap-5">
            {publications.map((p) => (
              <li
                key={p.title}
                className="rounded-2xl border border-brown/10 bg-white p-5 dark:border-cream/10 dark:bg-white/5 md:p-6"
              >
                <p className="mb-1 text-sm leading-relaxed text-brown/70 dark:text-cream/70">
                  {renderAuthors(p.authors)}
                </p>
                <p className="mb-2 font-heading text-lg font-bold leading-snug text-brown dark:text-cream">
                  &ldquo;{p.title}&rdquo;
                </p>
                <p className="text-sm italic text-brown/80 dark:text-cream/80">
                  {p.venue}
                  {p.details ? `, ${p.details}` : ""}, {p.year}.
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Research Experience */}
        <section className="mb-12">
          <SectionHeading icon={FlaskConical}>Research Experience</SectionHeading>
          <div className="flex flex-col gap-6">
            {research.map((r) => (
              <ExperienceBlock key={r.title} {...r} />
            ))}
          </div>
        </section>

        {/* Teaching */}
        <section className="mb-12">
          <SectionHeading icon={Presentation}>Teaching Experience</SectionHeading>
          <div className="flex flex-col gap-6">
            {teaching.map((t) => (
              <ExperienceBlock key={t.title} {...t} />
            ))}
          </div>
        </section>

        {/* Industry */}
        <section className="mb-12">
          <SectionHeading icon={Wrench}>Industry Experience</SectionHeading>
          <div className="flex flex-col gap-6">
            {industry.map((j) => (
              <ExperienceBlock key={j.title} {...j} />
            ))}
          </div>
        </section>

        {/* Awards */}
        <section className="mb-12">
          <SectionHeading icon={Award}>Honors &amp; Awards</SectionHeading>
          <ul className="flex flex-col gap-3">
            {awards.map((a) => (
              <li
                key={`${a.name}-${a.detail}`}
                className="flex flex-col gap-1 rounded-2xl border border-brown/10 bg-white p-5 dark:border-cream/10 dark:bg-white/5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-heading text-lg font-bold text-brown dark:text-cream">{a.name}</p>
                  <p className="text-sm text-brown/75 dark:text-cream/75">{a.detail}</p>
                </div>
                <span className="text-sm font-medium text-brown/60 dark:text-cream/60">{a.year}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <SectionHeading icon={Wrench}>Technical Skills</SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className="rounded-2xl border border-brown/10 bg-white p-5 dark:border-cream/10 dark:bg-white/5"
              >
                <h3 className="mb-3 font-heading text-base font-bold text-brown dark:text-cream">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-quantum-light px-3 py-1 text-xs font-medium text-brown dark:bg-quantum-accent/20 dark:text-cream"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section className="mb-12">
          <SectionHeading icon={Languages}>Languages</SectionHeading>
          <div className="flex flex-wrap gap-3">
            {languages.map((l) => (
              <div
                key={l.name}
                className="rounded-2xl border border-brown/10 bg-white px-5 py-3 dark:border-cream/10 dark:bg-white/5"
              >
                <p className="font-heading text-base font-bold text-brown dark:text-cream">{l.name}</p>
                <p className="text-xs text-brown/60 dark:text-cream/60">{l.level}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Memberships */}
        <section className="mb-12">
          <SectionHeading icon={Users}>Professional Memberships</SectionHeading>
          <ul className="flex flex-col gap-2 pl-5 text-base text-brown/85 dark:text-cream/85">
            {memberships.map((m) => (
              <li key={m} className="list-disc">
                {m}
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-10 text-center text-xs text-brown/50 dark:text-cream/50">
          Last updated May 2026. For the printable version, please use the download link above.
        </p>
      </main>
    </div>
  );
}

function ExperienceBlock({
  title,
  org,
  period,
  bullets,
}: {
  title: string;
  org: string;
  period: string;
  bullets: string[];
}) {
  return (
    <div className="rounded-2xl border border-brown/10 bg-white p-6 dark:border-cream/10 dark:bg-white/5">
      <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="font-heading text-xl font-bold text-brown dark:text-cream">{title}</h3>
        <span className="text-sm font-medium text-brown/60 dark:text-cream/60">{period}</span>
      </div>
      <p className="mb-3 italic text-brown/80 dark:text-cream/80">{org}</p>
      <ul className="list-disc space-y-2 pl-5 text-sm text-brown/85 dark:text-cream/85 md:text-base">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}
