<template>
	<div class="f-header">
		<span class="logo">
			<el-icon :size="30" class="mr-3">
				<Shop />
			</el-icon>
			公司名称
		</span>
		<el-icon :size="25" class="icon-btn mr-3" @click="$store.commit('handleAsideWidth')">
			<Fold v-if="$store.state.asideWidth=='250px'"/>
			<Expand v-else/>
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
	<FormDrawer 
	ref="formDrawer" 
	:formTitle="t('drawer.change_password.title')"
	:withHeader="true"
	:confirmText="t('button.confirm')"
	:cancelText="t('button.cancel')"
	destroyOnClose="true"
	@submit="onConfirm"
	>
		<el-form 
			:model="form" 
			:rules="rules" 
			ref="formRef" 
			label-width="80px"
			>
			<el-form-item 
			prop="oldPassword"
			:label="$t('drawer.change_password.old_password_label')"
			label-position="top"
			>
				<el-input
				v-model="form.oldPassword"
				type="password"
				show-password
				:placeholder="$t('drawer.change_password.old_password_placeholder')"></el-input>
			</el-form-item>

			<el-form-item 
			prop="newPassword"
			:label="$t('drawer.change_password.new_password_label')"	
			label-position="top"
			>
				<el-input
				v-model="form.newPassword"
				type="password"
				show-password
				:placeholder="$t('drawer.change_password.new_password_placeholder')"></el-input>
			</el-form-item>

			<el-form-item 
			prop="confirmPassword"
			:label="$t('drawer.change_password.confirm_password_label')"
			label-position="top"
			>
				<el-input 
				v-model="form.confirmPassword" 
				type="password"
				:placeholder="$t('drawer.change_password.confirm_password_placeholder')" 
				show-password></el-input>
			</el-form-item>

		</el-form>
	</FormDrawer>

	<!-- <el-drawer 
	v-model="showDrawer" 
	:title="drawerTitle" 
	:with-header="false" 
	:close-on-click-modal="false" 
	size="50%"
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
			label-width="80px"
			>
				<el-form-item 
				prop="oldPassword"
				:label="$t('drawer.change_password.old_password_label')"
				label-position="top"
				>
					<el-input
					v-model="form.oldPassword"
					type="password"
					show-password
					:placeholder="$t('drawer.change_password.old_password_placeholder')"></el-input>
				</el-form-item>

				<el-form-item 
				prop="newPassword"
				:label="$t('drawer.change_password.new_password_label')"	
				label-position="top"
				>
					<el-input
					v-model="form.newPassword"
					type="password"
					show-password
					:placeholder="$t('drawer.change_password.new_password_placeholder')"></el-input>
				</el-form-item>

				<el-form-item 
				prop="confirmPassword"
				:label="$t('drawer.change_password.confirm_password_label')"
				label-position="top"
				>
					<el-input 
					v-model="form.confirmPassword" 
					type="password"
					:placeholder="$t('drawer.change_password.confirm_password_placeholder')" 
					show-password></el-input>
				</el-form-item>

				<div class="flex items-center justify-center mt-10">

					<el-form-item>
						<el-button 
						class=" w-[100px] text-light-200 bg-blue-500" 
						type="primary" 
						@click="onCancle" 
						round
						:loading="loading"
						>
							{{ $t('drawer.change_password.button_cancle') }}
						</el-button>
					</el-form-item>

					<el-form-item>
						<el-button 
						class=" w-[100px] text-light-200 ml-5" 
						type="primary" 
						@click="onConfirm" 
						round
						color="rgb(42,77,208)" 
						:loading="loading"
						>
							{{ $t('drawer.change_password.button_confirm') }}
						</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
	</el-drawer> -->
</template>

<script setup>

import { useFullscreen } from "@vueuse/core";
import { useI18n } from 'vue-i18n';
import FormDrawer from "~/components/FormDrawer.vue";
import { useRepassword, useLogout } from "~/composables/useManager";


const { isFullscreen, toggle } = useFullscreen()
const {
		formDrawer,
		form,
		rules,
		formRef,
		onConfirm,
		openRepassword
	} = useRepassword()
const { handleLogout } = useLogout()


const { t } = useI18n()


const handleRefresh = () => {
	location.reload()
}

function handleCommand(command) {
	switch (command) {
		case "dp_reset_password":
			// showDrawer.value = true
			openRepassword()
			break;
		case "dp_logout":
			handleLogout()
			break;
	}
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