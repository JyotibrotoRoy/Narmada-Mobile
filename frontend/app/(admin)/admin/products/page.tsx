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
    .select("id, name, brand, price, is_featured, is_latest, created_at, storage_folder, specs, category_id, variants, categories(name)")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return [];
  return (data ?? []).map((row) => {
    const categoryData = row.categories as any;
    return {
      id: row.id as string,
      name: row.name as string,
      brand: row.brand as string,
      price: row.price as string,
      is_featured: row.is_featured as boolean,
      is_latest: row.is_latest as boolean,
      created_at: row.created_at as string,
      categoryName: categoryData?.name ?? null,
      storage_folder: row.storage_folder as string,
      specs: row.specs as any,
      category_id: row.category_id, 
      variants: row.variants || [],
    };
  });
}

/*export default async function ProductsPage() {
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
}*/

export default async function ProductsPage(props: { 
  searchParams: Promise<{ edit?: string }> 
}) {
  // 1. Get the 'edit' ID from the URL
  const searchParams = await props.searchParams;
  const editId = searchParams.edit;

  // 2. Fetch the products
  const products = await getProducts();

  // 3. Find the specific product the user wants to edit
  const editingProduct = editId 
    ? products.find((p) => p.id === editId) || null 
    : null;

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

        {/* 4. Pass the product data to the Form */}
        <ProductForm initialData={editingProduct} />
        
        <ProductTable products={products} />
      </div>
    </main>
  );
}
