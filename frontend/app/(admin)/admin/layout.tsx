import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import LogoutButton from "@/components/LogoutButton";

export const metadata: Metadata = {
  title: "Narmada Mobile Care | Admin",
  description: "Premium Mobile Store Management",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col">
      
      {/* 1. ADMIN HEADER */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-6 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-widest uppercase text-zinc-900">
            NMC Admin
          </span>
        </div>
        
        {/* LOGOUT BUTTON CONTAINER */}
        <div className="w-32">
          <LogoutButton />
        </div>
      </header>

      {/* 2. PAGE CONTENT */}
      <main className="flex-1">
        {children}
      </main>

      {/* 3. TOAST NOTIFICATIONS */}
      <Toaster position="top-center" richColors closeButton />
      
    </div>
  );
}