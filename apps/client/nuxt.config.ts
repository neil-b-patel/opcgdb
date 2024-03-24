import { defineNuxtConfig, type NuxtConfig } from 'nuxt/config';

const PRERENDER_ROUTES: string[] = [];

// https://nuxt.com/docs/api/configuration/nuxt-config
const config: NuxtConfig = defineNuxtConfig({
  srcDir: 'src',
  components: false,
  modules: [
    'nuxt-simple-robots',
    ['@nuxt/image', { domains: ['cdn.opcgdb.com'] }],
    ['@nuxtjs/google-fonts', { families: { Lato: [300, 400, 500, 600, 700] } }],
  ],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  build: {},
  runtimeConfig: {
    public: {
      SST_STAGE: process.env.SST_STAGE || 'local',
    },
  },
  ssr: true,
  nitro: {
    prerender: {
      failOnError: true,
      crawlLinks: false,
      routes: PRERENDER_ROUTES,
    },
  },
  postcss: {
    plugins: {
      'postcss-nested': {},
      'postcss-custom-media': {},
    },
  },
});

export default config;
