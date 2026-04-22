import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  images: string[];
  primary_image_index: number | null;
  description?: string;
}

const BudgetSection = ({ products }: { products: Product[] }) => {
  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24 mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
          The sweet spot. <span className="text-zinc-400">Price meets power.</span>
        </h2>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex gap-6 overflow-x-auto pb-10 px-6 md:px-12 lg:px-24 scrollbar-hide snap-x snap-mandatory">
        {products.map((product) => (
          <Link 
            key={product.id}
            href={`/product/${product.id}`}
            className="snap-start relative min-w-[300px] md:min-w-[380px] h-[450px] rounded-[2.5rem] bg-[#f5f5f7] overflow-hidden flex flex-col p-8 transition-transform duration-500 hover:scale-[1.02] group shadow-sm"
          >
            <div className="z-10">
              <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">
                {product.brand}
              </span>
              <h3 className="mt-2 text-2xl font-bold text-zinc-900">
                {product.name}
              </h3>
              <p className="mt-2 text-sm font-medium text-zinc-600 line-clamp-2">
                {product.description || "Incredible performance. Unbeatable value."}
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                From ₹{product.price.toLocaleString()}*
              </p>
            </div>

            <div className="absolute inset-0 z-0 flex items-end justify-center p-6">
              <div className="relative w-full h-[55%] transition-transform duration-500 group-hover:scale-110">
                <Image 
                  src={product.images?.[product.primary_image_index || 0] || "/placeholder.png"} 
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 320px, 400px"
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BudgetSection;