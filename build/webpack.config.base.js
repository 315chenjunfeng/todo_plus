// webpack是帮忙打包前端资源的，前端资源有很多不同的类型，包括css，js，image等

const path = require('path')

// 引入自定义loader option的函数
const createVueLoaderOptions = require('./vue-loader.config')
const createCssLoaderOptions = require('./css-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  // 只接受两个值：development || production
  mode: process.env.NODE_ENV || 'production',
  target: 'web',
  // 配置前端入口，这里使用绝对路径，__dirname表示当前文件的位置，也就是根目录
  entry: path.join(__dirname, '../client/index.js'),
  // 配置出口
  output: {
    // 输出文件名
    filename: 'bundle.[hash:8].js',
    // 输出路径
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/'
  },
  module: {
    rules: [
      // {
      //   test: /\.(vue|js|jsx)$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/,
      //   enforce: 'pre'
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx/,
        loader: 'babel-loader'
      },
      {
        test: /\.js/,
        loader: 'babel-loader',
        // 将已经编译过的js文件忽略掉，不再重复编译了
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          // 写入到html里面的方式，这样打包之后会以一段js代码的方式存在，这段代码就是将css放到html里面去
          'vue-style-loader',
          // 这个css-loader是帮助webpack从文件里面把css读取出来，最终是要写入一个新文件还是要插入到html里面需要其他的loader去实现
          // 'css-loader'
          {
            loader: 'css-loader',
            options: createCssLoaderOptions(isDev)
          }
        ]
      },
      {
        test: /\.(git|jpg|jpeg|png|svg)$/,
        use: [
          {
            // url-loader可以将图片转化成base64代码，直接写在代码里面，减少http请求
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
