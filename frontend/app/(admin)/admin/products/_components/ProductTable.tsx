"use client";

import { useState, useMemo } from "react";
import { Search, Pencil, Trash2, X } from "lucide-react";
import type { AdminProductRow } from "../_lib/schema";
import { toast } from "sonner";
import { deleteProductAction } from "../actions";
import { useRouter } from "next/navigation";

type ProductTableProps = {
  products: AdminProductRow[];
  // Future-proofing for actions
  onEdit?: (product: AdminProductRow) => void;
  onDelete?: (id: string) => void;
};

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = async (id: string, folder: string) => {
    // 1. Browser confirmation (Client-side only)
    const confirmed = window.confirm("Are you sure? This will permanently delete the product and all cloud images.");
    if (!confirmed) return;

    try {
      // 2. Execute the Server Action
      const result = await deleteProductAction(id, folder);
      
      if (result.ok) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("An unexpected error occurred during deletion.");
    }
  };

  // Logic: Filter products based on Name or Brand (normalized)
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().replace(/\s+/g, "");
    return products.filter((p) =>
      p.name.toLowerCase().replace(/\s+/g, "").includes(q) ||
      p.brand.toLowerCase().replace(/\s+/g, "").includes(q)
    );
  }, [searchQuery, products]);

  return (
    <section className="flex flex-col gap-4">
      {/* 1. Search Bar Header */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="h-4 w-4 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search products by name or brand..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-12 w-full rounded-2xl border border-zinc-200 bg-white pl-11 pr-12 text-sm outline-none ring-zinc-300 transition-all focus:ring-2 shadow-sm"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-400 hover:text-zinc-900"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* 2. The Table Section */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm overflow-hidden">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Inventory</h2>
            <p className="mt-1 text-sm text-zinc-600">
              {searchQuery ? `Found ${filteredProducts.length} results` : "Manage your mobile catalog"}
            </p>
          </div>
          <p className="text-sm text-zinc-500 font-medium">{products.length} total</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-zinc-200 text-[10px] uppercase tracking-widest font-bold text-zinc-400">
              <tr>
                <th className="px-2 py-3">Product Name</th>
                <th className="px-2 py-3 text-center">Category</th>
                <th className="px-2 py-3 text-center">Price</th>
                <th className="px-2 py-3 text-center">Featured</th>
                <th className="px-2 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-2 py-12 text-center text-zinc-400 italic">
                    {searchQuery ? "No matching products found." : "No products yet. Start by adding one above."}
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="group hover:bg-zinc-50/50 transition-colors">
                    <td className="px-2 py-4">
                      <div className="font-semibold text-zinc-900">{product.name}</div>
                      <div className="text-[10px] text-zinc-400 uppercase tracking-tighter">{product.brand}</div>
                    </td>
                    <td className="px-2 py-4 text-center">
                      <span className="inline-flex rounded-lg bg-zinc-100 px-2 py-1 text-[10px] font-bold text-zinc-600 uppercase">
                        {product.categoryName ?? "General"}
                      </span>
                    </td>
                    <td className="px-2 py-4 text-center font-medium text-zinc-700">{product.price}</td>
                    <td className="px-2 py-4 text-center">
                      {product.is_featured ? (
                        <span className="text-amber-500 text-xs font-bold uppercase tracking-tighter">★ Yes</span>
                      ) : (
                        <span className="text-zinc-300 text-xs">No</span>
                      )}
                    </td>
                    <td className="px-2 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => {
                            // This pushes "?edit=[id]" to the URL
                            router.push(`/admin/products?edit=${product.id}`);
                          }}
                          className="p-2 rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 transition-all"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id, product.storage_folder)}
                          className="p-2 rounded-lg text-zinc-400 hover:bg-red-50 hover:text-red-600 transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}