"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    
    const router = useRouter();
  
    // Initialize the browser-side client
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  
    const handleLogin = async (e: React.BaseSyntheticEvent) => {
      e.preventDefault();
      setLoading(true);
  
      const { error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
  
      if (error) {
        toast.error("Invalid credentials.");
        setLoading(false);
      } else {
        toast.success("Identity verified.");
        router.push("/admin/products");
        router.refresh();
      }
    };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <form 
        onSubmit={handleLogin} 
        className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl"
      >
        <div className="mb-6">
          <h1 className="text-xl font-bold tracking-tight text-zinc-900">Owner Access</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Secure portal for Narmada inventory management.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-zinc-500 ml-1">Email</label>
            <input 
              type="email" 
              placeholder="owner@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-xl border border-zinc-200 px-4 text-sm outline-none focus:ring-2 focus:ring-zinc-900 transition-all" 
              required 
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-zinc-500 ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 w-full rounded-xl border border-zinc-200 px-4 text-sm outline-none focus:ring-2 focus:ring-zinc-900 transition-all" 
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-2 h-11 w-full rounded-xl bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-zinc-200"
          >
            {loading ? "Verifying..." : "Login to Dashboard"}
          </button>
        </div>
      </form>
    </main>
  );
}