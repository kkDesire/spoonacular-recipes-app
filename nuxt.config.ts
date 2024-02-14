// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    spoonacular: {
      apiKey: '',
    }
  },

  routeRules: {
    '/**': {
      // 1 day
      isr: 60 * 60 * 24
    }
  },
  $development: {
    nitro: {
      storage : {
        recipes: {
          driver: 'fs',
          base: 'recipes',
        }
      }
    }
  },

  image: {
    providers: {
      spoonacular: {
        provider: '~/providers/spoonacular',
      }
    }
  },

  modules: ['@nuxt/ui', '@nuxt/image'],

})