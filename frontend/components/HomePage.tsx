"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Sparkles, Smartphone } from "lucide-react";
import type { FeaturedProductRow } from "@/lib/supabase";
import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";

const bentoContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const bentoItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function LogoApple({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 28"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function LogoSamsung({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 128 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <text
        x="0"
        y="17"
        fontSize="15"
        fontWeight="700"
        letterSpacing="0.28em"
        fontFamily="system-ui, sans-serif"
      >
        SAMSUNG
      </text>
    </svg>
  );
}

function LogoOnePlus({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 112 28"
      fill="none"
      className={className}
      aria-hidden
    >
      <rect
        x="1"
        y="3"
        width="22"
        height="22"
        rx="5"
        stroke="#f50514"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M12 9v10M7 14h10"
        stroke="#f50514"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <text
        x="30"
        y="19"
        fill="currentColor"
        fontSize="14"
        fontWeight="700"
        letterSpacing="0.06em"
        fontFamily="system-ui, sans-serif"
      >
        ONEPLUS
      </text>
    </svg>
  );
}

function LogoXiaomi({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 28"
      fill="none"
      className={className}
      aria-hidden
    >
      <rect x="0" y="2" width="24" height="24" rx="6" fill="#ff6900" />
      <path
        fill="#fff"
        d="M6 20V8h2.6l3.8 8.5h.1L16.4 8H19v12h-2v-8.8h-.1L13 20h-1.7l-3.7-8.8H10V20H6z"
      />
      <text
        x="30"
        y="18.5"
        fill="currentColor"
        fontSize="13"
        fontWeight="600"
        letterSpacing="0.02em"
        fontFamily="system-ui, sans-serif"
      >
        xiaomi
      </text>
    </svg>
  );
}

function LogoVivo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 72 28"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <text
        x="2"
        y="20"
        fontSize="22"
        fontStyle="italic"
        fontWeight="300"
        fontFamily="Georgia, 'Times New Roman', serif"
      >
        vivo
      </text>
    </svg>
  );
}

const offers = [
  "₹500 off on screen guards",
  "Free tempered glass with cases",
  "Exchange bonus this week",
  "Student & corporate pricing",
  "Accessory bundles — 15% off",
  "Extended warranty packages",
];

type HomePageProps = {
  featuredProducts: FeaturedProductRow[];
};

export default function HomePage({ featuredProducts }: HomePageProps) {
  const showFeaturedSkeletons = featuredProducts.length === 0;

  return (
    <div className="min-h-full flex flex-col bg-zinc-50 text-zinc-950">
      <main className="flex-1 w-full max-w-6xl mx-auto px-5 sm:px-8 pb-24 pt-16 md:pt-24">
        {/* Hero */}
        <section className="mb-20 md:mb-28">
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tighter text-balance leading-[0.98] sm:text-6xl md:text-7xl lg:text-8xl">
            15+ Years of Trust
          </h1>
          <p className="mt-5 max-w-xl text-base text-zinc-600 text-balance sm:text-lg">
            Genuine devices, authorized partnerships, and service you can rely
            on—every visit.
          </p>
          <div className="mt-7 sm:mt-10">
            <Link
              href="/catalog"
              className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-xs font-medium text-white shadow-sm transition hover:bg-zinc-800 sm:px-7 sm:py-3.5 sm:text-sm"
            >
              Explore Catalog
              <ArrowRight
                className="h-4 w-4 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={1.75}
                aria-hidden
              />
            </Link>
          </div>
        </section>

        {/* Bento */}
        <section className="mb-20 md:mb-28">
          <h2 className="sr-only">Why choose us</h2>
          <motion.div
            className="grid gap-4 md:grid-cols-3 md:gap-5"
            variants={bentoContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.article
              variants={bentoItem}
              className="bento-card bento-card-blue flex flex-col gap-4"
            >
              <Shield
                className="h-9 w-9 text-blue-600"
                strokeWidth={1.5}
                aria-hidden
              />
              <h3 className="text-xl font-semibold tracking-tight">
                A Legacy of Trust
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600">
                Built on long-term relationships and transparent pricing—no
                surprises, just dependable support.
              </p>
            </motion.article>
            <motion.article
              variants={bentoItem}
              className="bento-card bento-card-pink flex flex-col gap-4"
            >
              <Sparkles
                className="h-9 w-9 text-pink-500"
                strokeWidth={1.5}
                aria-hidden
              />
              <h3 className="text-xl font-semibold tracking-tight">
                Genuine Products Only
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600">
                Sealed inventory and verified sourcing so every phone and
                accessory is the real deal.
              </p>
            </motion.article>
            <motion.article
              variants={bentoItem}
              className="bento-card bento-card-yellow flex flex-col gap-4"
            >
              <Smartphone
                className="h-9 w-9 text-amber-600"
                strokeWidth={1.5}
                aria-hidden
              />
              <h3 className="text-xl font-semibold tracking-tight">
                Complete Mobile Solutions
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600">
                From flagship handsets to repairs and add-ons—we cover your
                whole mobile journey.
              </p>
            </motion.article>
          </motion.div>
        </section>

        {/* Featured Arrivals */}
        <section className="mb-20 md:mb-28">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Featured Arrivals
            </h2>
            <Link
              href="/catalog"
              className="text-sm font-medium text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-900 hover:decoration-zinc-500"
            >
              View All
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {showFeaturedSkeletons
              ? Array.from({ length: 4 }, (_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              : featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </section>

        {/* Authorized dealers */}
        <section className="mb-20 md:mb-28">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
            Authorized Dealer For
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-start gap-x-12 gap-y-10 md:gap-x-16 md:justify-between">
            <div className="flex h-10 items-center text-zinc-900 [&_svg]:h-9 [&_svg]:w-auto">
              <LogoApple className="h-10 w-8" />
              <span className="ml-2 text-lg font-semibold tracking-tight">
                Apple
              </span>
            </div>
            <div className="flex h-10 items-center text-zinc-900 [&_svg]:h-7 [&_svg]:min-w-[7.5rem]">
              <LogoSamsung className="h-7 w-[7.5rem]" />
            </div>
            <div className="flex h-10 items-center text-zinc-900 [&_svg]:h-8 [&_svg]:min-w-[8.5rem]">
              <LogoOnePlus className="h-8 w-36 text-zinc-900" />
            </div>
            <div className="flex h-10 items-center text-zinc-900 [&_svg]:h-8 [&_svg]:min-w-[6.5rem]">
              <LogoXiaomi className="h-8 w-28 text-zinc-900" />
            </div>
            <div className="flex h-10 items-center text-zinc-900 [&_svg]:h-8 [&_svg]:min-w-[4.5rem]">
              <LogoVivo className="h-8 w-20" />
            </div>
          </div>
        </section>

        {/* Special offers */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Special Offers
          </h2>
          <p className="mt-2 max-w-lg text-zinc-600">
            Limited-time tags—ask in store or online for eligibility.
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {offers.map((label) => (
              <span
                key={label}
                className="inline-flex items-center rounded-full border border-zinc-200/80 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-[0_1px_0_rgba(0,0,0,0.04)] ring-1 ring-black/[0.03]"
              >
                {label}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
