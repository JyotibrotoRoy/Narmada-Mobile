import { supabase, type FeaturedProductRow } from "@/lib/supabase";
import HomePage from "@/components/HomePage";

export default async function Home() {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, brand, price, images, primary_image_index")
    .eq("is_featured", true)
    .limit(4);

  const featuredProducts: FeaturedProductRow[] =
    !error && data?.length ? (data as FeaturedProductRow[]) : [];

  return <HomePage featuredProducts={featuredProducts} />;
}
