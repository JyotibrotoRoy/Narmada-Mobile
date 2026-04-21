import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LatestCardProps {
    productId: string;
  badge?: string;
  title: string;
  description: string;
  price?: string;
  image: string;
  bgColor: string;
  isDark?: boolean;
}

const LatestCard: React.FC<LatestCardProps> = ({ productId, badge, title, description, price, image, bgColor, isDark }) => {
  return (
    <Link
    href={`/product/${productId}`} 
      className="relative min-w-[320px] md:min-w-[400px] h-[500px] rounded-[2.5rem] overflow-hidden flex flex-col p-8 transition-transform duration-500 hover:scale-[1.02] cursor-pointer shadow-sm"
      style={{ backgroundColor: bgColor }}
    >
      <div className="z-10">
        {badge && (
          <span className={`text-[10px] font-bold tracking-widest uppercase ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
            {badge}
          </span>
        )}
        <h3 className={`mt-2 text-2xl md:text-3xl font-bold leading-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
          {title}
        </h3>
        <p className={`mt-2 text-sm md:text-base font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
          {description}
        </p>
        {price && (
          <p className={`mt-1 text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
            From {price}
          </p>
        )}
      </div>

      <div className="absolute inset-0 z-0 flex items-end justify-center p-4">
        <div className="relative w-full h-[60%]">
          <Image 
            src={image} 
            alt={title}
            fill
            className="object-contain object-bottom"
            sizes="(max-width: 768px) 320px, 400px"
          />
        </div>
      </div>
    </Link>
  );
};

export default function LatestSection({ products }: { products: any[] }) {
    if (products.length === 0) return null;
  return (
    <section className="py-20 bg-[#f5f5f7]">
      <div className="container mx-auto px-6 md:px-12 mb-10">
        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900">
          The latest. <span className="text-zinc-500">Take a look at what’s new right now.</span>
        </h2>
      </div>

      <div className="flex overflow-x-auto gap-6 px-6 md:px-12 no-scrollbar pb-10">
        {/* 2. DYNAMIC MAPPING START */}
        {products.map((product) => {
          // Helper to get the correct image URL
          const displayImage = product.images?.[product.primary_image_index || 0] || "/placeholder.png";
          
          return (
            <LatestCard 
              key={product.id}
              productId={product.id}
              badge={product.brand === 'Apple' ? 'New' : 'New'}
              title={product.name}
              description={product.description || "The latest in mobile technology."}
              price={`₹${product.price.toLocaleString()}*`}
              image={displayImage}
              // Professional Logic: If it's Apple, make it dark mode. Everything else is white.
              bgColor="#ffffff"
              isDark={false}
            />
          );
        })}
        {/* DYNAMIC MAPPING END */}

        <div className="min-w-[20px] md:min-w-[40px]" />
      </div>
    </section>
  );
}