/*
 * @Date: 2022-05-01 14:16:00
 * @LastEditors: 熊明祥
 * @LastEditTime: 2022-05-04 16:48:32
 * @Description: 
 */
const CracoLessPlugin = require("craco-less");
const path = require('path')
const themeColor = require(path.resolve(__dirname, 'src/theme-color'))

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    configure: (webpackConfig) => {
      // webpackConfig webpack的默认配置文件

      // style-resources-loader配置全局less
      webpackConfig.module.rules.push({
        test: /\.less$/,
        use: [{
          loader: 'style-resources-loader',
          options: {
            patterns: path.resolve(__dirname, './src/assets/styles/global.less'),
            injector: 'append'
          }
        }]
      })
      return webpackConfig
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: themeColor,
            javascriptEnabled: true,
          }
        }
      }
    }
  ],
  devServer: {
    proxy: {
      "/": {
        target: 'http://192.168.1.7:8081',
        changeOrigin: true,
        pathRewrite: {
          "^/": "/"
        }
      },
    }
  }
}
