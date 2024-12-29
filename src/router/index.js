import {
	createRouter,
	createWebHashHistory
} from 'vue-router'

import Index from "~/pages/index.vue"
import NotFound from "~/pages/404.vue"
import Login from "~/pages/login.vue"
import lang from "~/lang"
import Admin from "~/layouts/admin.vue"
import GoodList from "~/pages/goods/list.vue"
import CategoryList from "~/pages/category/list.vue"
import { categories } from '@vueuse/core/metadata.cjs'

const { t } = lang.global;
// const routes = [
// 	{
// 		path: '/',
// 		component: Admin,
// 		// 子路由
// 		children: [
// 			{
// 				path: '/',
// 				component: Index,
// 				meta: {
// 					title: () => t('index.page_title')
// 				}
// 			} , {
// 				path: '/goods/list',
// 				component: GoodList,
// 				meta: {
// 					title: () => t('index.page_title')
// 				}
// 			} , {
// 				path: '/category/list',
// 				component: CategoryList,
// 				meta: {
// 					title: () => t('index.page_title')
// 				}
// 			}
// 		]
// 	}, {

// 		path: '/login',
// 		component: Login,
// 		meta: {
// 			title: () => t('login.page_title')
// 		}
// 	}, {

// 		path: '/:pathMatch(.*)*', 
// 		name: 'NotFound', 
// 		component: NotFound,
// 		meta: {
// 			title: () => t('NotFound.page_title')
// 		}
// 	}
// ]

const routes = [
	{
		path: '/',
		name: 'admin',
		component: Admin,
	}, {

		path: '/login',
		component: Login,
		meta: {
			title: () => t('login.page_title')
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

// 动态路由
const asyncRoutes = [
	{
		path: '/',
		name: '/',
		component: Index,
		meta: {
			title: () => t('index.page_title')
		}
	} , {
		path: '/goods/list',
		name: '/goods/list',
		component: GoodList,
		meta: {
			title: () => t('index.page_title')
		}
	} , {
		path: '/category/list',
		name: '/category/list',
		component: CategoryList,
		meta: {
			title: () => t('index.page_title')
		}
	}
]

export const router = createRouter({

	history: createWebHashHistory(),
	routes
})

// 动态添加路由
export function addRoutes(menus) {
	// 查看是否有新增的路由
	let hasNewRoute = false
	const find_add_routes_by_menus = (arr) => {

		arr.forEach(e => {
			let item = asyncRoutes.find(o=>o.path == e.frontpath)
			if(item && !router.hasRoute(item.name)){
				router.addRoute('admin', item)
				hasNewRoute = true
			}
			if(e.child && e.child.length > 0){
				find_add_routes_by_menus(e.child)
			}
		})
	}
	find_add_routes_by_menus(menus)
	
	return hasNewRoute
	console.log('routers: ',router.getRoutes())
}