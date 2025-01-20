import { router, addRoutes } from "~/router"
import { getToken, setToken, isTokenExpired, removeToken } from "~/composables/auth"
import { toast, showFullScreenLoading, hideFullScreenLoading } from "~/composables/util"
import { lang } from "~/lang"
import store from "~/store"

import { defaultAsideMenu } from "./default/constant"



const { t } = lang.global;


let hasGetInfo = false
//前置首位
router.beforeEach(async (to, from, next) => {
	
	showFullScreenLoading()
	const token = getToken()
	console.log('permission.js token: ', token)

	//如果没有token并且不是登录页面
	if (!token && to.path != '/login') {

		toast(t('router_toast.not_login_title'), t('router_toast.not_login_msg'), 'error')
		return next({path: '/login'})
	} 
	
	//防止重复登录
	if (token && to.path == '/login') {
		toast(t('router_toast.already_login_title'), t('router_toast.already_login_msg'), 'error')
		return next({path: from.path ? from.path : '/'})
	}

	let hasNewRoute = false
	if (token && !hasGetInfo) {
		hasGetInfo = true
		//获取用户信息
		let { menus } = await store.dispatch('getinfo')

		////////////////////////////////////
		// 动态添加路由
		hasNewRoute = addRoutes(defaultAsideMenu)
		////////////////////////////////////
	}

	if (token && isTokenExpired()) {
		toast('警告', '登录已过期, 请重新登陆!', 'warning')
		removeToken()
		router.push('/')
	}

	// 设置页面标题
	let title = 'PandaStore'
	if (typeof to.meta.title === 'function') {
		title = to.meta.title()
	}
	document.title = title

	hasNewRoute ? next(to.fullPath) : next()
})

router.afterEach((to, from) => {
	hideFullScreenLoading()
})
