export default function LoadingProductsPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="h-8 w-56 animate-pulse rounded-lg bg-zinc-200" />
        <div className="h-72 animate-pulse rounded-2xl bg-zinc-200" />
        <div className="h-80 animate-pulse rounded-2xl bg-zinc-200" />
      </div>
    </main>
  );
}
