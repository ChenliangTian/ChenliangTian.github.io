import { getPostBySlug, getPostSlugs } from '@/lib/mdx';
import { Header } from '@/components/Header';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/MDXComponents';
import { format, parseISO } from 'date-fns';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex],
  },
};

interface LogPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const logSlugs = getPostSlugs('logs');
  const blogSlugs = getPostSlugs('blog');

  return [
    ...logSlugs.map((slug) => ({
      slug: slug.replace(/\.mdx?$/, ''),
    })),
    ...blogSlugs.map((slug) => ({
      slug: slug.replace(/\.mdx?$/, ''),
    })),
  ];
}

export default async function LogPage({ params }: LogPageProps) {
  const { slug } = await params;

  try {
    // Try to get post from blog first, then logs
    let post;
    try {
      post = getPostBySlug('blog', slug);
    } catch {
      post = getPostBySlug('logs', slug);
    }

    const { content, metadata } = post;

    return (
      <div className="min-h-screen bg-cream dark:bg-brown">
        <Header />
        <main className="container mx-auto max-w-3xl px-4 py-10 md:py-14">
          {/* Top runner */}
          <div className="flex items-center justify-between text-[0.625rem] md:text-xs font-bold uppercase tracking-[0.18em] text-taupe">
            <span>Field Notes &middot; Chenliang Tian</span>
            <time className="hidden sm:inline" dateTime={metadata.date}>
              {format(parseISO(metadata.date), 'MMMM d, yyyy')}
            </time>
          </div>
          <hr className="mt-3 mb-10 border-0 border-t border-foreground/15" />

          <article className="text-base md:text-lg leading-relaxed text-foreground/85">
            <header className="mb-10">
              {metadata.tags && metadata.tags.length > 0 && (
                <p className="mb-4 text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-terracotta">
                  {metadata.tags.join(' · ')}
                </p>
              )}
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-foreground">
                {metadata.title}
              </h1>
              <p className="mt-4 italic text-base text-taupe">
                <time dateTime={metadata.date}>
                  {format(parseISO(metadata.date), 'MMMM d, yyyy')}
                </time>
              </p>
            </header>
            <MDXRemote source={content} components={MDXComponents} options={mdxOptions} />
          </article>
        </main>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
