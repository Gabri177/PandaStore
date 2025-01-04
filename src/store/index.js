import { createStore } from 'vuex'
import { login, getInfo } from '~/api/manager'
import { setToken, removeToken } from '~/composables/auth.js'
import { lang } from '~/lang'
import { toast } from '~/composables/util'
import { logout } from '../api/manager'



const t = lang.global.t
const store = createStore({
	state () {
	  return {
		// 用户信息
		user: {},
		// 侧边宽度
		asideWidth: "250px",
		menus:[],
		ruleNames:[]
	  }
	},
	mutations: {
	  
		// 设置用户信息
		SET_USER_INFO (state, user) {
		  state.user = user
		//   console.log('SET_USER_INFO called: ', user)
		},
		// 展开或者收缩侧边栏
		handleAsideWidth(state) {
			state.asideWidth = state.asideWidth == "250px" ? "64px" : "250px"
		},
		SET_MENUS(state, menus) {
			state.menus = menus
		},
		SET_RULE_NAMES(state, ruleNames) {
			state.ruleNames = ruleNames
		}
	},
	actions: {
		//获取用户登录信息
		getinfo({commit}) {
			return new Promise((resolve, reject) => {
				getInfo().then(res => {
					commit('SET_USER_INFO', res)

					//////////////////////////////////////////
					//获取用户信息成功后，获取用户的菜单 权限
					commit('SET_MENUS', res.menus)
					commit('SET_RULE_NAMES', res.ruleNames)
					//////////////////////////////////////////


					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		//用户登录
		login({commit}, {username, password}) {	
			return new Promise((resolve, reject) => {
				login({username, password}).then(res => {
					// console.log('login success: ', res)
					commit('SET_USER_INFO', res)
					toast(t('login.loginAlert_title_success'), t('login.loginStatus_success'), 'success')
					setToken(res.token)
					resolve(res)
				}).catch(error => {
					toast(t('login.loginAlert_title_failed'), t('login.loginStatus_failed'), 'error')
					reject(error)
				})
			})
		},

		//用户登出
		logout({commit}) {
			
			removeToken()
			commit('SET_USER_INFO', {})
		}
	}
  })


export default store