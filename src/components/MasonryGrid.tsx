'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface Photo {
  src: string;
  alt: string;
  height: number;
}

interface MasonryGridProps {
  photos: Photo[];
}

export function MasonryGrid({ photos }: MasonryGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4">
        {photos.map((photo, idx) => (
          <div key={idx} className="mb-4 break-inside-avoid">
            <figure className="group">
              <div
                className="relative w-full overflow-hidden border border-foreground/10 bg-paper-warm cursor-pointer"
                style={{ paddingBottom: `${photo.height}%` }}
                onClick={() => setSelectedPhoto(photo)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover grayscale-[0.15] transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/5" />
              </div>
              <figcaption className="mt-2 text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-taupe">
                Plate {idx + 1}. &mdash; {photo.alt}
              </figcaption>
            </figure>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/95 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 text-cream/70 transition-colors hover:text-cream"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <Image
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              width={1200}
              height={800}
              className="h-auto w-auto max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}
