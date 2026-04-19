"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="glass-nav px-4 py-2.5 sm:px-6 sm:py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 sm:gap-3">
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

          <div className="hidden gap-8 text-sm font-medium text-gray-500 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-black">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/catalog"
              className="rounded-full bg-black px-4 py-2 text-[11px] font-bold text-white transition hover:bg-gray-800 sm:px-6 sm:py-2.5 sm:text-xs"
            >
              SHOP NOW
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex size-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-800 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[60] bg-black/35 md:hidden">
          <div className="absolute right-0 top-0 flex h-full w-[78%] max-w-[300px] flex-col border-l border-zinc-200 bg-white p-5 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm font-semibold text-zinc-900">Menu</p>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex size-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-700"
                aria-label="Close menu"
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

            <Link
              href="/catalog"
              onClick={() => setMobileOpen(false)}
              className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-black px-4 text-sm font-semibold text-white"
            >
              Shop Now
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}