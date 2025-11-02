// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
    },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ],

  routeRules: {
    // Redireciona a rota raiz '/' para a rota '/product'
    // O 'statusCode: 301' indica um redirecionamento permanente, ideal para SEO.
    '/': { redirect: { to: '/product', statusCode: 301 } }
  },

})
