import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
  srcDir: 'app/',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css', 
    configPath: 'tailwind.config',
    exposeConfig: false,
    viewer: true,
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@primevue/nuxt-module',
  ],

  primevue: {
    options: {
      ripple: true,
      inputVariant: 'filled',
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'none',
          cssLayer: false
        }
      }
    }
  },

  css: [
    'primeicons/primeicons.css'
  ],

  i18n: {
    locales: [
      { code: 'pt-BR', file: 'pt-BR.json' },
      { code: 'en-US', file: 'en-US.json' }
    ],
    langDir: 'locales',
    defaultLocale: 'pt-BR',
    strategy: 'no_prefix',
  },

  routeRules: {
    '/': { redirect: { to: '/product', statusCode: 301 } }
  },

})
