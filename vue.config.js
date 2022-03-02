/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
const pageNames = ['configuration', 'background', 'contentScript']
const pages = {
  // contentScript: {
  //   entry: 'src/views/contentScript/index.ts',
  // },
}
pageNames.forEach((pageName) => {
  pages[pageName] = {
    // page 的入口
    entry: `src/views/${pageName}/index.ts`,
    // 模板来源
    template: `public/${pageName}.html`,
    // 在 dist/index.html 的输出
    filename: `${pageName}.html`,
    // 当使用 title 选项时，
    // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    title: `${pageName} Page`,
  }
})
module.exports = {
  outputDir: 'Bark-Chrome-Extension',
  filenameHashing: false,
  /**
   * @param {import('webpack-chain')} config
   */
  chainWebpack(config) {
    config.optimization.splitChunks({
      cacheGroups: {
        vendors: {
          name: 'chunk-vue',
          test: /[\\/]node_modules[\\/](@?vue)/,
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true,
        },
        // common: {
        //   name: 'chunk-common',
        //   priority: -10,
        //   chunks: 'initial',
        // },
      },
    })

    config.optimization.minimize(true)
    config.devtool(false)
    pageNames.forEach((pageName) => {
      config.plugins.delete(`preload-${pageName}`)
      config.plugins.delete(`prefetch-${pageName}`)
    })
    config.plugins.delete('html-contentScript')
  },
  pages: pages,
}
