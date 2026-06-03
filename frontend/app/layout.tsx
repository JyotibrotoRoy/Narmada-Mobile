import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevents annoying auto-zoom on input focus in iOS
};

export const metadata: Metadata = {
  title: "Narmada Mobile Care | Premium Mobile Store",
  description: "Northeast India's Leader in Mobile Devices and Accessories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="antialiased selection:bg-black selection:text-white overflow-x-hidden">
        <Navbar />
        {/* pt-28 (112px) is the sweet spot to ensure the Hero starts exactly under the Navbar */}
        <main className="pt-1">
          {children}
        </main>
      </body>
    </html>
  );
}
