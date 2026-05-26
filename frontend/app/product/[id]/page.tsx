import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { supabase } from "@/lib/supabase";
import ProductGallery from "./ProductGallery";
import ProductDetails from "./ProductDetails";

type ProductPdpRow = {
  id: string;
  name: string;
  brand: string;
  price: number; // UPDATED to number
  mrp?: number | null; // ADDED
  price_prefix?: string | null; // ADDED
  images: string[];
  specs: Record<string, string> | null;
  variants: any; // for variants
  category_id: string | null;
  categories: { name: string }[] | null;
};

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  // UPDATED SELECT STRING to include mrp and price_prefix
  const { data, error } = await supabase
    .from("products")
    .select("id, name, brand, price, mrp, price_prefix, images, specs, variants, category_id, categories(name)")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const product = data as ProductPdpRow;
  const categoryName = product.categories?.[0]?.name ?? "Uncategorized";
  const specs = product.specs ?? {};
  const modelSpec = (specs.Model || specs.model || product.name) as string;
  const extraSpecs = Object.entries(specs).filter(
    ([key]) => key.toLowerCase() !== "brand" && key.toLowerCase() !== "model"
  );

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919954325690";
  const callNumber = process.env.NEXT_PUBLIC_CALL_NUMBER ?? "+919954325690";
  
  // Safely formatted the WhatsApp message to use the number
  const whatsappMessage = encodeURIComponent(
    `Hi Narmada Mobile Care, I'm interested in the ${product.name} priced at ₹${product.price.toLocaleString('en-IN')}. Is it available?`
  );
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const callHref = `tel:${callNumber}`;

  return (
    <main className="min-h-screen bg-[#f3f4f6] px-5 pb-28 pt-8 text-zinc-900 sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <Link
          href="/catalog"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Catalog
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <ProductGallery images={product.images ?? []} productName={product.name} />

          <div className="flex flex-col gap-8">
            {/* 1. This handles the interactive Price, RAM selection, and Buttons */}
            <ProductDetails product={product} />

            {/* 2. Keep your Specifications here (this part is static and fine) */}
            <section className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_8px_30px_-20px_rgba(0,0,0,0.25)] sm:p-8">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Specifications
              </h2>
              <dl className="mt-3 space-y-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="flex items-start justify-between gap-4 border-b border-zinc-200 pb-2">
                  <dt className="text-sm text-zinc-500">Brand</dt>
                  <dd className="text-right text-sm font-medium text-zinc-900">{product.brand}</dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-zinc-200 pb-2">
                  <dt className="text-sm text-zinc-500">Model</dt>
                  <dd className="text-right text-sm font-medium text-zinc-900">{modelSpec}</dd>
                </div>
                {extraSpecs.map(([key, value]) => (
                  <div key={key} className="flex items-start justify-between gap-4 border-b border-zinc-200 pb-2 last:border-0 last:pb-0">
                    <dt className="text-sm text-zinc-500">{key}</dt>
                    <dd className="text-right text-sm font-medium text-zinc-900">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}