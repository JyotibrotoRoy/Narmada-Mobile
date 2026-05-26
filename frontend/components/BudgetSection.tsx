import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;              // Now strictly a number
  mrp?: number | null;        // NEW
  price_prefix?: string | null; // NEW (e.g., "Starting at")
  images: string[];
  primary_image_index: number | null;
  description?: string;
}

const BudgetSection = ({ products }: { products: Product[] }) => {
  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-[#f5f5f7] overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24 mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
          The sweet spot. <span className="text-zinc-400">Price meets power.</span>
        </h2>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-10 px-6 md:px-12 lg:px-24 scrollbar-hide snap-x snap-mandatory">
        {products.map((product) => {
          
          // DYNAMIC DISCOUNT LOGIC
          const hasMrp = product.mrp && product.mrp > product.price;
          const discountPercentage = hasMrp 
            ? Math.round(((product.mrp! - product.price) / product.mrp!) * 100) 
            : 0;

          return (
            <Link 
              key={product.id}
              href={`/product/${product.id}`}
              className="snap-start relative min-w-[300px] md:min-w-[380px] h-[450px] rounded-[2.5rem] bg-white overflow-hidden flex flex-col p-8 transition-transform duration-500 hover:scale-[1.02] group shadow-sm border border-zinc-100"
            >
              <div className="z-10">
                <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">
                  {product.brand}
                </span>
                <h3 className="mt-2 text-2xl font-bold text-zinc-900 line-clamp-1">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm font-medium text-zinc-600 line-clamp-2">
                  {product.description || "Incredible performance. Unbeatable value."}
                </p>
                
                <div className="mt-4 flex items-center gap-2.5 flex-wrap">
                  <span className="text-lg font-extrabold text-zinc-900">
                    {/* Render the prefix ONLY if it exists */}
                    {product.price_prefix && (
                      <span className="font-semibold text-sm text-zinc-500 mr-1.5">
                        {product.price_prefix}
                      </span>
                    )}
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  
                  {/* Render MRP and Discount ONLY if MRP is valid */}
                  {hasMrp && (
                    <>
                      <span className="text-xs font-medium text-zinc-400 line-through">
                        MRP ₹{product.mrp!.toLocaleString('en-IN')}
                      </span>
                      <span className="bg-[#e3000f] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {discountPercentage}% Off
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="absolute inset-0 z-0 flex items-end justify-center p-6">
                <div className="relative w-full h-[50%] transition-transform duration-500 group-hover:scale-110">
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
          );
        })}
      </div>
    </section>
  );
};

export default BudgetSection;