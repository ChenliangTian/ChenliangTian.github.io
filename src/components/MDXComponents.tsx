import Link from 'next/link';
import { cn } from '@/lib/utils';

export const MDXComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 font-display text-4xl md:text-5xl font-normal tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-12 scroll-m-20 font-display text-3xl md:text-4xl font-normal tracking-tight text-foreground first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mt-10 scroll-m-20 font-display text-2xl md:text-3xl font-normal tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-relaxed text-foreground/85 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc text-foreground/85 marker:text-taupe [&>li]:mt-2", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal text-foreground/85 marker:text-taupe [&>li]:mt-2", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "mt-8 border-l-2 border-terracotta pl-6 font-display italic text-xl md:text-2xl leading-snug text-foreground/85",
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn("border border-foreground/10 bg-paper-warm my-8", className)}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="my-10 border-0 border-t border-foreground/15" {...props} />,
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "px-1.5 py-0.5 bg-paper-warm text-foreground font-mono text-[0.875em] rounded-sm",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "my-6 overflow-x-auto bg-paper-warm p-5 border border-foreground/10 text-sm leading-relaxed",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const cls = cn(
      "text-terracotta underline decoration-terracotta/40 underline-offset-[5px] decoration-1 hover:decoration-terracotta transition-colors",
      className
    );
    const isInternal = href?.startsWith('/');
    if (isInternal) {
      return (
        <Link href={href as string} className={cls} {...props} />
      );
    }
    return (
      <a className={cls} target="_blank" rel="noreferrer" href={href} {...props} />
    );
  },
};
