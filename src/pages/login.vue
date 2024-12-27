<template>
	<el-row class="login-container">
		<el-col :lg="16" :md="10" class="left">
			<div>
				<div>{{ $t('login.left_title') }}</div>
				<div>{{ $t('login.left_title_msg') }}</div>
			</div>
		</el-col>
		<el-col :lg="8" :md="14" class="right">
			<h2 class="title">{{ $t('login.right_title') }}</h2>
			<div>
				<span class="line"></span>
				<span>{{ $t('login.right_title_msg') }}</span>
				<span class="line"></span>
			</div>


			<el-form 
				:model="form" 
				class="w-[250px]"
				:rules="rules"
				ref="formRef"
			>
				<el-form-item
					prop="username"	
				>
					<el-input v-model="form.username" :placeholder="$t('login.username_placeholder')">
						
						<template #prefix>
							<el-icon><User/></el-icon>
						</template>
					</el-input>
				</el-form-item>

				<el-form-item
					prop="password"
				>
					<el-input v-model="form.password" type="password" :placeholder="$t('login.password_placeholder')" show-password>
						<template #prefix>
							<el-icon><Lock /></el-icon>
						</template>
					</el-input>
				</el-form-item>

				<div class=" text-xs text-right mb-3">
					{{ $t('login.no_account') }}
					<span
					@click="handleRegister"
					class="text-blue-500 cursor-pointer"
					>
						{{ $t('login.register') }}
					</span>
				</div>

				<el-form-item>
					<el-button class="w-[250px] text-light-200" type="primary" @click="onSubmit" round color="rgb(42,77,208)" :loading="loading">{{ $t('login.button_text') }}</el-button>
				</el-form-item>
			</el-form>

		</el-col>
	</el-row>

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
			:model="reg_form" 
			:rules="reg_rules" 
			ref="formRef" 
			label-width="80px"
			>
			<el-form-item 
			prop="oldPassword"
			:label="$t('drawer.change_password.old_password_label')"
			label-position="top"
			>
				<el-input
				v-model="form.value1"
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
				v-model="form.value2"
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
				v-model="form.value3" 
				type="password"
				:placeholder="$t('drawer.change_password.confirm_password_placeholder')" 
				show-password></el-input>
			</el-form-item>

		</el-form>
	</FormDrawer>
	
</template>


<script setup>

import FormDrawer from '~/components/FormDrawer.vue';
import { useLogin } from '~/composables/useManager.js'
import { lang } from '~/lang'

const t = lang.global.t

const {
		form,
		rules,
		formRef,
		onSubmit,
		loading
	} = useLogin();


import { ref, reactive } from 'vue'

const formDrawer = ref(null)

const onConfirm = () => {
	
	// logic of confirm 
}

const handleRegister = () => formDrawer.value.open()

const reg_form = reactive({
	value1: '',
	value2: '',
	value3: ''
})

const reg_rules = reactive({
	value1: [{ 
			required: true, 
			message: '请输入活动名称', 
			trigger: 'blur' 
	}],
	value2: [{ 
		required: true, 
		message: '请选择活动区域', 
		trigger: 'change' 
	}],
	value3: [{ 
		required: true, 
		message: '请填写活动形式', 
		trigger: 'blur' 
	}]
})


</script>

<style scoped>

.login-container {
	@apply bg-blue-700 min-h-screen;
}

.login-container .left, .login-container .right {
	@apply flex justify-center items-center;
}

.login-container .right {
	@apply bg-light-50 flex-col;
}

.login-container .left > div > div:first-child {
	@apply font-bold text-5xl text-light-50 mb-4;
}

.login-container .left > div > div:last-child {
	@apply text-xl text-gray-200;
}

.login-container .right .title {
	@apply font-bold text-4xl text-gray-800;
}

.login-container .right > div {
	@apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.login-container .right .line {
	@apply h-[1px] w-16 bg-gray-200;
}
</style>