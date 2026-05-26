import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center bg-black overflow-hidden">
      
      {/* 1. Background Image */}
      <Image
        src="/Background.png" // Replace with your actual image path
        alt="Leading Mobile Retail"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center z-0 opacity-80" // Slightly dimmed for text contrast
      />

      {/* 2. Gradient Overlay (Crucial for text readability on the left) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      {/* 3. Content Container (Left Aligned) */}
      <div className="relative z-20 w-full px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        
        {/* Constrain width so it doesn't cover the girl's face */}
        <div className="max-w-2xl flex flex-col items-start text-left">
          
          <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1]">
            Leading Mobile Retail <br className="hidden md:block" /> Across Northeast India
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-zinc-300 font-medium max-w-lg">
            Discover the latest smartphones, premium accessories, and unbeatable deals — all in one place.
          </p>
          
          <div className="mt-10">
            <Link 
              href="/catalog" 
              className="inline-block rounded-full bg-blue-600 px-10 py-4 text-sm font-bold tracking-wide text-white transition-all hover:bg-blue-700 hover:scale-105 shadow-lg shadow-blue-900/20"
            >
              SHOP NOW
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}