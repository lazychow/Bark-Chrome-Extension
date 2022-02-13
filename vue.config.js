/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
const pageNames = ['configuration', 'background', 'contentScript']
const pages = {
  contentScript: {
    entry: 'src/views/contentScript/index.ts',
  },
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
  outputDir:'Bark-Chrome-Extension',
  filenameHashing: false,
  chainWebpack(config) {
    config.optimization.minimize(true)
    config.devtool(false)
    pageNames.forEach((pageName) => {
      config.plugins.delete(`preload-${pageName}`)
      config.plugins.delete(`prefetch-${pageName}`)
    })
    config.plugins.delete('html-contentScript')
    // config.entry("app").clear().add("./src/main.js");
  },
  pages: pages,
}
