"use client";

import { useEffect } from "react";
import { toast } from "sonner";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    toast.error(error.message || "Failed to load product admin page.");
  }, [error.message]);

  return (
    <main className="min-h-screen bg-zinc-50 px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
        <h1 className="text-lg font-semibold text-red-700">Something went wrong</h1>
        <p className="mt-2 text-sm text-zinc-700">
          We could not load the admin products page. Try again.
        </p>
        <button
          onClick={reset}
          className="mt-4 inline-flex h-9 items-center justify-center rounded-xl bg-zinc-900 px-4 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          Retry
        </button>
      </div>
    </main>
  );
}
