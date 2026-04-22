"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation"; // 1. Import this
import { motion, AnimatePresence } from "framer-motion";
import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";

type CategoryRow = {
  id: string;
  name: string;
};

type ProductRow = {
  id: string;
  name: string;
  brand: string;
  price: string;
  images: string[];
  primary_image_index: number | null;
  category_id: string | null;
  categories: { name: string }[] | null;
};

function parsePrice(price: string) {
  const numeric = Number(price.replace(/[^0-9.]/g, ""));
  return Number.isNaN(numeric) ? 0 : numeric;
}

// 2. Wrap the content in a SearchComponent to handle useSearchParams properly in Next.js
function CatalogContent() {
  const searchParams = useSearchParams();
  
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  
  // States controlled by URL or UI
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"none" | "low-high" | "high-low">("none");
  const [searchQuery, setSearchQuery] = useState("");

  // 3. Sync URL params to State
  useEffect(() => {
    const q = searchParams.get("q");
    const brand = searchParams.get("brand");
    const category = searchParams.get("category");

    if (q) setSearchQuery(q);
    else if (brand) setSearchQuery(brand); // If brand link clicked, put brand name in search
    else setSearchQuery("");

    if (category) setActiveCategory(category);
    else setActiveCategory("all");
  }, [searchParams]);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      const [categoryResult, productResult] = await Promise.all([
        supabase.from("categories").select("id, name").order("name", { ascending: true }),
        supabase
          .from("products")
          .select("id, name, brand, price, images, primary_image_index, category_id, categories(name)")
          .order("created_at", { ascending: false }),
      ]);

      if (!mounted) return;
      if (!categoryResult.error) setCategories((categoryResult.data ?? []) as CategoryRow[]);
      if (!productResult.error) setProducts((productResult.data ?? []) as ProductRow[]);
      setLoading(false);
    }
    loadData();
    return () => { mounted = false; };
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    const cleanQuery = searchQuery.toLowerCase().replace(/\s+/g, "");
  
    const filtered = products.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.category_id === activeCategory;
  
      const cleanName = product.name.toLowerCase().replace(/\s+/g, "");
      const cleanBrand = product.brand.toLowerCase().replace(/\s+/g, "");
  
      const matchesSearch = 
        cleanName.includes(cleanQuery) || 
        cleanBrand.includes(cleanQuery);
  
      return matchesCategory && matchesSearch;
    });
  
    const sorted = [...filtered];
    if (sortBy === "low-high") {
      sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === "high-low") {
      sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }
  
    return sorted.map((product) => ({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      images: product.images?.[0] ? [product.images[0], ...(product.images ?? []).slice(1)] : [],
      primary_image_index: 0,
    }));
  }, [products, activeCategory, sortBy, searchQuery]);

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      {/* 1. PREMIUM HEADER SECTION */}
      <section className="px-6 pt-16 pb-12 md:px-12 lg:px-24 border-b border-zinc-100">
        <div className="max-w-[1400px] mx-auto">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                {searchParams.get("brand") 
                  ? searchParams.get("brand") 
                  : "Explore All"}
                <span className="text-zinc-400">.</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-500 font-medium max-w-md">
                Experience the next generation of mobile technology.
              </p>
            </div>

            {/* Price Sort: Integrated and clean */}
            <div className="flex items-center gap-3 bg-zinc-100 p-1.5 rounded-2xl w-fit">
                <span className="pl-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Sort By</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white px-4 py-2 rounded-xl text-sm font-semibold outline-none shadow-sm cursor-pointer border-none"
                >
                  <option value="none">Featured</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                </select>
            </div>
          </header>

          {/* 2. MODERN SEARCH INTERFACE */}
          <div className="mt-12 relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for models, brands, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-14 pr-6 rounded-full bg-zinc-100 text-base font-medium text-zinc-900 placeholder:text-zinc-400 outline-none transition-all focus:bg-zinc-50 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>
        </div>
      </section>

      {/* 3. STICKY CATEGORY NAV: Matches your glass-nav effect */}
      <nav className="sticky top-[64px] z-30 bg-white/80 backdrop-blur-xl border-b border-zinc-100 px-6 md:px-12 lg:px-24 py-4 overflow-x-auto no-scrollbar">
        <div className="max-w-[1400px] mx-auto flex items-center gap-3">
          <button
            onClick={() => setActiveCategory("all")}
            className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
              activeCategory === "all" 
                ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200" 
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
                activeCategory === cat.id 
                  ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200" 
                  : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </nav>

      {/* 4. CLEAN PRODUCT GRID */}
      <section className="px-6 py-12 md:px-12 lg:px-24 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${sortBy}-${searchQuery}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4"
            >
              {loading
                ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
                : filteredAndSortedProducts.map((p) => <ProductCard key={p.id} product={p} />)
              }
            </motion.div>
          </AnimatePresence>

          {/* Empty State Logic */}
          {!loading && filteredAndSortedProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900">No matches found</h3>
              <p className="text-zinc-500 mt-2 max-w-xs mx-auto">We couldn't find what you're looking for. Try a different search or category.</p>
              <button 
                onClick={() => {setSearchQuery(""); setActiveCategory("all");}}
                className="mt-6 text-blue-600 font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

// 4. Final Export with Suspense (Required for useSearchParams)
export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Loading Catalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}