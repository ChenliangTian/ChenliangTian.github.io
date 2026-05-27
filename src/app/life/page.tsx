import { Header } from "@/components/Header";
import { MasonryGrid } from "@/components/MasonryGrid";
import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";
import { format, parseISO } from "date-fns";

// Campus photos
const photos = [
  { src: "/images/photo1.jpg", alt: "Campus at Dusk", height: 75 },
  { src: "/images/photo2.jpg", alt: "Washington University Building", height: 80 },
  { src: "/images/photo3.jpg", alt: "Cherry Blossoms on Campus", height: 100 },
  { src: "/images/photo4.jpg", alt: "Campus Tower", height: 90 },
];

export default function LifePage() {
  const posts = getAllPosts("blog");

  return (
    <div className="min-h-screen bg-cream dark:bg-brown">
      <Header />
      <main className="container mx-auto max-w-5xl px-4 py-10 md:py-14">
        {/* Top runner */}
        <div className="flex items-center justify-between text-[0.625rem] md:text-xs font-bold uppercase tracking-[0.18em] text-taupe">
          <span>Life &middot; Chenliang Tian &middot; WashU</span>
          <span className="hidden sm:inline">Section &middot; N&ordm;&nbsp;04</span>
        </div>
        <hr className="mt-3 mb-12 border-0 border-t border-foreground/15" />

        {/* Title */}
        <header className="mb-16 md:mb-20">
          <p className="mb-5 text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-terracotta">
            The Margins &middot; Off the Page
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-foreground">
            Life.
          </h1>
          <p className="mt-6 font-display italic text-xl md:text-2xl text-terracotta max-w-2xl leading-snug">
            What I&rsquo;m reflecting on, and what I&rsquo;m looking at.
          </p>
        </header>

        <hr className="my-12 md:my-16 border-0 border-t border-foreground/15" />

        {/* Reflections */}
        <section className="mb-20">
          <header className="mb-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-baseline">
            <div className="md:col-span-3">
              <p className="font-display text-6xl md:text-7xl text-terracotta leading-none">I.</p>
              <p className="mt-2 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-taupe">
                Chapter One
              </p>
            </div>
            <div className="md:col-span-9">
              <h2 className="font-display text-3xl md:text-5xl leading-tight text-foreground">
                Reflections.
              </h2>
            </div>
          </header>

          {posts.length > 0 ? (
            <ul className="flex flex-col divide-y divide-foreground/10">
              {posts.map((post) => (
                <li key={post.metadata.slug}>
                  <Link
                    href={`/log/${post.metadata.slug}`}
                    className="group block py-6 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8"
                  >
                    <p className="md:col-span-3 text-xs font-bold uppercase tracking-[0.18em] text-taupe">
                      <time dateTime={post.metadata.date}>
                        {format(parseISO(post.metadata.date), "MMM d, yyyy")}
                      </time>
                    </p>
                    <div className="md:col-span-9">
                      <h3 className="font-display text-2xl md:text-3xl leading-tight text-foreground transition-colors group-hover:text-terracotta">
                        {post.metadata.title}
                      </h3>
                      <p className="mt-2 font-display italic text-base text-foreground/75 leading-snug line-clamp-2">
                        {post.metadata.description}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="italic text-taupe py-8">
              No reflections yet. Drop a markdown file in <code className="font-mono text-xs">content/blog</code> to get started.
            </p>
          )}
        </section>

        <hr className="my-12 md:my-16 border-0 border-t border-foreground/15" />

        {/* Photography */}
        <section>
          <header className="mb-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-baseline">
            <div className="md:col-span-3">
              <p className="font-display text-6xl md:text-7xl text-terracotta leading-none">II.</p>
              <p className="mt-2 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-taupe">
                Chapter Two
              </p>
            </div>
            <div className="md:col-span-9">
              <h2 className="font-display text-3xl md:text-5xl leading-tight text-foreground">
                Photography.
              </h2>
              <p className="mt-3 font-display italic text-lg text-foreground/70 max-w-2xl leading-snug">
                Plates from the field.
              </p>
            </div>
          </header>

          <MasonryGrid photos={photos} />
        </section>
      </main>
    </div>
  );
}
