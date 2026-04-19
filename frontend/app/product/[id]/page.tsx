import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { supabase } from "@/lib/supabase";
import ProductGallery from "./ProductGallery";

type ProductPdpRow = {
  id: string;
  name: string;
  brand: string;
  price: string;
  images: string[];
  specs: Record<string, string> | null;
  category_id: string | null;
  categories: { name: string }[] | null;
};

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("products")
    .select("id, name, brand, price, images, specs, category_id, categories(name)")
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
  const whatsappMessage = encodeURIComponent(
    `Hi Narmada Mobile Care, I'm interested in the ${product.name} priced at ${product.price}. Is it available?`
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

          <section className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_8px_30px_-20px_rgba(0,0,0,0.25)] sm:p-8">
            <span className="inline-flex items-center rounded-full border border-zinc-300 bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-700">
              {categoryName}
            </span>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              {product.price}
            </p>

            <div className="mt-7">
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
            </div>

            <div className="mt-8 hidden gap-3 sm:flex">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 text-sm font-semibold text-white transition hover:brightness-95"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={callHref}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </div>
          </section>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200/70 bg-white/80 p-3 backdrop-blur-md sm:hidden">
        <div className="mx-auto flex w-full max-w-6xl gap-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 text-sm font-semibold text-white"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href={callHref}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 text-sm font-semibold text-white"
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
        </div>
      </div>
    </main>
  );
}
