"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createProductAction, updateProductAction, listCategoriesAction } from "../actions";
import type { CategoryOption } from "../_lib/schema";
import type { AdminProductRow } from "../_lib/schema";
import AdminVariantEditor from "./AdminVariantEditor";

interface ProductFormProps {
  initialData: AdminProductRow | null;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [selectedPrimary, setSelectedPrimary] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const [currentCategoryId, setCurrentCategoryId] = useState(initialData?.category_id || "");

  const [specList, setSpecList] = useState([{ key: "", value: "" }]);

  const needsVariants = useMemo(() => {
    const selectedCat = categories.find((c) => c.id === currentCategoryId);
    if (!selectedCat) return false;

    const name = selectedCat.name.toLowerCase();
  // Add any keyword here that should trigger the "Configuration" editor
  return (
    name.includes("phone") ||
    name.includes("laptop") ||
    name.includes("tablet") ||
    name.includes("tv") ||
    name.includes("monitor") ||
    name.includes("ipad")
  );
}, [currentCategoryId, categories]);

  useEffect(() => {
    if (initialData?.specs) {
      const existingSpecs = Object.entries(initialData.specs).map(([key, value]) => ({
        key,
        value: String(value),
      }));
      setSpecList(existingSpecs.length > 0 ? existingSpecs : [{ key: "", value: "" }]);
    } else {
      setSpecList([{ key: "", value: "" }]);
    }
  }, [initialData]);

  const addSpecRow = () => setSpecList([...specList, { key: "", value: "" }]);

  const updateSpec = (index: number, field: "key" | "value", val: string) => {
    const newSpecs = [...specList];
    newSpecs[index][field] = val;
    setSpecList(newSpecs);
  };

  const removeSpec = (index: number) => {
    if (specList.length === 1) {
      setSpecList([{ key: "", value: "" }]); // Keep at least one row
    } else {
      setSpecList(specList.filter((_, i) => i !== index));
    }
  };

  const selectedFileLabels = useMemo(
    () =>
      selectedFiles.map(
        (file) =>
          ((file as File & { webkitRelativePath?: string }).webkitRelativePath || file.name)
      ),
    [selectedFiles]
  );

  useEffect(() => {
    let mounted = true;
    listCategoriesAction()
      .then((rows) => {
        if (mounted) setCategories(rows);
      })
      .catch(() => {
        toast.error("Failed to load categories.");
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const folderInput = folderInputRef.current;
    if (!folderInput) return;
    folderInput.setAttribute("webkitdirectory", "");
    folderInput.setAttribute("directory", "");
    folderInput.setAttribute("mozdirectory", "");
  }, []);

  const canSubmit = useMemo(
    () => !isPending && categories.length > 0,
    [isPending, categories.length]
  );

  function mergeSelectedFiles(files: File[]) {
    const merged = [...selectedFiles, ...files];
    setSelectedFiles(merged);
    if (selectedPrimary >= merged.length) {
      setSelectedPrimary(0);
    }
  }

  return (
    <form
      key={initialData?.id || "new"}
      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);


        if (!initialData && selectedFiles.length === 0) {
          toast.error("Please select images for the new product.");
          return;
        }
        
        formData.delete("images");
        selectedFiles.forEach((file) => formData.append("images", file));
        formData.set("primaryImageIndex", String(selectedPrimary));

        const finalSpecs = Object.fromEntries(
          specList
            .filter((s) => s.key.trim() && s.value.trim())
            .map((s) => [s.key.trim(), s.value.trim()])
        );
        formData.set("specs", JSON.stringify(finalSpecs));

        /*if (selectedFiles.length === 0) {
          toast.error("Choose multiple images or select a folder first.");
          return;
        }*/

        startTransition(async () => {
          const result = initialData 
            ? await updateProductAction(initialData.id, formData) // Call update
            : await createProductAction(formData);               // Call create
        
          if (!result.ok) {
            toast.error(result.message);
            return;
          }
        
          toast.success(result.message);
          
          // If we were editing, clear the URL to exit edit mode
          if (initialData) {
            router.push("/admin/products");
          } else {
            // Reset only if it was a NEW product
            form.reset();
            setSelectedFiles([]);
            setSpecList([{ key: "", value: "" }]);
          }
          router.refresh();
        });
      }}
    >
      <h2 className="text-lg font-semibold tracking-tight">{initialData ? `Edit Product: ${initialData.name}` : "Add Product"}</h2>
      <p className="mt-1 text-sm text-zinc-600">
        Upload images to Supabase storage and save product details.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-zinc-700">Product Name</span>
          <input
            name="name"
            defaultValue={initialData?.name}
            required
            className="h-10 rounded-xl border border-zinc-200 bg-zinc-50 px-3 outline-none ring-zinc-300 focus:ring-2"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-zinc-700">Brand</span>
          <input
            name="brand"
            defaultValue={initialData?.brand}
            required
            className="h-10 rounded-xl border border-zinc-200 bg-zinc-50 px-3 outline-none ring-zinc-300 focus:ring-2"
          />
        </label>

        <div className="col-span-2 grid gap-4 sm:grid-cols-3">
          
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-zinc-700">Price Label</span>
            <select
              name="price_prefix"
              defaultValue={initialData?.price_prefix ?? ""}
              className="h-10 rounded-xl border border-zinc-200 bg-zinc-50 px-3 outline-none ring-zinc-300 focus:ring-2 text-zinc-600"
            >
              <option value="">None</option>
              <option value="Starting at">Starting at</option>
              <option value="From">From</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-zinc-700">Selling Price (₹)</span>
            <input
              name="price"
              type="number"
              defaultValue={initialData?.price}
              required
              min="0"
              placeholder="59999"
              className="h-10 rounded-xl border border-zinc-200 bg-zinc-50 px-3 outline-none ring-zinc-300 focus:ring-2"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-zinc-700">MRP (₹) (Optional)</span>
            <input
              name="mrp"
              type="number"
              defaultValue={initialData?.mrp ?? ""}
              min="0"
              placeholder="65999"
              className="h-10 rounded-xl border border-zinc-200 bg-zinc-50 px-3 outline-none ring-zinc-300 focus:ring-2"
            />
          </label>
          
        </div>

        <label className="flex flex-col gap-1.5 text-sm col-span-2">
  <span className="font-medium text-zinc-700">Short Description (for Carousel)</span>
  <textarea
    name="description"
    defaultValue={initialData?.description}
    placeholder="e.g., All-out Pro. Hello, Apple Intelligence."
    rows={2}
    className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 outline-none ring-zinc-300 focus:ring-2 resize-none"
  />
</label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-zinc-700">Category</span>
          <select
            name="categoryId"
            required
            value={currentCategoryId} // Controlled value
            onChange={(e) => setCurrentCategoryId(e.target.value)}
            className="h-10 rounded-xl border border-zinc-200 bg-zinc-50 px-3 outline-none ring-zinc-300 focus:ring-2"
          >
            <option value="" disabled>
              {categories.length ? "Select a category" : "Loading categories..."}
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 space-y-4 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">
            Technical Specifications
          </h3>
          <button
            type="button"
            onClick={addSpecRow}
            className="text-xs font-semibold text-zinc-900 bg-white border border-zinc-200 px-3 py-1.5 rounded-lg shadow-sm hover:bg-zinc-100 transition"
          >
            + Add Row
          </button>
        </div>

        <div className="space-y-2">
          {specList.map((spec, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                placeholder="Key (e.g. RAM)"
                value={spec.key}
                onChange={(e) => updateSpec(index, "key", e.target.value)}
                className="h-10 flex-1 rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-300 transition"
              />
              <input
                placeholder="Value (e.g. 12GB)"
                value={spec.value}
                onChange={(e) => updateSpec(index, "value", e.target.value)}
                className="h-10 flex-1 rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-300 transition"
              />
              <button
                type="button"
                onClick={() => removeSpec(index)}
                className="flex h-10 w-10 items-center justify-center text-zinc-400 hover:text-red-500 transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SMART VARIANT EDITOR SECTION */}
      {initialData?.id && (
        <div className="mt-8 pt-8 border-t border-zinc-100">
          {needsVariants ? (
            <AdminVariantEditor 
              productId={initialData.id} 
              initialVariants={initialData.variants} 
            />
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/30 p-6 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300">
                Variants disabled for {categories.find(c => c.id === currentCategoryId)?.name || "this category"}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_1fr_180px]">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-zinc-700">Select Images</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(event) => {
              mergeSelectedFiles(Array.from(event.target.files ?? []));
              event.currentTarget.value = "";
            }}
            className="h-10 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none ring-zinc-300 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-900 file:px-3 file:py-1.5 file:text-white hover:file:bg-zinc-700 focus:ring-2"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-zinc-700">Or Select Folder</span>
          <input
            ref={folderInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(event) => {
              mergeSelectedFiles(Array.from(event.target.files ?? []));
              event.currentTarget.value = "";
            }}
            className="h-10 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none ring-zinc-300 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-900 file:px-3 file:py-1.5 file:text-white hover:file:bg-zinc-700 focus:ring-2"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-zinc-700">Primary Image</span>
          <select
            name="primaryImageIndex"
            value={selectedPrimary}
            onChange={(event) => setSelectedPrimary(Number(event.target.value))}
            className="h-10 rounded-xl border border-zinc-200 bg-zinc-50 px-3 outline-none ring-zinc-300 focus:ring-2"
          >
            {selectedFileLabels.length === 0 ? (
              <option value={0}>Image #1</option>
            ) : (
              selectedFileLabels.map((fileName, index) => (
                <option key={`${fileName}-${index}`} value={index}>
                  {`#${index + 1} ${fileName}`}
                </option>
              ))
            )}
          </select>
        </label>
      </div>

      {selectedFileLabels.length > 0 ? (
        <div className="mt-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            {selectedFileLabels.length} image(s) selected
          </p>
          <p className="mt-1 text-xs text-zinc-600">
            Main image: {selectedFileLabels[selectedPrimary] ?? "Image #1"}
          </p>
        </div>
      ) : null}

      {/* NEW: Promote to Latest Card */}
<div className="mt-6 flex items-center space-x-3 p-4 border rounded-2xl bg-zinc-50 border-zinc-200">
  <input 
    type="checkbox" 
    name="is_latest" 
    id="is_latest"
    // IMPORTANT: Changed 'product' to 'initialData' to match your component's props
    defaultChecked={initialData?.is_latest || false}
    className="h-5 w-5 rounded-md border-zinc-300 text-zinc-900 focus:ring-zinc-900"
  />
  <div className="flex flex-col">
    <label htmlFor="is_latest" className="text-sm font-semibold text-zinc-900">
      Promote to "The Latest"
    </label>
    <p className="text-xs text-zinc-500">
      This will place the product in the horizontal carousel on the homepage.
    </p>
  </div>
</div>

      <label className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-700">
        <input
          type="checkbox"
          name="isFeatured"
          className="size-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-300"
        />
        <span className="text-sm font-medium text-zinc-700">
    Promote to "Sweet Spot" (Budget Friendly)
  </span>
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-5 inline-flex h-10 items-center justify-center rounded-xl bg-zinc-900 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Create Product"}
      </button>
    </form>
  );
}
