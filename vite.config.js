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
            target: ' https://www.leecode.fun/',  // 这里后面应该填写自己服务器后端的地址
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          }
    }
  },
  base: '/PandaStore/'
})
