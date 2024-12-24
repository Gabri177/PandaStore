<template>
	<div class="f-header">
		<span class="logo">
			<el-icon :size="30" class="mr-3">
				<Shop />
			</el-icon>
			公司名称
		</span>
		<el-icon :size="25" class="icon-btn mr-3">
			<Fold />
		</el-icon>
		<el-icon :size="25" class="icon-btn" @click="handleRefresh">
			<Refresh />
		</el-icon>
		<div class="ml-auto flex items-center">
			<el-icon :size="25" class="icon-btn mx-3" @click="toggle">
				<FullScreen v-if="!isFullscreen" />
				<Aim v-else />
			</el-icon>
			<el-dropdown class="dropdown" @command="handleCommand">
				<span class="el-dropdown-link text-light-50 flex items-center text-xl">
					<el-avatar :size="25" :src="$store.state.user.avatar" class="mr-2" />
					{{ $store.state.user.username }}
					<el-icon class="el-icon--right"><arrow-down /></el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command="dp_reset_password">{{ $t('header.change_password')
							}}</el-dropdown-item>
						<el-dropdown-item command="dp_logout">{{ $t('header.logout') }}</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>

	<el-drawer 
	v-model="showDrawer" 
	:title="drawerTitle" 
	:with-header="false" 
	:close-on-click-modal="false" 
	size="45%"
	>
		<div class="flex flex-col items-center mt-2/5">
			<span 
			class="text-xl font-bold text-center block"
			>
				{{ $t('drawer.change_password.title') }}
			</span>
			<el-form 
			:model="form" 
			:rules="rules" 
			ref="formRef" 
			class="mt-10 w-full"
			>
				<el-form-item prop="old_password">
					<el-input
					v-model="form.old_password"
					type="password"
					show-password
					:placeholder="$t('drawer.change_password.old_password_placeholder')"></el-input>
				</el-form-item>

				<el-form-item prop="new_password">
					<el-input
					v-model="form.new_password"
					type="password"
					show-password
					:placeholder="$t('drawer.change_password.new_password_placeholder')"></el-input>
				</el-form-item>

				<el-form-item prop="confirm_password">
					<el-input 
					v-model="form.confirm_password" 
					type="password"
					:placeholder="$t('drawer.change_password.confirm_password_placeholder')" 
					show-password></el-input>
				</el-form-item>

				<div class="flex items-center justify-center mt-10">

					<el-form-item>
						<el-button class=" w-[100px] text-light-200 bg-blue-500" type="primary" @click="onCancle" round
							:loading="loading">{{ $t('drawer.change_password.button_cancle') }}</el-button>
					</el-form-item>

					<el-form-item>
						<el-button class=" w-[100px] text-light-200 ml-5" type="primary" @click="onConfirm" round
							color="rgb(42,77,208)" :loading="loading">{{ $t('drawer.change_password.button_confirm') }}</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
	</el-drawer>
</template>

<script setup>

import { popOut, toast } from "~/composables/util"
import { logout } from "~/api/manager"
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import lang from "~/lang";
import { useFullscreen } from "@vueuse/core";
import { ref, computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n';


////////////////////////form////////////////////////
const loading = ref(false)

const { t } = useI18n()

const form = reactive({

	old_password: '',
	new_password: '',
	confirm_password: ''
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

const onConfirm = async () => {

	try {
		const valid = await formRef.value.validate();
		if (valid) {

			console.log('submit')
			console.log('context of the form: ', form)
			console.log(formRef.value)
		}
		// loading.value = true


	} catch (error) {
		console.log(error)
	}
}

const onCancle = () => {
	showDrawer.value = false
}
////////////////////////form////////////////////////


const showDrawer = ref(false)
const { isFullscreen, toggle } = useFullscreen()

const router = useRouter()
const store = useStore()

const drawerTitle = computed(() => t('drawer.change_password.title'))

const handleRefresh = () => {
	location.reload()
}

function handleCommand(command) {
	switch (command) {
		case "dp_reset_password":
			showDrawer.value = true
			break;
		case "dp_logout":
			handleLogout()
			break;
	}
}

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
</script>

<style scoped>
.f-header {

	@apply flex bg-blue-700 text-light-50 fixed top-0 left-0 right-0 items-center;
	height: 64px;
}

.logo {
	width: 250px;
	@apply flex justify-center items-center text-xl;
}


.icon-btn {
	@apply flex justify-center items-center cursor-pointer;
	width: 42px;
	height: 64px;
}

.icon-btn:hover {
	@apply bg-blue-500;
}

.icon-btn:active {
	@apply bg-blue-800;
}

.dropdown {
	height: 64px;
	@apply mr-3;
}
</style>