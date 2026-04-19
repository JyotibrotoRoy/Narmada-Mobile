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
  is_featured: boolean;
  created_at: string;
  storage_folder: string; 
  specs: any; // Or a more specific Record type if you prefer
};

export type ActionResult = {
  ok: boolean;
  message: string;
};
