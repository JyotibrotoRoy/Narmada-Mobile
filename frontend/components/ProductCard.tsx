import Image from "next/image";
import Link from "next/link";
import type { FeaturedProductRow } from "@/lib/supabase";

export function ProductCardSkeleton() {
  return (
    <div
      className="product-card flex animate-pulse flex-col p-4 sm:p-5"
      aria-hidden
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-200/70" />
      <div className="mt-4 space-y-2">
        <div className="h-2.5 w-16 rounded-full bg-zinc-200/80" />
        <div className="h-4 max-w-[12rem] rounded-full bg-zinc-200/80" />
        <div className="h-4 w-20 rounded-full bg-zinc-200/70" />
      </div>
    </div>
  );
}

type ProductCardProps = {
  product: FeaturedProductRow;
};

function getPrimaryImage(
  images: string[],
  primaryImageIndex?: number
): string | null {
  if (!images?.length) return null;
  if (
    Number.isInteger(primaryImageIndex) &&
    (primaryImageIndex as number) >= 0 &&
    (primaryImageIndex as number) < images.length
  ) {
    return images[primaryImageIndex as number];
  }
  return images[0];
}

export default function ProductCard({ product }: ProductCardProps) {
  const thumbnailSrc = getPrimaryImage(product.images, product.primary_image_index);

  return (
    <Link
      href={`/product/${encodeURIComponent(product.id)}`}
      className="product-card product-card-hover group flex flex-col p-4 outline-none ring-zinc-900/5 focus-visible:ring-2 sm:p-5"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white">
        {thumbnailSrc ? (
          <Image
            src={thumbnailSrc}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-zinc-400">
            No image
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-1 flex-col gap-1.5">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
          {product.brand}
        </p>
        <h3 className="line-clamp-2 text-[16px] font-semibold leading-snug tracking-tight text-zinc-900">
          {product.name}
        </h3>
        <p className="mt-auto pt-1 text-sm font-semibold text-zinc-800">
          {product.price}
        </p>
      </div>
    </Link>
  );
}
