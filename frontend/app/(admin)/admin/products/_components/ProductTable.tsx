import type { AdminProductRow } from "../_lib/schema";

type ProductTableProps = {
  products: AdminProductRow[];
};

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Products</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Recently created products and metadata snapshot.
          </p>
        </div>
        <p className="text-sm text-zinc-500">{products.length} total</p>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-2 py-2">Name</th>
              <th className="px-2 py-2">Brand</th>
              <th className="px-2 py-2">Category</th>
              <th className="px-2 py-2">Price</th>
              <th className="px-2 py-2">Featured</th>
              <th className="px-2 py-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-2 py-6 text-center text-zinc-500">
                  No products yet.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b border-zinc-100">
                  <td className="px-2 py-3 font-medium text-zinc-900">{product.name}</td>
                  <td className="px-2 py-3 text-zinc-700">{product.brand}</td>
                  <td className="px-2 py-3 text-zinc-700">
                    {product.categoryName ?? "Uncategorized"}
                  </td>
                  <td className="px-2 py-3 text-zinc-700">{product.price}</td>
                  <td className="px-2 py-3 text-zinc-700">
                    {product.is_featured ? "Yes" : "No"}
                  </td>
                  <td className="px-2 py-3 text-zinc-500">
                    {new Date(product.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
