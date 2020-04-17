const colors = require('vuetify/es5/util/colors').default
require('dotenv').config()

module.exports = {
  mode: 'universal',
  server: {
    port: 4001
  },
  // env: {},
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  loading: {
    color: '#fff'
  },
  css: [],
  plugins: [{
    src: '~/plugins/socket.client.js'
  }],
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/moment'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv'
  ],
  serverMiddleware: [
    '~/server/routes'
  ],
  axios: {},
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  moment: {
    defaultTimezone: 'America/Chicago'
  },
  build: {
    extend(config, ctx) {}
  }
}
