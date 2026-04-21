import React from 'react';
import Link from 'next/link';

import Image from "next/image"; // Import the Next.js Image component

interface HeroFeatureProps {
  title: string;
  subtitle: string;
  image: string;
  targetPage: string;
  isPriority?: boolean; // Add a prop to prioritize the first image
}

const HeroFeature: React.FC<HeroFeatureProps> = ({ title, subtitle, image, targetPage, isPriority }) => {
  return (
    <div className="relative min-w-full h-screen md:h-[90vh] overflow-hidden bg-black flex flex-col items-center text-center snap-start">
      
      {/* OPTIMIZED IMAGE COMPONENT */}
      <Image 
        src={image} 
        alt={title} 
        fill // This replaces the absolute inset-0 logic
        priority={isPriority} // Loads this image immediately without waiting
        quality={75} // Professional balance between size and quality
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

// In your main export, tell the first card to be a priority:
export default function FeatureCards() {
  return (
    <section className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar bg-black">
      <HeroFeature 
        title="iPhone 17 Pro"
        subtitle="Hello, Apple Intelligence."
        image="/2.png" 
        targetPage="/catalog"
        isPriority={true} // Priority loading for the first slide
      />
      <HeroFeature 
        title="Galaxy S26 Ultra"
        subtitle="Galaxy AI"
        image="/1.png" 
        targetPage="/catalog"
        isPriority={false}
      />
    </section>
  );
}