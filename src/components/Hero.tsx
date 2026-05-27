import Image from 'next/image';
import { ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';
import * as motion from 'framer-motion/client';

export function Hero() {
  return (
    <div className="flex flex-col" suppressHydrationWarning={true}>
      {/* Top runner — editorial header bar */}
      <div className="container mx-auto px-4 pt-6 pb-2 md:pt-8">
        <div className="flex items-center justify-between text-[0.625rem] md:text-xs font-bold uppercase tracking-[0.18em] text-taupe">
          <span>Quarterly &middot; Chenliang Tian &middot; WashU</span>
          <span className="hidden sm:inline">Vol.&nbsp;PhD &middot; N&ordm;&nbsp;01</span>
        </div>
        <hr className="mt-3 border-0 border-t border-foreground/15" />
      </div>

      {/* Title section */}
      <section className="container mx-auto px-4 pt-10 md:pt-16 pb-16 md:pb-24">
        <div className="flex flex-col-reverse items-start justify-between gap-12 md:flex-row md:gap-16">
          {/* Left column — title + lede + signature */}
          <div className="flex flex-1 flex-col items-start text-left">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-terracotta"
            >
              Research &middot; Written by the Author &middot; 2026
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display font-normal leading-[0.95] tracking-tight text-foreground text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
            >
              Chenliang
              <br />
              Tian.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 md:mt-8 font-display italic text-2xl md:text-3xl lg:text-4xl leading-snug text-terracotta max-w-2xl"
            >
              A PhD student writing about the future of networks &mdash;
              where quantum and classical systems meet.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-8 md:mt-10 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/85"
            >
              I am a Ph.D. student in Computer Science &amp; Engineering at{' '}
              <Link
                href="https://wustl.edu"
                className="font-semibold underline decoration-foreground/30 underline-offset-[5px] decoration-1 transition hover:decoration-terracotta hover:text-terracotta"
              >
                Washington University in St. Louis
              </Link>
              , advised by{' '}
              <Link
                href="https://www.cse.wustl.edu/~jain/"
                className="font-semibold underline decoration-foreground/30 underline-offset-[5px] decoration-1 transition hover:decoration-terracotta hover:text-terracotta"
              >
                Prof. Raj Jain
              </Link>
              . My research explores the space between advanced networking systems and emerging
              computation models, currently focused on quantum networking &mdash; how future quantum
              devices might connect, share entanglement, and collaborate across a network.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-10 flex flex-col sm:flex-row flex-wrap items-start gap-3 sm:gap-6"
            >
              <Link
                href="/research"
                className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-foreground border-b-2 border-foreground pb-1 transition-colors hover:text-terracotta hover:border-terracotta"
              >
                View the Research
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="mailto:chenliang.t@wustl.edu"
                className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-foreground/75 border-b-2 border-foreground/20 pb-1 transition-colors hover:text-terracotta hover:border-terracotta"
              >
                Write to Me
                <Mail className="h-4 w-4 transition-transform group-hover:-rotate-12" />
              </Link>
            </motion.div>

            {/* Signature block */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 md:mt-16"
            >
              <p className="font-bold text-foreground">Chenliang Tian</p>
              <p className="italic text-sm text-taupe mt-0.5">
                Ph.D. Student &middot; McKelvey School of Engineering &middot; St. Louis
              </p>
            </motion.div>
          </div>

          {/* Right column — portrait */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-56 sm:w-64 md:w-72 lg:w-80 shrink-0"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src="/images/profile.jpeg"
                alt="Portrait of Chenliang Tian"
                fill
                className="object-cover grayscale-[0.15]"
                priority
              />
            </div>
            <p className="mt-3 text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-taupe">
              Plate I. &mdash; The author, on campus.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chapter divider — research interest */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="container mx-auto px-4 pb-24 md:pb-32 pt-8 md:pt-12"
      >
        <hr className="mb-12 border-0 border-t border-foreground/15" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Roman numeral + chapter label */}
          <div className="md:col-span-3">
            <p className="font-display text-7xl md:text-8xl text-terracotta leading-none">I.</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-taupe">
              Chapter One
            </p>
          </div>

          {/* Content */}
          <div className="md:col-span-9">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-terracotta mb-4">
              Research Interest
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
              Quantum networking.
            </h2>
            <p className="mt-4 font-display italic text-xl md:text-2xl text-foreground/80 max-w-2xl leading-snug">
              How future quantum devices might connect, share entanglement, and collaborate across
              a network.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 max-w-3xl">
              <div>
                <p className="eyebrow mb-2">Method</p>
                <p className="font-display italic text-lg text-foreground/85 leading-snug">
                  Distributed routing, asynchronous protocols, scheduling.
                </p>
              </div>
              <div>
                <p className="eyebrow mb-2">Setting</p>
                <p className="font-display italic text-lg text-foreground/85 leading-snug">
                  Multi-tenant quantum networks and quantum data centers.
                </p>
              </div>
            </div>

            <Link
              href="/research#quantum"
              className="group mt-10 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-foreground border-b-2 border-foreground pb-1 transition-colors hover:text-terracotta hover:border-terracotta"
            >
              Discover the Protocols
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
