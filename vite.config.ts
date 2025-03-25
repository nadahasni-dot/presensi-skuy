import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginBundleObfuscator from "vite-plugin-bundle-obfuscator";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vitePluginBundleObfuscator({
      enable: true,
      options: {
        simplify: true,
        compact: true,
      },
    }),
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "android-chrome-192x192.png",
        "android-chrome-512x512.png",
        "favicon-16x16.png",
        "favicon-32x32.png",
      ],
      manifest: {
        name: "Bjirlah Men",
        short_name: "Bjir",
        description: "Bjirlah men jangan lupa absen",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "favicon",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "favicon",
          },
          {
            src: "/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "apple touch icon",
          },
          {
            src: "/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        theme_color: "#FFFFFF",
        background_color: "#209CEE",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
