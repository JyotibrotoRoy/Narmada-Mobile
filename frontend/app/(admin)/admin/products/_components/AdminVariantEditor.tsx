"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Save } from "lucide-react";

type Variant = {
  label: string; // Universal: "8GB/128GB" or "34 Inches"
  price: number;
};

export default function AdminVariantEditor({ productId, initialVariants = [] }: { productId: string, initialVariants: any[] }) {
  const [variants, setVariants] = useState<Variant[]>(initialVariants);
  const [loading, setLoading] = useState(false);

  const addVariant = () => {
    setVariants([...variants, { label: "", price: 0 }]);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleUpdate = (index: number, field: keyof Variant, value: string | number) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value } as Variant;
    setVariants(updated);
  };

  const saveToDb = async () => {
    setLoading(true);
    const { error } = await supabase.from("products").update({ variants }).eq("id", productId);
    setLoading(false);
    if (error) alert("Error: " + error.message);
    else alert("Configurations updated!");
  };

  return (
    <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Product Variants</h3>
        <button type="button" onClick={addVariant} className="text-xs font-bold text-zinc-900 bg-white border border-zinc-200 px-3 py-2 rounded-lg hover:bg-zinc-100">
          + Add Configuration
        </button>
      </div>

      <div className="space-y-3">
        {variants.map((v, index) => (
          <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-zinc-100 shadow-sm">
            <input 
              type="text" 
              placeholder="e.g. 8GB/128GB or 34 Inches"
              value={v.label}
              onChange={(e) => handleUpdate(index, "label", e.target.value)}
              className="flex-[2] min-w-0 h-9 px-3 rounded-lg border border-zinc-200 text-xs focus:ring-1 focus:ring-black"
            />
            <div className="flex-1 flex items-center gap-2">
              <span className="text-zinc-400 text-xs">₹</span>
              <input 
                type="number" 
                value={v.price || ""}
                onChange={(e) => handleUpdate(index, "price", parseInt(e.target.value) || 0)}
                className="w-full h-9 px-2 rounded-lg border border-zinc-200 text-xs focus:ring-1 focus:ring-black"
              />
            </div>
            <button type="button" onClick={() => removeVariant(index)} className="p-2 text-zinc-300 hover:text-red-500">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {variants.length > 0 && (
        <button type="button" onClick={saveToDb} disabled={loading} className="mt-6 w-full h-11 rounded-xl bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 disabled:opacity-50">
          {loading ? "Syncing..." : "Update Database"}
        </button>
      )}
    </div>
  );
}