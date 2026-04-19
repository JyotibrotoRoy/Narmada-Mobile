"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import type { ActionResult, CategoryOption } from "./_lib/schema";

const BUCKET_NAME = "mobiles";
const BASE_PREFIX = (process.env.PRODUCTS_BASE_PREFIX ?? "handsets").replace(
  /^\/+|\/+$/g,
  ""
);

function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing server env vars NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY."
    );
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeFilename(filename: string) {
  const dot = filename.lastIndexOf(".");
  const base = dot > 0 ? filename.slice(0, dot) : filename;
  const ext = dot > 0 ? filename.slice(dot).toLowerCase() : "";
  return `${slugify(base) || "image"}${ext}`;
}

export async function listCategoriesAction(): Promise<CategoryOption[]> {
  const supabase = getAdminSupabase();
  const { data, error } = await supabase
    .from("categories")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) {
    return [];
  }
  return (data ?? []) as CategoryOption[];
}

export async function createProductAction(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = getAdminSupabase();

    const name = String(formData.get("name") ?? "").trim();
    const brand = String(formData.get("brand") ?? "").trim();
    const price = String(formData.get("price") ?? "").trim();
    const categoryId = String(formData.get("categoryId") ?? "").trim();
    const isFeatured = String(formData.get("isFeatured") ?? "") === "on";
    const requestedPrimary = Number(formData.get("primaryImageIndex") ?? 0);
    const specsRaw = String(formData.get("specs") ?? "{}");
    const imageFiles = formData
      .getAll("images")
      .filter((value): value is File => value instanceof File && value.size > 0);

    if (!name || !brand || !price || !categoryId) {
      return { ok: false, message: "Name, brand, price, and category are required." };
    }

    if (imageFiles.length === 0) {
      return { ok: false, message: "Upload at least one product image." };
    }

    const { data: categoryRow, error: categoryError } = await supabase
      .from("categories")
      .select("id")
      .eq("id", categoryId)
      .single();

    if (categoryError || !categoryRow) {
      return { ok: false, message: "Selected category was not found." };
    }

    const folderName = `${brand} ${name}`.trim();
    const storageFolder = `${BASE_PREFIX}/${folderName}`.replace(/\/+/g, "/");
    const publicUrls: string[] = [];

    for (let index = 0; index < imageFiles.length; index += 1) {
      const file = imageFiles[index];
      const fileName = normalizeFilename(file.name);
      const path = `${storageFolder}/${Date.now()}-${index}-${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(path, file, {
          cacheControl: "3600",
          contentType: file.type || undefined,
          upsert: false,
        });

      if (uploadError) {
        return { ok: false, message: `Image upload failed: ${uploadError.message}` };
      }

      const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
      publicUrls.push(data.publicUrl);
    }

    const primaryImageIndex =
      Number.isInteger(requestedPrimary) && requestedPrimary >= 0
        ? Math.min(requestedPrimary, publicUrls.length - 1)
        : 0;


        let specs = {};
        try {
          specs = JSON.parse(specsRaw);
        } catch (e) {
          console.error("Failed to parse specs JSON", e);
          specs = {}; // Fallback to empty object if client sends garbage
        }

    const insertPayload: Record<string, unknown> = {
      name,
      brand,
      price,
      category_id: categoryRow.id,
      images: publicUrls,
      primary_image_index: primaryImageIndex,
      storage_folder: folderName,
      is_featured: isFeatured,
      specs: specs,
    };

    const { error: insertError } = await supabase
      .from("products")
      .insert(insertPayload)
      .select("id")
      .single();

    if (insertError) {
      return { ok: false, message: `Product creation failed: ${insertError.message}` };
    }

    revalidatePath("/admin/products");
    revalidatePath("/");

    return { ok: true, message: "Product created successfully." };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unexpected server error.",
    };
  }
}
