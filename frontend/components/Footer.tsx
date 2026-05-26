"use client";
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200 pt-16 pb-8 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Info */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-zinc-900 mb-4">Narmada Mobile Care</h4>
            <div className="space-y-3 text-sm text-zinc-500">
              <p className="leading-relaxed">
                Visit our Store in Chapaguri Road, Life<br />Pharma, North Bongaigaon
              </p>
              <p>
                Phone:{' '}
                <a href="tel:+918471811575" className="hover:text-zinc-900 transition-colors">
                  (+91) 8471 811 575
                </a>
              </p>
              <p>
                Email:{' '}
                <a href="mailto:narmadamobilecare@gmail.com" className="hover:text-zinc-900 transition-colors">
                  narmadamobilecare@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Working Hours */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-zinc-900 mb-4">Working hours</h4>
            <div className="space-y-3 text-sm text-zinc-500">
              <p className="font-medium text-zinc-900">
                Monday to Saturday: 10:00 AM<br />- 9:00 PM
              </p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          {/* Column 3: Trends */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-zinc-900 mb-4">Trends</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><Link href="/catalog" className="hover:text-zinc-900 transition-colors">Best sellers</Link></li>
              <li><Link href="/catalog" className="hover:text-zinc-900 transition-colors">Newest Arrival</Link></li>
              <li><Link href="/catalog" className="hover:text-zinc-900 transition-colors">Shop by Category</Link></li>
            </ul>
          </div>

          {/* Column 4: Shop */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-zinc-900 mb-4">Shop</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><Link href="/catalog?brand=Apple" className="hover:text-zinc-900 transition-colors">Apple</Link></li>
              <li><Link href="/catalog?brand=Samsung" className="hover:text-zinc-900 transition-colors">Samsung</Link></li>
              <li><Link href="/catalog?brand=mi" className="hover:text-zinc-900 transition-colors">Xiaomi</Link></li>
              <li><Link href="/catalog?brand=Vivo" className="hover:text-zinc-900 transition-colors">Vivo</Link></li>
              <li><Link href="/catalog?brand=Oppo" className="hover:text-zinc-900 transition-colors">Oppo</Link></li>
              <li><Link href="/catalog?brand=Realme" className="hover:text-zinc-900 transition-colors">Realme</Link></li>
              <li><Link href="/catalog?brand=Nothing" className="hover:text-zinc-900 transition-colors">Nothing</Link></li>
              <li><Link href="/catalog?brand=iQOO" className="hover:text-zinc-900 transition-colors">iQOO</Link></li>
            </ul>
          </div>

          {/* Column 5: Newsletter & Socials */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-zinc-900 mb-4 text-left">
              Sign up for exclusive offers and the latest news!
            </h4>
            
            {/* Input Group */}
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-zinc-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="Your email..."
                  className="w-full h-11 pl-11 pr-4 rounded-full border border-zinc-300 bg-white text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="h-11 px-6 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-800 transition-colors whitespace-nowrap"
              >
                Submit
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6 text-zinc-600">
              <a href="#" className="hover:text-black transition-colors" aria-label="Facebook">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
              </a>
              <a href="https://www.instagram.com/narmadamobilecare?igsh=MW5vdGlxMDRmbTc4cg%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors" aria-label="Instagram">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="#" className="hover:text-black transition-colors" aria-label="Twitter">
                {/* Standard X Logo */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-16 pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-medium">
          <p>© Narmada Mobile Care. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-zinc-900 transition-colors">Privacy policy</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Cookie settings</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Terms and conditions</a>
          </div>
        </div>

      </div>
    </footer>
  );
}