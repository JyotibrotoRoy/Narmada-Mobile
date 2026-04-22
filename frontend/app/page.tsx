import { supabase } from "@/lib/supabase";
import HeroSection from './HeroSection';
import FeatureCards from '../components/FeatureCards';
import LatestSection from '../components/LatestSection';
import BudgetSection from '@/components/BudgetSection'; // The new section
import Footer from '../components/Footer';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // 1. Parallel Fetching: Fetch both buckets of data at the same time
  const [budgetRes, latestRes] = await Promise.all([
    supabase
      .from("products")
      .select("id, name, brand, price, images, primary_image_index, description") // Added description
      .eq("is_featured", true)
      .limit(10), // Increased limit for carousel
    supabase
      .from("products")
      .select("id, name, brand, price, images, primary_image_index, description")
      .eq("is_latest", true)
      .limit(10)
  ]);

  // 2. Error handling & Data Mapping
  if (budgetRes.error) console.error("Budget Query Error:", budgetRes.error.message);
  if (latestRes.error) console.error("Latest Query Error:", latestRes.error.message);

  const budgetProducts = budgetRes.data || [];
  const latestProducts = latestRes.data || [];

  return (
    <main className="min-h-screen bg-white">
      {/* Brand Hero */}
      <HeroSection />

      {/* Flagship Promo Cards */}
      <FeatureCards />
      
      {/* 3. The "Latest" Carousel */}
      <LatestSection products={latestProducts} />

      {/* 4. The "Sweet Spot" Carousel (Replacing HomePage grid) */}
      <BudgetSection products={budgetProducts} />
      
      {/* 5. Footer */}
      <Footer />
    </main>
  );
}