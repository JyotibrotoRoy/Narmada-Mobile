// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: string;
  images: string[];
  category_id?: string | null;
  specs?: Record<string, string>;
  gift_description?: string;
  is_featured: boolean;
  created_at: string;
  primary_image_index?: number;
};

/** Fields needed for home featured grid + product card */
export type FeaturedProductRow = Pick<
  Product,
  "id" | "name" | "brand" | "price" | "images" | "primary_image_index"
>;