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
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: themeColor,
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  devServer: {
    proxy: {
      "/shop-admin": {
        target: 'http://localhost:3001',
        changeOrigin: true,
        pathRewrite: {
          "^/shop-admin": "/shop-admin"
        }
      },
    }
  }
}
