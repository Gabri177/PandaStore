<template>
	<el-drawer 
	v-model="showDrawer" 
	:title="formTitle" 
	:with-header="withHeader" 
	:close-on-click-modal="false" 
	:size="formSize"
	:destroy-on-close="destroyOnClose"
	>
		<div class="formDrawer">
			<div class="body">
				<slot></slot>
			</div>
			<div class="action">
				<el-button 
				type="primary"
				@click="submit"
				:loading="loading"
				>
					{{ confirmText }}
				</el-button>
				<el-button 
				type="default"
				@click="close"
				>
					{{ cancelText }}
				</el-button>
			</div>
		</div>
	</el-drawer>
</template>

<script setup>

	import { set } from '@vueuse/core';
	import { ref, computed } from 'vue'
	import { lang } from '~/lang'

	const showDrawer = ref(false)
	const open = () => showDrawer.value = true
	const close = () => showDrawer.value = false

	//loading状态
	const loading = ref(false)
	const showLoading = () => loading.value = true
	const hideLoading = () => loading.value = false


	//向父组件暴露方法
	const emit = defineEmits(['submit'])

	// 提交表单
	const submit = () => emit('submit')

	//定义props
	const props = defineProps({
		formTitle: {
			type: String,
			default: 'default title'
		},
		withHeader: {
			type: Boolean,
			default: true
		},
		formSize: {
			type: String,
			default: '50%'
		},
		destroyOnClose: {
			type: Boolean,
			default: false
		},
		confirmText: {
			type: String,
			default: () => lang.global.t('button.confirm')
		},
		cancelText: {
			type: String,
			default: () => lang.global.t('button.cancel')
		}
	})
	
	




	//向父组件暴露方法
	defineExpose({
		open,
		close,
		showLoading,
		hideLoading
	})
</script>

<style>
	.formDrawer {
		width: 100%;
		height: 100%;
		@apply flex flex-col;
		position: relative;
	}

	.formDrawer .body {
		flex:1;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 50px;
		overflow-y: auto;
	}

	.formDrawer .action {
		height: 50px;
		@apply mt-auto flex items-center;
	}
</style>