module.exports = (isDev) => {
  return {
    // webpack3写法
    // preserveWhitespace: true,
    // 打包时，去除空格，webpack4
    compilerOptions: {
      preserveWhitespace: true
    },
    // 会将vue组件中的css也打包到单独的css文件中
    extractCSS: !isDev

    // webpack3配置，webpack4已经需要单独在css-loader当中配置了
    // cssModules: {
    //     modules: true,
    //     localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
    //     // 把css里面的样式名称改为驼峰命名法
    //     camelCase: true
    // },

    // hotReload: false, // 根据环境变量生成
  }
}
