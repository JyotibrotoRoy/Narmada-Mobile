import type { NextConfig } from "next";

function supabaseImageRemotePatterns() {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!raw) return [];
  try {
    const { protocol, hostname } = new URL(raw);
    const proto = protocol.replace(":", "") as "https" | "http";
    return [{ protocol: proto, hostname, pathname: "/**" }];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "25mb",
    },
  },
  images: {
    remotePatterns: [
      ...supabaseImageRemotePatterns(),
      {
        protocol: "https" as const,
        hostname: "https://oxrohudrlaxlswvcmwwc.supabase.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
