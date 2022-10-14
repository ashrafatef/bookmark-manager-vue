const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    disableHostCheck: true
  },
  pluginOptions: {
    apollo: {
      enableMocks: true,
      enableEngine: true
    }
  }
})
