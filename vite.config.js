import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

import path from 'path'

// https://vite.dev/config/
export default defineConfig({

  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.esm-bundler.js',
    },
  },
  plugins: [
    vue(),
    WindiCSS(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://www.leecode.fun/', // 目标服务器地址
        changeOrigin: true, // 修改请求头的来源
        rewrite: (path) => {
          console.log('代理重写路径:', path); // 打印被代理的路径
          console.log('代理重写路径:', path.replace(/^\/api/, '')); // 打印被代理的路径
          return path.replace(/^\/api/, '');
        },
      },
    },
  },
   base: '/PandaStore/'
})
