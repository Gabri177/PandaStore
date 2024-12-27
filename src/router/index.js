import {
	createRouter,
	createWebHashHistory
} from 'vue-router'

import Index from "~/pages/index.vue"
import NotFound from "~/pages/404.vue"
import Login from "~/pages/login.vue"
import lang from "~/lang"
import Admin from "~/layouts/admin.vue"
import Register from "~/pages/register.vue"

const { t } = lang.global;
const routes = [
	{
		path: '/',
		component: Admin,
		// 子路由
		children: [{

			path: '/',
			component: Index,
			meta: {
				title: () => t('index.page_title')
			}
		}]
	}, {

		path: '/login',
		component: Login,
		meta: {
			title: () => t('login.page_title')
		}
	}, {
		path: '/register', 
		component: Register,
		meta: {
			title: () => t('register.page_title')
		}
	}, {

		path: '/:pathMatch(.*)*', 
		name: 'NotFound', 
		component: NotFound,
		meta: {
			title: () => t('NotFound.page_title')
		}
	}
]

const router = createRouter({

	history: createWebHashHistory(),
	routes
})

export default router