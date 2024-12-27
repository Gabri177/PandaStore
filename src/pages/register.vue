<template>
	<el-row class="login-container">
		<el-col :lg="8" :md="14" class="left">
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
					<router-link 
					to="/register"
					class="text-blue-500"
					>
						{{ $t('login.register') }}
					</router-link>
				</div>

				<el-form-item>
					<el-button class="w-[250px] text-light-200" type="primary" @click="onSubmit" round color="rgb(42,77,208)" :loading="loading">{{ $t('login.button_text') }}</el-button>
				</el-form-item>

				<div 
				class="bg-red-500 w-full"
				style="height: 3000px;"
				>
					123
				</div>
			</el-form>

			

		</el-col>
		<el-col :lg="16" :md="10" class="right">
			<div>
				<div>{{ $t('login.left_title') }}</div>
				<div>{{ $t('login.left_title_msg') }}</div>
			</div>
		</el-col>
		
	</el-row>
</template>


<script setup>
import { reactive, onMounted, ref, onBeforeUnmount} from 'vue'
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore()
const router = useRouter()
const loading = ref(false)

const { t } = useI18n()

const form = reactive({

	username: '',
	password: ''
})


const	rules = reactive({
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

			console.log ('submit')
			console.log ('context of the form: ', form)
			console.log (formRef.value)
		}
		loading.value = true
		store.dispatch('login', form).then((res) => {

			console.log("login success: " ,res.token)
			router.push('/') 	
		})
		.catch((error) => {
			console.log("login failed: ", error)
		})
		.finally(() => {
			loading.value = false
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


</script>

<style scoped>

.login-container {
	@apply bg-blue-700 min-h-screen;
}

.login-container .right, .login-container .left {
	@apply flex justify-center items-center;
}

.login-container .left {

	@apply bg-light-50 flex-col overflow-auto;
}

.login-container .right > div > div:first-child {
	@apply font-bold text-5xl text-light-50 mb-4;
}

.login-container .right > div > div:last-child {
	@apply text-xl text-gray-200;
}

.login-container .left .title {
	@apply font-bold text-4xl text-gray-800;
}

.login-container .left > div {
	@apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.login-container .left .line {
	@apply h-[1px] w-16 bg-gray-200;
}
</style>