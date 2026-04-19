"use client";

import { useEffect, useMemo, useState } from "react";
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

export default function CatalogPage() {
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"none" | "low-high" | "high-low">("none");

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      const [categoryResult, productResult] = await Promise.all([
        supabase.from("categories").select("id, name").order("name", { ascending: true }),
        supabase
          .from("products")
          .select(
            "id, name, brand, price, images, primary_image_index, category_id, categories(name)"
          )
          .order("created_at", { ascending: false }),
      ]);

      if (!mounted) return;

      if (!categoryResult.error) {
        setCategories((categoryResult.data ?? []) as CategoryRow[]);
      }

      if (!productResult.error) {
        setProducts((productResult.data ?? []) as ProductRow[]);
      }

      setLoading(false);
    }

    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    const filtered =
      activeCategory === "all"
        ? products
        : products.filter((product) => product.category_id === activeCategory);

    const sorted = [...filtered];
    if (sortBy === "low-high") {
      sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === "high-low") {
      sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }

    return sorted.map((product) => {
      // Force first image as thumbnail source for catalog cards.
      const firstImage = product.images?.[0] ?? "";
      return {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        images: firstImage ? [firstImage, ...(product.images ?? []).slice(1)] : [],
        primary_image_index: 0,
      };
    });
  }, [products, activeCategory, sortBy]);

  return (
    <main className="min-h-screen bg-[#f3f4f6] px-5 py-10 text-zinc-900 sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Discover Products
            </h1>
            <p className="mt-2 text-sm text-zinc-600">
              Browse all arrivals by category with instant filtering.
            </p>
          </div>

          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <span>Price</span>
            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as "none" | "low-high" | "high-low")
              }
              className="h-10 rounded-xl border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2"
            >
              <option value="none">Default</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>
          </label>
        </div>

        <div className="mb-8 overflow-x-auto pb-1">
          <div className="inline-flex min-w-full gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                activeCategory === "all"
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-500"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  activeCategory === category.id
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-500"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${sortBy}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5"
          >
            {loading
              ? Array.from({ length: 8 }, (_, index) => <ProductCardSkeleton key={index} />)
              : filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </motion.div>
        </AnimatePresence>

        {!loading && filteredAndSortedProducts.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-8 text-center text-zinc-500">
            No products found for this category.
          </div>
        ) : null}
      </div>
    </main>
  );
}
