import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "CG.az",
    description: "International construction, engineering and project management group.",
    start_url: "/",
    display: "standalone",
    background_color: "#FBF8F5",
    theme_color: "#2E1B10",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { src: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
