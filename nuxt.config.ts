// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'app/',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
    },
  },

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui'
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
    // Redirects the root route '/' to the '/product' route.
    // The 'statusCode: 301' Indicates a permanent redirect, ideal for SEO.
    '/': { redirect: { to: '/product', statusCode: 301 } }
  },

})
