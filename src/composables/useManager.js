import { changePassword } from "~/api/manager";
import { ref, reactive, onMounted, onBeforeUnmount, computed, watch, isRef} from 'vue'
import { popOut, toast } from "~/composables/util"
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router'
import { useCookies } from "@vueuse/integrations/useCookies.mjs"
import { useStore } from "vuex";
import { useI18n } from 'vue-i18n';
import { logout } from "~/api/manager";
import lang from "~/lang"


export function useLogin() {

	const store = useStore()
	const router = useRouter()
	const loading = ref(false)

	const { t } = useI18n()

	const form = reactive({

		username: '',
		password: ''
	})


	const rules = reactive({
		username: [
			{
				required: true,
				message: () => t('login.usernameError_empty'),
				trigger: 'blur',
			}
		],
		password: [
			{
				required: true,
				message: () => t('login.passwordError_empty'),
				trigger: 'blur',
			},
			{
				min: 4,
				max: 13,
				message: () => t('login.passwordError_length'),
				trigger: 'blur',
			},
		],
	});

	const formRef = ref(null)

	const onSubmit = async () => {

		try {
			const valid = await formRef.value.validate();
			if (valid) {

				// console.log('submit')
				console.log('useManager.js Login提交表单: ', form)
				// console.log(formRef.value)
			}
			loading.value = true
			store.dispatch('login', form).then((res) => {

				console.log("useManager.js Login成功 token:", res.token)
				router.push('/')
			})
			.catch((error) => {
				console.log("useManager.js Login失败 error:", error)
			})
			.finally(() => {
				loading.value = false
			})
			

		} catch (error) {
			// console.log(error)
		}
	}

	//实现Enter键登录

	const onEnter = (e) => {
		if (e.key === 'Enter') {
			onSubmit()
		}
	}

	onMounted(() => {
		document.addEventListener('keyup', onEnter)
	})

	onBeforeUnmount(() => {
		document.removeEventListener('keyup', onEnter)
	})

	return {
		form,
		rules,
		formRef,
		onSubmit,
		loading
	}

}

export function useRepassword() {

	const router = useRouter()
	const store = useStore()
	const { t } = useI18n()
	////////////////////////form////////////////////////
	const formDrawer = ref(null)

	const form = reactive({

		oldPassword: '',
		newPassword: '',
		confirmPassword: ''
	})


	const rules = reactive({
		oldPassword: [
			{
				required: true,
				message: () => t('drawer.change_password.old_passwordError_empty'),
				trigger: 'blur',
			}
		],
		newPassword: [
			{
				required: true,
				message: () => t('drawer.change_password.new_passwordError_empty'),
				trigger: 'blur',
			}
		],
		confirmPassword: [
			{
				required: true,
				message: () => t('drawer.change_password.confirm_passwordError_empty'),
				trigger: 'blur',
			}
		],
	});

	const formRef = ref(null)

	const onConfirm = async () => {

		try {
			const valid = await formRef.value.validate();
			if (valid) {

				// console.log('submit')
				console.log('useManager.js 重设密码表单提交: ', form)
				// console.log(formRef.value)
			}
			formDrawer.value.showLoading()
			changePassword(form)
				.then(res => {
					toast(t("toast.change_password.success_title"), t("toast.change_password.success_message"))
					store.dispatch('logout')
					router.push({ path: "/login" })
				})
				.catch(error => {
					toast(t("toast.change_password.error_title"), t("toast.change_password.error_message"), "error")
				})
				.finally(() => {
					formDrawer.value.hideLoading()
				})


		} catch (error) {
			// console.log(error)
		}
	}

	const openRepassword = () => {
		formDrawer.value.open()
	}
	////////////////////////form////////////////////////
	return {
		formDrawer,
		form,
		rules,
		formRef,
		onConfirm,
		openRepassword
	}

}

export function useLogout() {

	const router = useRouter()
	const store = useStore()
	const { t } = useI18n()
	function handleLogout() {

		popOut(t('popout.logout.title'), t("popout.logout.message"), t("popout.logout.confirm"), t("popout.logout.cancel"))
			.then(async () => {
				await logout()
					.finally(() => {

						store.dispatch("logout")
						toast(t("toast.logout.title"), t("toast.logout.message"))
						router.push({ path: "/login" })
					})
			})
	}

	return {
		handleLogout
	}
}

export function useTablist() {

	const route = useRoute()
	const router = useRouter()
	const cookie = useCookies()
	const language = lang.global
	const { t } = lang.global;


	const activeTab = ref(route.path)
	const tabList = ref([
	{
		title: computed(() => t('sideMenu.index.page_title')) ,
		path: '/',
		title_key: 'sideMenu.index.page_title'
		
	}
	])


	//添加标签导航
	function addTab(tab) {

		activeTab.value = tab.path
		let noTab = tabList.value.findIndex(item => item.path == tab.path) == -1
		if (noTab) {
			tabList.value.push(tab)
		}
		cookie.set('tabList', tabList.value)
	}

	//初始化标签导航
	function initTab() {
		let tabListCookie = cookie.get('tabList')
		if (tabListCookie) {
			tabList.value = tabListCookie
			// console.log('cookie tabList: ', tabList.value)
		}
	}

	initTab()

	const handleCommand = (command) => {
		switch (command) {
			case 'clearOther':
				tabList.value = tabList.value.filter(tab => tab.path == '/' || tab.path == activeTab.value)
				cookie.set('tabList', tabList.value)
				break
			case 'clearAll':
				tabList.value = tabList.value.filter(tab => tab.path == '/')
				cookie.set('tabList', tabList.value)
				router.push('/')
				break
		}
	}

	onBeforeRouteUpdate((to, from) => {
		
		const p = String(to.meta.title)
		// console.log('title: ', p)
		// 在dev环境中 是设置的单引号因此使用这个规则
		let match = p.match(/'([^']+)'/)
		if (!match)
			// 在prod环境中 由于打包的时候会被转义成双引号因此使用这个规则
			// 否则match为null
			match = p.match(/"([^"]+)"/);
		// console.log('match: ', match)	
		if (match) {
			// console.log('title path : ' , match[1]);
			addTab({
			title_key: match[1],
			title: computed(() => to.meta.title()),
			path: to.path
			})
		}
			
		
	})

	const removeTab = (targetPath) => {
		let tabs = tabList.value
		let t = activeTab.value
		if (t == targetPath) {
			tabs.forEach((tab, index) => {
				if (tab.path == targetPath) {
					let nextTab = tabs[index + 1] || tabs[index - 1]
					if (nextTab) {
						t = nextTab.path
					}
				}
			})
		}
		handleTabChange(t)
		tabList.value = tabList.value.filter(tab => tab.path !== targetPath)
		cookie.set('tabList', tabList.value)
	}

	const handleTabChange = (tab) => {
		activeTab.value = tab
		router.push(tab)
		// console.log('tab change: ', tab)
	}

	watch(() => language.locale.value, () => {

		// console.log('locale change: ')
		// console.log('tabList: ', tabList.value)
		tabList.value.forEach(tab => {
			tab.title = computed(() => t(tab.title_key))
		})
		cookie.set('tabList', tabList.value)
	})

	return {
		activeTab,
		tabList,
		handleCommand,
		removeTab,
		handleTabChange
	}
}