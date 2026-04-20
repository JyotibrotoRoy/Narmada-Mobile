"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type ProductGalleryProps = {
  images: string[];
  productName: string;
};

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const normalizedImages = useMemo(() => images.filter(Boolean), [images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSrc = normalizedImages[activeIndex] ?? null;

  return (
    <section className="w-full overflow-hidden"> {/* Force-kill any horizontal leak */}
      {/* Main Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-[0_8px_30px_-20px_rgba(0,0,0,0.25)]">
        {activeSrc ? (
          <Image
            src={activeSrc}
            alt={`${productName} preview`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-5 sm:p-8"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-500">
            No product images available
          </div>
        )}
      </div>

      {/* Thumbnail Row */}
      {normalizedImages.length > 1 ? (
        <div 
          className="mt-4 flex w-full gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: 'touch' }} // Smooth momentum scrolling on iOS
        >
          {normalizedImages.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              // snap-start ensures the thumbnail clicks into place when scrolling
              className={`relative h-20 w-20 shrink-0 snap-start overflow-hidden rounded-2xl border bg-white transition-all duration-200 ${
                index === activeIndex
                  ? "border-zinc-900 ring-2 ring-zinc-900/20 scale-95"
                  : "border-zinc-200 hover:border-zinc-400"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={src}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
          {/* Invisible spacer to allow for better scrolling at the end */}
          <div className="w-4 shrink-0" />
        </div>
      ) : null}
    </section>
  );
}