"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from "next/image";

interface HeroFeatureProps {
  title: string;
  subtitle: string;
  image: string;
  targetPage: string;
  isPriority?: boolean;
}

const HeroFeature: React.FC<HeroFeatureProps> = ({ title, subtitle, image, targetPage, isPriority }) => {
  return (
    <div className="relative min-w-full h-screen md:h-[90vh] overflow-hidden bg-black flex flex-col items-center text-center snap-start shrink-0">
      <Image 
        src={image} 
        alt={title} 
        fill 
        priority={isPriority} 
        quality={75} 
        className="object-cover object-bottom z-0"
        sizes="100vw"
      />

      <div className="relative z-10 pt-24 md:pt-32 px-6">
        <h2 className="text-white font-bold text-5xl md:text-8xl tracking-tight drop-shadow-lg">
          {title}
        </h2>
        <p className="mt-4 text-white text-lg md:text-2xl font-medium opacity-90 drop-shadow-md">
          {subtitle}
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href={targetPage} className="px-10 py-4 bg-white text-black rounded-full font-semibold text-lg hover:scale-105 transition-transform">
            Learn more
          </Link>
          <Link href={targetPage} className="px-10 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-transform">
            Buy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function FeatureCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const features = [
    {
      title: "iPhone 17 Pro",
      subtitle: "Hello, Apple Intelligence.",
      image: "/2.png",
      targetPage: "/catalog",
    },
    {
      title: "Galaxy S26 Ultra",
      subtitle: "Galaxy AI",
      image: "/1.png",
      targetPage: "/catalog",
    },
    // Add more here, the logic will handle it automatically
  ];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        // Logic: If at the end, jump back to start, else scroll to next
        const isAtEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth;
        
        scrollRef.current.scrollTo({
          left: isAtEnd ? 0 : scrollLeft + clientWidth,
          behavior: 'smooth'
        });
      }
    }, 3000); // 2 Seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section 
      ref={scrollRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar bg-black cursor-grab active:cursor-grabbing"
    >
      {features.map((feature, index) => (
        <HeroFeature 
          key={feature.title}
          {...feature}
          isPriority={index === 0}
        />
      ))}
    </section>
  );
}