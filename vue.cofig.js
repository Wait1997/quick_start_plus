module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        src: '@'
      }
    }
  },
  css: {
    requireModuleExtension: false
  }
}
