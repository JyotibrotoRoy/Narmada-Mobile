"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Added for redirection
import { Menu, X, Search } from "lucide-react"; // Added Search icon

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Logic: Redirect to catalog with 'q' parameter
      router.push(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <nav className="glass-nav px-4 py-2.5 sm:px-6 sm:py-3 sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          
          {/* Logo Section */}
          <Link href="/" className={`group flex items-center gap-2 sm:gap-3 ${isSearchOpen ? 'hidden md:flex' : 'flex'}`}>
            <div className="relative h-9 w-9 overflow-hidden rounded-lg sm:h-12 sm:w-12">
              <Image
                src="/narmada_logo.jpeg"
                alt="Narmada Mobile Care Logo"
                fill
                className="object-contain transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 36px, 48px"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-none tracking-tight sm:text-lg sm:tracking-tighter">
                Narmada Mobile Care
              </span>
              <span className="text-[8px] font-medium uppercase tracking-[0.16em] text-gray-400 sm:text-[10px] sm:tracking-widest">
                Northeast India's Leader
              </span>
            </div>
          </Link>

          {/* Center Links (Hidden when search is active on desktop) */}
          <div className={`hidden gap-8 text-sm font-medium text-gray-500 md:flex ${isSearchOpen ? 'md:hidden' : 'md:flex'}`}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-black">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search Logic Replacement */}
          <div className={`flex items-center gap-2 ${isSearchOpen ? 'flex-1 justify-end' : ''}`}>
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex w-full max-w-md items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 animate-in slide-in-from-right-4 duration-300">
                <Search className="size-4 text-zinc-400" />
                <input 
                  autoFocus
                  type="text"
                  placeholder="Search brands or products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none text-zinc-800"
                />
                <button type="button" onClick={() => setIsSearchOpen(false)}>
                  <X className="size-4 text-zinc-500 hover:text-black" />
                </button>
              </form>
            ) : (
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="inline-flex size-9 items-center justify-center rounded-full transition hover:bg-zinc-100 sm:size-11"
              >
                <Search className="size-5 text-zinc-800" />
              </button>
            )}

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className={`inline-flex size-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-800 md:hidden ${isSearchOpen ? 'hidden' : 'flex'}`}
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer (Cleaned up Shop Now here too) */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-[60] bg-black/35 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute right-0 top-0 flex h-full w-[78%] max-w-[300px] flex-col bg-white p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm font-semibold text-zinc-900">Menu</p>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex size-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-700"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            <div className="mt-auto pt-6 border-t border-zinc-100 text-[10px] text-zinc-400 uppercase tracking-widest text-center">
              Narmada Mobile Care © 2026
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}