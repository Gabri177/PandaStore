import router from "~/router"
import { getToken } from "~/composables/auth"
import { toast, showFullScreenLoading, hideFullScreenLoading } from "~/composables/util"
import { lang } from "~/lang"
import store from "~/store"




const { t } = lang.global;


//前置首位
router.beforeEach(async (to, from, next) => {
	
	showFullScreenLoading()
	const token = getToken()
	console.log('token: ', token)

	//如果没有token并且不是登录页面
	if (!token && to.path != '/login' && to.path != '/register') {

		toast(t('router_toast.not_login_title'), t('router_toast.not_login_msg'), 'error')
		return next({path: '/login'})
	} 
	
	//防止重复登录
	if (token && to.path == '/login') {
		toast(t('router_toast.already_login_title'), t('router_toast.already_login_msg'), 'error')
		return next({path: from.path ? from.path : '/'})
	}

	if (token) {
		//获取用户信息
		await store.dispatch('getinfo')
	}

	// 设置页面标题
	let title = to.meta.title() ? to.meta.title() : 'PandaStore'
	document.title = title
	next()
})

router.afterEach((to, from) => {
	hideFullScreenLoading()
})
