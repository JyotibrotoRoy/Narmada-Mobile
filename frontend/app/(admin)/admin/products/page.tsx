import { createClient } from "@supabase/supabase-js";
import ProductForm from "./_components/ProductForm";
import ProductTable from "./_components/ProductTable";
import type { AdminProductRow } from "./_lib/schema";

function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing server env vars NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY."
    );
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function getProducts(): Promise<AdminProductRow[]> {
  const supabase = getAdminSupabase();
  const { data, error } = await supabase
    .from("products")
    .select("id, name, brand, price, is_featured, created_at, categories(name)")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return [];
  return (data ?? []).map((row) => {
    const categoryRelation = row.categories as { name: string }[] | null;
    const category = Array.isArray(categoryRelation)
      ? (categoryRelation[0] ?? null)
      : null;
    return {
      id: row.id as string,
      name: row.name as string,
      brand: row.brand as string,
      price: row.price as string,
      is_featured: row.is_featured as boolean,
      created_at: row.created_at as string,
      categoryName: category?.name ?? null,
    };
  });
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-zinc-50 px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Product Management
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            Create products, upload multiple images, and link to categories by UUID.
          </p>
        </header>

        <ProductForm />
        <ProductTable products={products} />
      </div>
    </main>
  );
}
