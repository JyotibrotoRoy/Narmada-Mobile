"use client";

import { useState } from "react";
import { MessageCircle, Phone } from "lucide-react";

type Variant = {
  label: string;
  price: number;
};

export default function ProductDetails({ product }: { product: any }) {
  // Ensure variants is always an array
  const variants = (product.variants as Variant[]) || [];
  
  // The fallback object must match the 'Variant' type { label, price }
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    variants.length > 0 
      ? variants[0] 
      : { label: "Standard", price: Number(product.price) || 0 }
  );

  // --- DYNAMIC PRICING LOGIC ---
  const rawVariantPrice = String(selectedVariant.price || 0);
  const currentPrice = parseInt(rawVariantPrice.replace(/\D/g, ""), 10) || 0;
  
  // NOTE: If your variants have specific MRPs in the future, you'll need to pull it from selectedVariant. 
  // For now, we assume the base product MRP applies, or we disable it if the variant price exceeds the base MRP.
  const baseMrp = product.mrp;
  const hasMrp = baseMrp && baseMrp > currentPrice;
  const discountPercentage = hasMrp 
    ? Math.round(((baseMrp - currentPrice) / baseMrp) * 100) 
    : 0;
  // -----------------------------

  const whatsappNumber = "919954325690";

  // Use the universal label for the message
  const whatsappMessage = encodeURIComponent(
    `Hi Narmada Mobile Care, I'm interested in the ${product.name} (${selectedVariant.label}) priced at ₹${currentPrice.toLocaleString("en-IN")}. Is it available?`
  );

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const callHref = `tel:+919954325690`;

  return (
    <>
      <section className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_8px_30px_-20px_rgba(0,0,0,0.25)] sm:p-8">
        <span className="inline-flex items-center rounded-full border border-zinc-300 bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-700">
          {product.categories?.[0]?.name ?? "Product"}
        </span>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {product.name}
        </h1>

        {/* --- INJECTED DYNAMIC PRICING BLOCK --- */}
        <div className="mt-4 flex items-baseline gap-3 flex-wrap mb-2">
          <span className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            {/* Render Prefix if it exists */}
            {product.price_prefix && (
              <span className="font-semibold text-2xl text-zinc-500 mr-2">
                {product.price_prefix}
              </span>
            )}
            ₹{currentPrice.toLocaleString("en-IN")}
          </span>
          
          {/* Render MRP and Discount ONLY if valid */}
          {hasMrp && (
            <div className="flex items-center gap-3">
              <span className="text-xl font-medium text-zinc-400 line-through">
                MRP ₹{baseMrp.toLocaleString('en-IN')}
              </span>
              <span className="bg-[#e3000f] text-white text-sm font-bold px-3 py-1 rounded-md">
                {discountPercentage}% Off
              </span>
            </div>
          )}
        </div>
        {/* -------------------------------------- */}

        {/* CONFIGURATION SELECTION */}
        {variants.length > 1 && (
          <div className="mt-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Select Configuration
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {variants.map((v, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedVariant(v)}
                  className={`h-11 px-4 rounded-xl border text-sm font-medium transition-all ${
                    selectedVariant.label === v.label
                      ? "border-zinc-900 bg-zinc-900 text-white shadow-md"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400"
                  }`}
                >
                  {v.label || `${(v as any).ram} / ${(v as any).storage}`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* DESKTOP CONTACT BUTTONS */}
        <div className="mt-8 hidden gap-3 sm:flex">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] text-sm font-semibold text-white transition hover:brightness-95"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <a
            href={callHref}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-900 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            <Phone className="h-4 w-4" /> Call Now
          </a>
        </div>
      </section>

      {/* MOBILE STICKY BAR */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200/70 bg-white/80 p-3 backdrop-blur-md sm:hidden">
        <div className="mx-auto flex w-full max-w-6xl gap-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 text-sm font-semibold text-white active:scale-95 transition-transform"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <a
            href={callHref}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 text-sm font-semibold text-white active:scale-95 transition-transform"
          >
            <Phone className="h-4 w-4" /> Call
          </a>
        </div>
      </div>
    </>
  );
}