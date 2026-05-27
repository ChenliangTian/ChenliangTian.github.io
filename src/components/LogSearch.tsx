"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { Search, X } from 'lucide-react';
import type { Post } from '@/lib/mdx';

interface LogSearchProps {
    initialLogs: Post[];
}

export function LogSearch({ initialLogs }: LogSearchProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Extract unique tags from all logs
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        initialLogs.forEach(log => {
            log.metadata.tags?.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    }, [initialLogs]);

    // Filter logs based on search query and selected tag
    const filteredLogs = useMemo(() => {
        return initialLogs.filter(log => {
            const matchesSearch =
                searchQuery === '' ||
                log.metadata.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                log.metadata.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                log.content.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTag =
                selectedTag === null ||
                log.metadata.tags?.includes(selectedTag);

            return matchesSearch && matchesTag;
        });
    }, [initialLogs, searchQuery, selectedTag]);

    return (
        <div className="space-y-10">
            {/* Search and Filter Controls */}
            <div className="space-y-6">
                {/* Search Input — bottom-border only, no chrome */}
                <div className="relative">
                    <Search className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-taupe" />
                    <input
                        type="text"
                        placeholder="Search the log…"
                        className="block w-full border-0 border-b border-foreground/20 bg-transparent py-3 pl-7 pr-8 font-display italic text-lg text-foreground placeholder:text-taupe/70 focus:border-terracotta focus:outline-none focus:ring-0 transition-colors"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-taupe hover:text-terracotta transition-colors"
                            aria-label="Clear search"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Tags Filter — editorial uppercase pills, no background fill */}
                {allTags.length > 0 && (
                    <div className="flex flex-wrap gap-x-5 gap-y-2 items-center">
                        <span className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-taupe">
                            Filter
                        </span>
                        <button
                            onClick={() => setSelectedTag(null)}
                            className={`text-xs font-bold uppercase tracking-[0.18em] pb-0.5 border-b-2 transition-colors ${selectedTag === null
                                ? 'text-terracotta border-terracotta'
                                : 'text-foreground/60 border-transparent hover:text-terracotta hover:border-terracotta/40'
                                }`}
                        >
                            All
                        </button>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                                className={`text-xs font-bold uppercase tracking-[0.18em] pb-0.5 border-b-2 transition-colors ${selectedTag === tag
                                    ? 'text-terracotta border-terracotta'
                                    : 'text-foreground/60 border-transparent hover:text-terracotta hover:border-terracotta/40'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Results List — editorial entries with period column */}
            <ul className="flex flex-col divide-y divide-foreground/10">
                {filteredLogs.length === 0 ? (
                    <li className="py-12 text-center italic text-taupe">
                        No logs found matching your criteria.
                    </li>
                ) : (
                    filteredLogs.map((log) => (
                        <li key={log.metadata.slug}>
                            <Link
                                href={`/log/${log.metadata.slug}`}
                                className="group block py-6 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8"
                            >
                                <div className="md:col-span-3 space-y-2">
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-taupe">
                                        <time dateTime={log.metadata.date}>
                                            {format(parseISO(log.metadata.date), 'MMM d, yyyy')}
                                        </time>
                                    </p>
                                    {log.metadata.tags && log.metadata.tags.length > 0 && (
                                        <p className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-terracotta/80">
                                            {log.metadata.tags.join(' · ')}
                                        </p>
                                    )}
                                </div>
                                <div className="md:col-span-9">
                                    <h2 className="font-display text-2xl md:text-3xl leading-tight text-foreground transition-colors group-hover:text-terracotta">
                                        {log.metadata.title}
                                    </h2>
                                    {log.metadata.description && (
                                        <p className="mt-2 font-display italic text-base text-foreground/75 leading-snug line-clamp-2">
                                            {log.metadata.description}
                                        </p>
                                    )}
                                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.18em] text-foreground/60 group-hover:text-terracotta transition-colors">
                                        Read Entry
                                        <span className="transition-transform group-hover:translate-x-1">→</span>
                                    </span>
                                </div>
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
