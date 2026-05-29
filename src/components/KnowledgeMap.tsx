import Link from "next/link";
import type { Post } from "@/lib/mdx";

/**
 * Knowledge Map — an editorial index that groups learning-log entries by
 * domain (the FIRST tag of each post) and lists them with their subtopic
 * (the SECOND tag). Domains render in the order defined below; any domain
 * with at least one post appears, others stay hidden until a post exists.
 */
const DOMAINS: { key: string; blurb: string }[] = [
  {
    key: "Quantum",
    blurb:
      "States, entanglement, and the information-theoretic foundations behind quantum networks.",
  },
  {
    key: "Networking",
    blurb: "Routing, scheduling, and protocols across classical and quantum networks.",
  },
  {
    key: "AI",
    blurb: "The hardware, models, and systems that modern machine learning runs on.",
  },
];

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

function domainOf(p: Post): string {
  return p.metadata.tags?.[0] ?? "Other";
}

function subtopicOf(p: Post): string | undefined {
  return p.metadata.tags?.[1];
}

export function KnowledgeMap({ posts }: { posts: Post[] }) {
  // Group posts by domain.
  const byDomain = new Map<string, Post[]>();
  for (const p of posts) {
    const d = domainOf(p);
    if (!byDomain.has(d)) byDomain.set(d, []);
    byDomain.get(d)!.push(p);
  }

  // Configured domains first (in order), then any extras alphabetically.
  const configured = DOMAINS.filter((d) => byDomain.has(d.key));
  const extras = [...byDomain.keys()]
    .filter((k) => !DOMAINS.some((d) => d.key === k))
    .sort()
    .map((k) => ({ key: k, blurb: "" }));
  const ordered = [...configured, ...extras];

  if (ordered.length === 0) return null;

  return (
    <section aria-labelledby="knowledge-map-heading">
      <header className="mb-10">
        <p className="mb-4 text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-terracotta">
          How the Notes Connect
        </p>
        <h2
          id="knowledge-map-heading"
          className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-foreground"
        >
          Knowledge Map.
        </h2>
      </header>

      <div className="flex flex-col divide-y divide-foreground/10 border-t border-foreground/15">
        {ordered.map((d, i) => {
          const items = byDomain.get(d.key) ?? [];
          return (
            <div
              key={d.key}
              className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10"
            >
              {/* Domain — roman numeral + name + framing */}
              <div className="md:col-span-4">
                <p className="font-display text-5xl md:text-6xl text-terracotta leading-none">
                  {ROMAN[i]}.
                </p>
                <h3 className="mt-3 font-display text-2xl md:text-3xl leading-tight text-foreground">
                  {d.key}
                </h3>
                {d.blurb && (
                  <p className="mt-2 font-display italic text-base text-foreground/70 leading-snug">
                    {d.blurb}
                  </p>
                )}
              </div>

              {/* Entries in this domain */}
              <ul className="md:col-span-8 flex flex-col divide-y divide-foreground/10">
                {items.map((p) => {
                  const sub = subtopicOf(p);
                  return (
                    <li key={p.metadata.slug}>
                      <Link
                        href={`/log/${p.metadata.slug}`}
                        className="group flex items-baseline gap-4 py-3"
                      >
                        {sub && (
                          <span className="shrink-0 w-28 text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-taupe pt-1">
                            {sub}
                          </span>
                        )}
                        <span className="font-display text-xl md:text-2xl leading-snug text-foreground transition-colors group-hover:text-terracotta">
                          {p.metadata.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
