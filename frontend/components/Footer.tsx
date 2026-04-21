import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const brands = ["Apple", "Samsung", "Mi", "Nothing", "OnePlus", "Google"];
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "All Products", href: "/catalog" },
    { name: "About Us", href: "/about" },
    { name: "Store Locator", href: "/stores" },
  ];

  return (
    <footer className="bg-[#f5f5f7] text-zinc-500 pt-12 pb-8 px-6 md:px-12 lg:px-24 text-[12px] border-t border-zinc-200">
      <div className="max-w-[1000px] mx-auto">
        
        <nav className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Section 1: Navigation */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-bold text-zinc-900 uppercase tracking-wider">Navigation</h3>
            {quickLinks.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-blue-600 transition-colors">
                {link.name}
              </Link>
            ))}
          </div>

          {/* Section 2: Brands (The Dynamic Filter) */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-bold text-zinc-900 uppercase tracking-wider">Top Brands</h3>
            <div className="grid grid-cols-2 gap-y-3 gap-x-2">
              {brands.map((brand) => (
                <Link 
                  key={brand} 
                  // Logic: Pass the brand name as a query parameter
                  href={`/catalog?brand=${encodeURIComponent(brand)}`} 
                  className="hover:text-blue-600 transition-colors"
                >
                  {brand}
                </Link>
              ))}
            </div>
          </div>

          {/* Section 3: Contact */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-bold text-zinc-900 uppercase tracking-wider">Support</h3>
            <p>Have questions about a product?</p>
            <a 
              href="tel:+919876543210" // Replace with your actual number
              className="text-lg font-bold text-zinc-900 hover:text-blue-600 transition-colors"
            >
              Call Us: +91 98765 43210
            </a>
            <p className="text-zinc-400">Mon-Sat: 10:00 AM — 8:00 PM</p>
          </div>
        </nav>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-300 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-400">
          <span>© 2026 Narmada Mobiles. All rights reserved.</span>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;