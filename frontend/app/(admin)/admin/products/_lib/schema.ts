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
};

export type ActionResult = {
  ok: boolean;
  message: string;
};
