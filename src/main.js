import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { router } from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import lang from './lang'
import store from './store'

// if (process.env.NODE_ENV === 'development') {
// 	console.log('Starting MSW in the browser');
// 	import('./mocks/broswer')
// 	  .then(({ worker }) => {
// 		console.log('MSW started in the browser');
// 		worker.start();
// 	  })
// 	  .catch((err) => {
// 		console.error('Failed to start MSW:', err);
// 	  });
//   }
  


const app = createApp(App)

app.use(router)

app.use(ElementPlus)

app.use(lang)

app.use(store)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}

import 'virtual:windi.css'

import './permission.js'

import 'nprogress/nprogress.css'

import permission from './directives/permission.js'

app.use(permission)

app.mount('#app')
