export type CategoryOption = {
  id: string;
  name: string;
};

export type AdminProductRow = {
  id: string;
  name: string;
  brand: string;
  price: string;
  categoryName: string | null;
  is_latest: boolean;
  description?: string;
  is_featured: boolean;
  created_at: string;
  storage_folder: string; 
  specs: any; // Or a more specific Record type if you prefer
  category_id: string | null; 
  variants?: any;
  mrp?: number | null;
  price_prefix?: string | null;
};

export type ActionResult = {
  ok: boolean;
  message: string;
};
