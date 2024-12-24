<template>
	<div class="f-header">
		<span class="logo">
			<el-icon :size="30" class="mr-3"><Shop /></el-icon>
			公司名称
		</span>
		<el-icon :size="25" class="icon-btn mr-3"><Fold /></el-icon>
		<el-icon :size="25" class="icon-btn" @click="handleRefresh"><Refresh /></el-icon>
		<div class="ml-auto flex items-center">
			<el-icon :size="25" class="icon-btn mx-3" @click="toggle">
				<FullScreen v-if="!isFullscreen"/>
				<Aim v-else/>
			</el-icon>
			<el-dropdown class="dropdown" @command="handleCommand">
				<span class="el-dropdown-link text-light-50 flex items-center text-xl">
					<el-avatar
						:size="25"
						:src="$store.state.user.avatar"
						class="mr-2"
					/>
					{{ $store.state.user.username }}
					<el-icon class="el-icon--right"><arrow-down /></el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command="dp_reset_password">{{ $t('header.change_password') }}</el-dropdown-item>
						<el-dropdown-item command="dp_logout">{{ $t('header.logout') }}</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>

	<el-drawer
		v-model="drawer"
		title="I am the title"
		:direction="rtl"
		:before-close="handleClose"
		>
		<span>Hi, there!</span>
  	</el-drawer>
</template>

<script setup>

import { popOut, toast } from "~/composables/util"
import { logout } from "~/api/manager"
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import lang from "~/lang";
import { useFullscreen } from "@vueuse/core";
import { ref } from 'vue'


const drawer = ref(false)
const { isFullscreen, toggle } = useFullscreen()

const { t } = lang.global
const router = useRouter()
const store = useStore()

function handleRefresh() {
	location.reload()
}

function handleCommand(command) {
	switch (command) {
		case "dp_reset_password":
			
			break;
		case "dp_logout":
			handleLogout()
			break;
	}
}

function handleLogout() {
	
	popOut(t('popout.logout.title'), t("popout.logout.message"), t("popout.logout.confirm"), t("popout.logout.cancel"))
	.then (async () => {
		await logout ()
		.finally(() => {

			store.dispatch("logout")
			toast(t("toast.logout.title"), t("toast.logout.message"))
			router.push({path: "/login"})
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