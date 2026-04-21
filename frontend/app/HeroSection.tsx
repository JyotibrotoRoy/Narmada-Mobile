import React from 'react';
import Link from 'next/link';

// Path to your raw picture in the public directory
const heroImageUrl = '/image38.png';

const HeroSection: React.FC = () => {
  return (
    <div 
      className="relative w-full h-[90vh] md:h-screen lg:h-screen xl:h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${heroImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Heavy Bottom-to-Top Dark Gradient Overlay. 
        This replicates the look of the target image and makes text readable.
      */}
      <div className="absolute inset-x-0 bottom-0 h-3/4 z-0 bg-gradient-to-t from-black to-black/0" />

      {/* Centered Content Layer.
        This handles all text and the button, centering them perfectly.
      */}
      <div className="absolute inset-0 z-1 flex flex-col justify-center items-center text-center p-6 md:p-12 lg:p-16 space-y-6 md:space-y-8 lg:space-y-10">
        
        {/* Headline */}
        <h1 className="text-white font-bold text-5xl md:text-6xl lg:text-8xl leading-tight">
          15 Years of Trust
        </h1>
        
        {/* Description */}
        <p className="text-white text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed">
          Last chance to find something special for your special someone.
        </p>
        
        {/* Blue Pill Button */}
        <a 
          href="/catalog" // Placeholder link
          className="mt-6 md:mt-8 lg:mt-10 px-10 py-5 bg-blue-600 text-white rounded-full font-semibold text-xl hover:bg-blue-700 transition duration-150 transform hover:scale-105"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
};

export default HeroSection;