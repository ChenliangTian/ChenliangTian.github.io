import Link from 'next/link';
import Image from 'next/image';

interface ResearchCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  date?: string;
  type?: 'cps' | 'quantum';
  image?: string;
}

export function ResearchCard({ title, description, tags, link, type, image }: ResearchCardProps) {
  return (
    <article className="group flex h-full flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-foreground/10 bg-paper-warm dark:bg-white/5">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover grayscale-[0.1] transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center font-display text-7xl text-terracotta">
            {type === 'cps' ? 'C.' : 'Q.'}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col pt-5">
        <p className="mb-3 text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-taupe">
          {tags.join(' · ')}
        </p>

        <h3 className="font-display text-2xl leading-tight text-foreground transition-colors group-hover:text-terracotta">
          {title}
        </h3>

        <p className="mt-3 flex-grow font-display italic text-base text-foreground/75 leading-snug">
          {description}
        </p>

        <Link
          href={link || '#'}
          className="mt-5 inline-flex items-center gap-2 self-start text-xs font-bold uppercase tracking-[0.18em] text-foreground border-b-2 border-foreground pb-1 transition-colors hover:text-terracotta hover:border-terracotta"
        >
          Read More
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}
