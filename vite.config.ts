import tailwindcss from "@tailwindcss/vite";import tailwindcss from "@tailwindcss/vite";import { defineConfig } from "@lovable.dev/vite-tanstack-config";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import { defineConfig as defineLovableConfig } from "@lovable.dev/vite-tanstack-config";

import { nitro } from "nitro/vite";import viteReact from "@vitejs/plugin-react";export default defineConfig({

import { fileURLToPath, URL } from "node:url";

import { defineConfig as defineViteConfig, type ConfigEnv } from "vite";import { defineConfig as defineLovableConfig } from "@lovable.dev/vite-tanstack-config";  tanstackStart: {

import tsConfigPaths from "vite-tsconfig-paths";

import { nitro } from "nitro/vite";    server: { entry: "server" },

const lovableConfig = defineLovableConfig();

import { fileURLToPath, URL } from "node:url";  },

export default async function config(env: ConfigEnv) {

  // Check if running on Vercelimport { defineConfig as defineViteConfig, type ConfigEnv } from "vite";  vite: {

  if (process.env.VERCEL === "1") {

    return defineViteConfig({import tsConfigPaths from "vite-tsconfig-paths";    build: {

      server: { host: "::", port: 8080 },

      resolve: {      outDir: "dist",

        alias: {

          "@": fileURLToPath(new URL("./src", import.meta.url)),const lovableConfig = defineLovableConfig();      emptyOutDir: true,

        },

        dedupe: [    },

          "react",

          "react-dom",export default async function config(env: ConfigEnv) {  },

          "react/jsx-runtime",

          "@tanstack/react-query",  // Check if running on Vercel});

          "@tanstack/react-query-core",

        ],  if (process.env.VERCEL === "1") {

      },    return defineViteConfig({

      plugins: [      server: { host: "::", port: 8080 },

        tailwindcss(),      resolve: {

        tsConfigPaths({ projects: ["./tsconfig.json"] }),        alias: {

        tanstackStart(),          "@": fileURLToPath(new URL("./src", import.meta.url)),

        nitro({ preset: "vercel" }),        },

        viteReact(),        dedupe: [

      ],          "react",

    });          "react-dom",

  }          "react/jsx-runtime",

          "@tanstack/react-query",

  // Otherwise use Lovable's standard config          "@tanstack/react-query-core",

  return lovableConfig(env);        ],

}      },

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
