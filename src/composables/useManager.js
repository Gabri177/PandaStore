import { changePassword } from "~/api/manager";
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { popOut, toast } from "~/composables/util"
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useI18n } from 'vue-i18n';
import { logout } from "~/api/manager";


export function useLogin() {

	const store = useStore()
	const router = useRouter()

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

				console.log('submit')
				console.log('context of the form: ', form)
				console.log(formRef.value)
			}
			store.dispatch('login', form).then((res) => {

				console.log("login success: ", res.token)
				router.push('/')
			})
			.catch((error) => {
				console.log("login failed: ", error)
			})
			

		} catch (error) {
			console.log(error)
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
		onSubmit
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

				console.log('submit')
				console.log('context of the form: ', form)
				console.log(formRef.value)
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
			console.log(error)
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