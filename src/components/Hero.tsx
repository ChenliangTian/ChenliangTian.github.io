import Image from 'next/image';
import { ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';
import * as motion from 'framer-motion/client';

export function Hero() {
  return (
    <div className="flex flex-col gap-12 py-10 md:py-20" suppressHydrationWarning={true}>
      {/* Profile & Intro Section */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col-reverse items-center justify-between gap-12 md:flex-row">
          {/* Left Content */}
          <div className="flex flex-1 flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 md:mb-6 inline-flex items-center gap-2 rounded-full border border-brown/10 bg-pastel-yellow/30 px-4 py-2 text-xs md:text-sm font-bold text-brown shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-pastel-yellow/20 dark:text-pastel-yellow"
            >
              <span className="text-base md:text-lg animate-wave">👋</span> Hello All
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 md:mb-6 font-heading text-4xl font-bold leading-tight text-brown dark:text-cream sm:text-5xl md:text-6xl lg:text-7xl"
            >
              I'm Chenliang (Momo) —
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 max-w-xl text-lg font-medium leading-relaxed text-brown/80 dark:text-cream/80 md:text-xl"
            >
              I am a Ph.D. student in Computer Science & Engineering at <Link href="https://wustl.edu" className="font-bold text-brown underline decoration-brown/30 underline-offset-4 transition-colors hover:decoration-brown dark:text-cream dark:decoration-cream/30 dark:hover:decoration-cream">Washington University in St. Louis</Link>, advised by <Link href="https://www.cse.wustl.edu/~jain/" className="font-bold text-brown underline decoration-brown/30 underline-offset-4 transition-colors hover:decoration-brown dark:text-cream dark:decoration-cream/30 dark:hover:decoration-cream">Prof. Raj Jain</Link>. My research explores the space between advanced networking systems and emerging computation models, currently focused on <span className="inline-block rounded-lg bg-quantum-accent/20 px-1.5 font-bold text-brown dark:bg-quantum-accent/30 dark:text-cream">quantum networking</span>—how future quantum devices might connect, share entanglement, and collaborate across a network.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto"
            >
              <Link
                href="/research"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-brown px-8 py-4 text-lg font-bold text-cream transition-all hover:scale-105 hover:shadow-xl hover:shadow-brown/20 dark:bg-cream dark:text-brown dark:hover:shadow-white/10"
              >
                View My Work 
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="mailto:chenliang.t@wustl.edu"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-brown px-8 py-4 text-lg font-bold text-brown transition-all hover:scale-105 hover:bg-brown/5 dark:border-cream dark:text-cream dark:hover:bg-cream/10"
              >
                Contact Me 
                <Mail className="h-5 w-5 transition-transform group-hover:-rotate-12" />
              </Link>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-64 w-64 md:h-96 md:w-96"
          >
            <motion.div 
              animate={{ rotate: 3, y: [0, -10, 0] }}
              transition={{ 
                rotate: { duration: 0 },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute inset-0 rounded-[2.5rem] bg-pastel-pink/30 dark:bg-pastel-pink/10" 
            />
            <motion.div 
              animate={{ rotate: -3, y: [0, 10, 0] }}
              transition={{ 
                rotate: { duration: 0 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }
              }}
              className="absolute inset-0 rounded-[2.5rem] bg-pastel-blue/30 dark:bg-pastel-blue/10" 
            />
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-full w-full overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl dark:border-brown-light"
            >
              <Image
                src="/images/profile.jpeg"
                alt="Chenliang (Momo) Tian"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Research Areas */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="container mx-auto px-4 mt-8"
      >
        <h2 className="mb-8 text-3xl font-bold text-brown dark:text-cream font-heading text-center md:text-left">My Research Interest</h2>
        <div className="flex justify-center md:justify-start">
          {/* Quantum Side */}
          <Link href="/research#quantum" className="block max-w-2xl w-full">
            <div className="group flex flex-col items-start rounded-3xl bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl dark:bg-white/5 border border-transparent hover:border-quantum-accent/20">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-quantum-light text-quantum-accent dark:bg-quantum-accent/20 transition-transform group-hover:scale-110 group-hover:rotate-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-atom"
                >
                  <circle cx="12" cy="12" r="1" />
                  <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                  <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                </svg>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-brown dark:text-cream font-heading group-hover:text-quantum-accent transition-colors">
                Quantum Networking
              </h3>
              <p className="mb-6 text-lg text-brown/70 dark:text-cream/70 leading-relaxed">
                Designing protocols for next-gen quantum data centers. Connecting future quantum devices to share entanglement.
              </p>
              <div
                className="inline-flex items-center text-sm font-bold text-quantum-accent transition-colors group-hover:translate-x-1"
              >
                Discover Quantum Protocols
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
