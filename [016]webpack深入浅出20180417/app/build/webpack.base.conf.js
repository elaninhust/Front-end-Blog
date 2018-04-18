'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  //context:webpack在寻找相对路径的文件时，会以context为根目录查找。默认值是package.json所在目录。
  context: path.resolve(__dirname, '../'),
  //entry:可以为string，可以为array，也可以配置为一个object。配置为object时会到处多个chunk文件，文件名称为object键值对中key的值。
  entry: {
    app: './src/main.js'
  },
  output: {
    //配置输出文件存放的本地路径，必须为以绝对路径的字符串
    path: config.build.assetsRoot,
    //配置输出文件名称，string，可以使用[id]、[name]、[hash:8]、[chunkhash:8]等变量
    filename: '[name].js',
    //配置发布到线上资源的 URL 前缀，为string 类型。
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'components': resolve("src/components")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,//匹配.vue文件
        loader: 'vue-loader', //用vue-loader的这个Loader来处理.vue文件
        options: vueLoaderConfig//一些vue-loader的配置
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
