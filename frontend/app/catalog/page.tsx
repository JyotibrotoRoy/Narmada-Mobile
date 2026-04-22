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
    <main className="min-h-screen bg-[#f3f4f6] px-5 py-10 text-zinc-900 sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {searchParams.get("brand") ? `${searchParams.get("brand")} Products` : "Discover Products"}
            </h1>
            
            <div className="mt-4 mb-6 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-2xl border border-zinc-300 bg-white text-sm text-zinc-900 outline-none ring-zinc-400 transition focus:ring-2"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <span>Price</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="h-10 rounded-xl border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:ring-2 ring-zinc-400"
            >
              <option value="none">Default</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>
          </label>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto pb-1">
          <div className="inline-flex min-w-full gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                activeCategory === "all" ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-300 bg-white text-zinc-700"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  activeCategory === cat.id ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-300 bg-white text-zinc-700"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${sortBy}-${searchQuery}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5"
          >
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : filteredAndSortedProducts.map((p) => <ProductCard key={p.id} product={p} />)
            }
          </motion.div>
        </AnimatePresence>

        {!loading && filteredAndSortedProducts.length === 0 && (
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-8 text-center text-zinc-500">
            No products found matching your selection.
          </div>
        )}
      </div>
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