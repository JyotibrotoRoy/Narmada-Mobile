"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X, Search } from "lucide-react";

// Updated NavLinks with IDs from your Categories table
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/catalog?brand=Apple", label: "iPhone" },
  { href: "/catalog?brand=Samsung", label: "Samsung" },
  { href: "/catalog?brand=Mi", label: "Mi" },
  { href: "/catalog?brand=Nothing", label: "Nothing" },
  { href: "/catalog?category=f74f0806-c7ab-4863-9eaf-2fe256e8dfbc", label: "Watches" }, // Wearables
  { href: "/catalog?category=88bf0815-33f2-439c-0a8543e9d67d", label: "AirPods" }, // Audio & Multimedia
  { href: "/catalog?category=11783b68-c293-4d59-a0ea-f0da7c82683e", label: "Accessories" }, // Mobile Accessories
  { href: "/contact", label: "Call Us" }, // Call link
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <nav className="glass-nav px-4 py-2.5 sm:px-6 sm:py-3 sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 lg:gap-4">
          
          {/* Logo Section */}
          <Link href="/" className={`group flex items-center gap-2 sm:gap-3 shrink-0 ${isSearchOpen ? 'hidden md:flex' : 'flex'}`}>
            <div className="relative h-9 w-9 overflow-hidden rounded-lg sm:h-11 sm:w-11">
              <Image
                src="/narmada_logo.jpeg"
                alt="Narmada Mobile Care Logo"
                fill
                className="object-contain transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 36px, 44px"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold leading-none tracking-tight sm:text-base">
                Narmada Mobile Care
              </span>
              <span className="text-[7px] font-medium uppercase tracking-widest text-gray-400 sm:text-[9px]">
                Northeast India's Leader
              </span>
            </div>
          </Link>

          {/* Center Links - Tightened for 9 items */}
          <div className={`hidden gap-4 lg:gap-6 text-[13px] font-semibold text-gray-500 xl:text-sm md:flex ${isSearchOpen ? 'md:hidden' : 'md:flex'}`}>
  {navLinks.map((link) => (
    <Link 
      key={link.href} 
      href={link.href} 
      className="transition hover:text-black whitespace-nowrap"
    >
      {link.label}
    </Link>
  ))}
</div>

          {/* Search Logic */}
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
                className="inline-flex size-9 items-center justify-center rounded-full transition hover:bg-zinc-100"
              >
                <Search className="size-5 text-zinc-800" />
              </button>
            )}

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className={`inline-flex size-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-800 md:hidden ${isSearchOpen ? 'hidden' : 'flex'}`}
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-black/35 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute right-0 top-0 flex h-full w-[78%] max-w-[300px] flex-col bg-white p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm font-semibold text-zinc-900">Menu</p>
              <button onClick={() => setMobileOpen(false)} className="size-8 flex items-center justify-center rounded-full border border-zinc-100">
                <X className="size-4" />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-1">
  {navLinks.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      onClick={() => setMobileOpen(false)}
      className={`rounded-xl px-3 py-2 text-[15px] font-medium transition ${
        link.label === "Call Us" 
          ? "text-blue-600 font-bold bg-blue-50 mt-2" 
          : "text-zinc-800 hover:bg-zinc-50"
      }`}
    >
      {link.label}
    </Link>
  ))}
</div>
          </div>
        </div>
      )}
    </>
  );
}