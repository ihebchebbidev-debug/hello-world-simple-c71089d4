import tailwindcss from "@tailwindcss/vite";import { defineConfig } from "@lovable.dev/vite-tanstack-config";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";export default defineConfig({

import { defineConfig as defineLovableConfig } from "@lovable.dev/vite-tanstack-config";  tanstackStart: {

import { nitro } from "nitro/vite";    server: { entry: "server" },

import { fileURLToPath, URL } from "node:url";  },

import { defineConfig as defineViteConfig, type ConfigEnv } from "vite";  vite: {

import tsConfigPaths from "vite-tsconfig-paths";    build: {

      outDir: "dist",

const lovableConfig = defineLovableConfig();      emptyOutDir: true,

    },

export default async function config(env: ConfigEnv) {  },

  // Check if running on Vercel});

  if (process.env.VERCEL === "1") {
    return defineViteConfig({
      server: { host: "::", port: 8080 },
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
        dedupe: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "@tanstack/react-query",
          "@tanstack/react-query-core",
        ],
      },
      plugins: [
        tailwindcss(),
        tsConfigPaths({ projects: ["./tsconfig.json"] }),
        tanstackStart(),
        nitro({ preset: "vercel" }),
        viteReact(),
      ],
    });
  }

  // Otherwise use Lovable's standard config
  return lovableConfig(env);
}
