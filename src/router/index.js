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
import SkusList from "~/pages/skus/list.vue"
import CouponList from "~/pages/coupon/list.vue"
import UserList from "~/pages/user/list.vue"
import LevelList from "~/pages/level/list.vue"
import OrderList from "~/pages/order/list.vue"
import CommentList from "~/pages/comment/list.vue"
import AccessList from "~/pages/access/list.vue"
import ManagerList from "~/pages/manager/list.vue"
import RoleList from "~/pages/role/list.vue"
import SettingBase from "~/pages/setting/base.vue"
import SettingBuy from "~/pages/setting/buy.vue"
import SettingShip from "~/pages/setting/ship.vue"
import DistributionIndex from "~/pages/distribution/index.vue"
import DistributionSetting from "~/pages/distribution/setting.vue"
import ImageList from "~/pages/image/list.vue"
import NoticeList from "~/pages/notice/list.vue"



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
			title: () => t('sideMenu.index.page_title')
		}
	},
	{
		path: '/goods/list',
		name: '/goods/list',
		component: GoodList,
		meta: {
			title: () => t('sideMenu.goods.list.page_title')
		}
	},
	{
		path: '/skus/list',
		name: '/skus/list',
		component: SkusList,
		meta: {
			title: () => t('sideMenu.skus.list.page_title')
		}
	},
	{
		path: '/coupon/list',
		name: '/coupon/list',
		component: CouponList,
		meta: {
			title: () => t('sideMenu.coupon.list.page_title')
		}
	},
	{
		path: '/category/list',
		name: '/category/list',
		component: CategoryList,
		meta: {
			title: () => t('sideMenu.category.list.page_title')
		}
	},
	{
		path: '/user/list',
		name: '/user/list',
		component: UserList,
		meta: {
			title: () => t('sideMenu.user.list.page_title')
		}
	},
	{
		path: '/level/list',
		name: '/level/list',
		component: LevelList,
		meta: {
			title: () => t('sideMenu.level.list.page_title')
		}
	},
	{
		path: '/order/list',
		name: '/order/list',
		component: OrderList,
		meta: {
			title: () => t('sideMenu.order.list.page_title')
		}
	},
	{
		path: '/comment/list',
		name: '/comment/list',
		component: CommentList,
		meta: {
			title: () => t('sideMenu.comment.list.page_title')
		}
	},
	{
		path: '/access/list',
		name: '/access/list',
		component: AccessList,
		meta: {
			title: () => t('sideMenu.access.list.page_title')
		}
	},
	{
		path: '/manager/list',
		name: '/manager/list',
		component: ManagerList,
		meta: {
			title: () => t('sideMenu.manager.list.page_title')
		}
	},
	{
		path: '/role/list',
		name: '/role/list',
		component: RoleList,
		meta: {
			title: () => t('sideMenu.role.list.page_title')
		}
	},
	{
		path: '/setting/base',
		name: '/setting/base',
		component: SettingBase,
		meta: {
			title: () => t('sideMenu.setting.base.page_title')
		}
	},
	{
		path: '/setting/buy',
		name: '/setting/buy',
		component: SettingBuy,
		meta: {
			title: () => t('sideMenu.setting.buy.page_title')
		}
	},
	{
		path: '/setting/ship',
		name: '/setting/ship',
		component: SettingShip,
		meta: {
			title: () => t('sideMenu.setting.ship.page_title')
		}
	},
	{
		path: '/distribution/index',
		name: '/distribution/index',
		component: DistributionIndex,
		meta: {
			title: () => t('sideMenu.distribution.index.page_title')
		}
	},
	{
		path: '/distribution/setting',
		name: '/distribution/setting',
		component: DistributionSetting,
		meta: {
			title: () => t('sideMenu.distribution.setting.page_title')
		}
	},
	{
		path: '/image/list',
		name: '/image/list',
		component: ImageList,
		meta: {
			title: () => t('sideMenu.image.list.page_title')
		}
	},
	{
		path: '/notice/list',
		name: '/notice/list',
		component: NoticeList,
		meta: {
			title: () => t('sideMenu.notice.list.page_title')
		}
	}
];


export const router = createRouter({

	history: createWebHashHistory(),
	routes
})

////////////////////////////////////////////////////////////////////
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
	// console.log('routers: ',router.getRoutes())
}
////////////////////////////////////////////////////////////////////
