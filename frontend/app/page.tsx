import { supabase, type FeaturedProductRow } from "@/lib/supabase";
import HomePage from "@/components/HomePage";
import HeroSection from './HeroSection';
import FeatureCards from '../components/FeatureCards';
import LatestSection from '../components/LatestSection';
import Footer from '../components/Footer';
export const dynamic = 'force-dynamic';

export default async function Home() {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, brand, price, images, primary_image_index")
    .eq("is_featured", true)
    .limit(4);

  const { data: latestData, error: latestError } = await supabase
    .from("products")
    .select("id, name, brand, price, images, primary_image_index, description")
    .eq("is_latest", true) // Use the new column here
    .limit(8);

    console.log("--- DEBUG START ---");
    console.log("Latest Data Length:", latestData?.length || 0);
    if (latestError) console.error("Supabase Error:", latestError.message);
    console.log("--- DEBUG END ---");

  const featuredProducts: FeaturedProductRow[] =
    !error && data?.length ? (data as FeaturedProductRow[]) : [];

  const latestProducts = 
    !latestError && latestData?.length ? latestData : [];

    return (
      <main className="min-h-screen">
        {/* 1. Hero Section: This occupies the top viewport to grab attention immediately */}
        <HeroSection />
        <FeatureCards />
        <LatestSection products={latestProducts} />
  
        {/* 2. Featured Content: The rest of your landing page logic */}
        <HomePage featuredProducts={featuredProducts} />
        <Footer />
      </main>
    );
  }
