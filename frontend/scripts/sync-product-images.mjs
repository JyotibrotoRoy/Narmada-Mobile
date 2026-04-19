import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.PRODUCTS_BUCKET ?? "mobiles";
const BASE_PREFIX = (process.env.PRODUCTS_BASE_PREFIX ?? "handsets").replace(
  /^\/+|\/+$/g,
  ""
);
const MAIN_IMAGE_NAMES = new Set(["main.png", "main.jpg", "main.jpeg", "main.webp"]);

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Missing env vars. Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function normalizeName(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function scoreFolderMatch(productName, folderName) {
  const product = normalizeName(productName);
  const folder = normalizeName(folderName);
  if (!product || !folder) return 0;
  if (product === folder) return 100;
  if (product.includes(folder) || folder.includes(product)) return 80;

  let overlap = 0;
  for (const ch of folder) {
    if (product.includes(ch)) overlap += 1;
  }
  return Math.floor((overlap / Math.max(product.length, folder.length)) * 100);
}

function sortImages(paths) {
  return [...paths].sort((a, b) => {
    const aName = a.split("/").pop()?.toLowerCase() ?? "";
    const bName = b.split("/").pop()?.toLowerCase() ?? "";
    const aMain = MAIN_IMAGE_NAMES.has(aName);
    const bMain = MAIN_IMAGE_NAMES.has(bName);
    if (aMain && !bMain) return -1;
    if (!aMain && bMain) return 1;
    return aName.localeCompare(bName);
  });
}

async function listProductFolders() {
  const { data, error } = await supabase.storage.from(BUCKET).list(BASE_PREFIX, {
    limit: 1000,
    sortBy: { column: "name", order: "asc" },
  });
  if (error) throw new Error(`Unable to list folders: ${error.message}`);

  return (data ?? [])
    .filter((entry) => entry.id === null)
    .map((entry) => entry.name)
    .filter(Boolean);
}

async function listImagesInFolder(folderName) {
  const folderPath = `${BASE_PREFIX}/${folderName}`.replace(/\/+/g, "/");
  const { data, error } = await supabase.storage.from(BUCKET).list(folderPath, {
    limit: 1000,
    sortBy: { column: "name", order: "asc" },
  });
  if (error) throw new Error(`Unable to list files in '${folderPath}': ${error.message}`);

  return (data ?? [])
    // Treat entries with metadata as files, which is safer than name extension checks.
    .filter((entry) => entry.id !== null && entry.metadata)
    .map((entry) => `${folderPath}/${entry.name}`);
}

async function fetchProducts() {
  const withStorageFolder = await supabase
    .from("products")
    .select("id, name, storage_folder, images, primary_image_index");

  if (!withStorageFolder.error) {
    return { products: withStorageFolder.data ?? [], hasStorageFolderColumn: true };
  }

  const fallback = await supabase
    .from("products")
    .select("id, name, images, primary_image_index");
  if (fallback.error) throw new Error(`Unable to load products: ${fallback.error.message}`);

  return { products: fallback.data ?? [], hasStorageFolderColumn: false };
}

async function updateProduct(productId, payload) {
  const { error } = await supabase.from("products").update(payload).eq("id", productId);
  if (error) throw new Error(`Update failed for ${productId}: ${error.message}`);
}

function chooseFolder(product, folders) {
  const declaredFolder = product.storage_folder?.trim();
  if (declaredFolder) {
    const normalizedDeclared = declaredFolder.replace(/^\/+|\/+$/g, "");
    const declaredName = normalizedDeclared.split("/").at(-1);
    const isKnown = folders.some(
      (folder) => folder === normalizedDeclared || folder === declaredName
    );
    if (isKnown) return declaredName;
  }

  let bestFolder = null;
  let bestScore = 0;
  for (const folder of folders) {
    const score = scoreFolderMatch(product.name, folder);
    if (score > bestScore) {
      bestScore = score;
      bestFolder = folder;
    }
  }
  return bestScore >= 60 ? bestFolder : null;
}

async function run() {
  console.log(`Syncing products from bucket '${BUCKET}/${BASE_PREFIX}'...`);
  const folders = await listProductFolders();
  const { products, hasStorageFolderColumn } = await fetchProducts();

  let updated = 0;
  let skipped = 0;
  let missingFolder = 0;

  for (const product of products) {
    const folder = chooseFolder(product, folders);
    if (!folder) {
      missingFolder += 1;
      console.warn(`No folder match for product '${product.name}' (${product.id})`);
      continue;
    }

    const imagePaths = sortImages(await listImagesInFolder(folder));
    if (!imagePaths.length) {
      skipped += 1;
      console.warn(`No images found in '${BASE_PREFIX}/${folder}' for '${product.name}'`);
      continue;
    }

    const publicUrls = imagePaths.map((path) => {
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      return data.publicUrl;
    });

    const payload = {
      images: publicUrls,
      primary_image_index: 0,
      ...(hasStorageFolderColumn ? { storage_folder: folder } : {}),
    };

    await updateProduct(product.id, payload);
    updated += 1;
    console.log(
      `Updated '${product.name}' with ${publicUrls.length} image(s) from '${BASE_PREFIX}/${folder}'.`
    );
  }

  console.log("\nSync complete");
  console.log(`Updated: ${updated}`);
  console.log(`Skipped (no images): ${skipped}`);
  console.log(`Missing folder match: ${missingFolder}`);
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
