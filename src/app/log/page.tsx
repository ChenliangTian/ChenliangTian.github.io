import { getAllPosts } from '@/lib/mdx';
import { Header } from '@/components/Header';
import { LogSearch } from '@/components/LogSearch';
import { KnowledgeMap } from '@/components/KnowledgeMap';

export default function LogsPage() {
  const logs = getAllPosts('logs');

  return (
    <div className="min-h-screen bg-cream dark:bg-brown">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-10 md:py-14">
        {/* Top runner */}
        <div className="flex items-center justify-between text-[0.625rem] md:text-xs font-bold uppercase tracking-[0.18em] text-taupe">
          <span>Logs &middot; Chenliang Tian &middot; WashU</span>
          <span className="hidden sm:inline">Section &middot; N&ordm;&nbsp;03</span>
        </div>
        <hr className="mt-3 mb-12 border-0 border-t border-foreground/15" />

        <header className="mb-12 md:mb-16">
          <p className="mb-5 text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-terracotta">
            Field Notes &middot; What I&rsquo;m Learning
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-foreground">
            Learning log.
          </h1>
        </header>

        {/* Knowledge Map — how the notes connect */}
        <KnowledgeMap posts={logs} />

        {/* Full searchable archive */}
        <div className="mt-20 md:mt-28">
          <p className="mb-8 text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-terracotta">
            All Entries
          </p>
          <LogSearch initialLogs={logs} />
        </div>
      </main>
    </div>
  );
}
