import tailwindcss from "@tailwindcss/vite";import tailwindcss from "@tailwindcss/vite";import tailwindcss from "@tailwindcss/vite";import { defineConfig } from "@lovable.dev/vite-tanstack-config";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import { defineConfig as defineLovableConfig } from "@lovable.dev/vite-tanstack-config";

import { nitro } from "nitro/vite";import viteReact from "@vitejs/plugin-react";import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import { fileURLToPath, URL } from "node:url";

import { defineConfig as defineViteConfig, type ConfigEnv } from "vite";import { defineConfig as defineLovableConfig } from "@lovable.dev/vite-tanstack-config";

import tsConfigPaths from "vite-tsconfig-paths";

import { nitro } from "nitro/vite";import viteReact from "@vitejs/plugin-react";export default defineConfig({

const lovableConfig = defineLovableConfig();

import { fileURLToPath, URL } from "node:url";

export default async function config(env: ConfigEnv) {

  if (process.env.VERCEL === "1") {import { defineConfig as defineViteConfig, type ConfigEnv } from "vite";import { defineConfig as defineLovableConfig } from "@lovable.dev/vite-tanstack-config";  tanstackStart: {

    return defineViteConfig({

      server: { host: "::", port: 8080 },import tsConfigPaths from "vite-tsconfig-paths";

      resolve: {

        alias: {import { nitro } from "nitro/vite";    server: { entry: "server" },

          "@": fileURLToPath(new URL("./src", import.meta.url)),

        },const lovableConfig = defineLovableConfig();

        dedupe: [

          "react",import { fileURLToPath, URL } from "node:url";  },

          "react-dom",

          "react/jsx-runtime",export default async function config(env: ConfigEnv) {

          "@tanstack/react-query",

          "@tanstack/react-query-core",  // Check if running on Vercelimport { defineConfig as defineViteConfig, type ConfigEnv } from "vite";  vite: {

        ],

      },  if (process.env.VERCEL === "1") {

      plugins: [

        tailwindcss(),    return defineViteConfig({import tsConfigPaths from "vite-tsconfig-paths";    build: {

        tsConfigPaths({ projects: ["./tsconfig.json"] }),

        tanstackStart(),      server: { host: "::", port: 8080 },

        nitro({ preset: "vercel" }),

        viteReact(),      resolve: {      outDir: "dist",

      ],

    });        alias: {

  }

          "@": fileURLToPath(new URL("./src", import.meta.url)),const lovableConfig = defineLovableConfig();      emptyOutDir: true,

  return lovableConfig(env);

}        },


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
