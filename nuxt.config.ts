import Aura from "@primeuix/themes/aura";
import { definePreset } from "@primevue/themes";

const BrandPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#3c0074",
      600: "#20004b",
      700: "#1b074b",
      800: "#100033",
      900: "#0a001f",
      950: "#050010",
    },
    colorScheme: {
      light: {
        primary: {
          color: "{primary.600}",
          contrastColor: "#ffffff",
          hoverColor: "{primary.700}",
          activeColor: "{primary.800}",
        },
        surface: {
          0: "#ffffff",
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
      },
    },
  },
});

export default defineNuxtConfig({
  srcDir: "app/",
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  app: {
    head: {
      title: "Galaxy Cupcakes",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Cupcake e-commerce" },
      ],
    },
  },

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    viewer: true,
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:8000",
    },
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@primevue/nuxt-module",
  ],

  primevue: {
    options: {
      ripple: true,
      inputVariant: "filled",
      theme: {
        preset: BrandPreset,
        options: {
          prefix: "p",
          darkModeSelector: "system",
          cssLayer: false,
        },
      },
    },
  },

  css: ["primeicons/primeicons.css"],

  i18n: {
    locales: [
      { code: "pt-BR", file: "pt-BR.json" },
      { code: "en-US", file: "en-US.json" },
    ],
    langDir: "locales",
    defaultLocale: "pt-BR",
    strategy: "no_prefix",
  },

  routeRules: {
    "/": { redirect: { to: "/product", statusCode: 301 } },
  },
});
