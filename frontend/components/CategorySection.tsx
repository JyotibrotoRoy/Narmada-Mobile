import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

export default async function CategorySection() {
  // Fetch categories that have an image attached
  const { data: categories, error } = await supabase
    .from("categories")
    .select("id, name, image_url")
    .not("image_url", "is", null) // Only fetch categories with images
    .order("name", { ascending: true });

  if (error || !categories) return null;

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
            Shop by Category
          </h2>
          <Link href="/catalog" className="text-sm font-semibold text-blue-600 hover:underline">
            View all
          </Link>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/catalog?category=${category.id}`} // Links to your working catalog!
              className="group flex flex-col items-center"
            >
              {/* Premium Circular Image Container */}
              <div className="relative w-32 h-32 rounded-full bg-zinc-50 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:bg-zinc-100">
                <div className="relative w-20 h-20">
                  <Image 
                    src={category.image_url} 
                    alt={category.name}
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>
              </div>
              
              <span className="mt-4 text-sm font-semibold text-zinc-700 group-hover:text-black transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
        
      </div>
    </section>
  );
}