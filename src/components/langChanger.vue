<template>

	<div>
		<el-icon @click="openDropdown" :size="20" class="windi-button">
			<Switch />
		</el-icon>
	</div>

	<div class="select">
		<el-select v-model="currentLocale" placeholder="Select Language" style="width: 100px" ref="selectRef"
			:teleported="false"
			@change="changeLanguage">
			<el-option v-for="item in languages" :key="item.value" :label="item.label" :value="item.value">
				<span style="float: left">{{ item.label }}</span>
				<span style="float: right; color: var(--el-text-color-secondary); font-size: 13px;">
					{{ item.value }}
				</span>
			</el-option>
		</el-select>
	</div>
</template>

<script>

import { Switch } from '@element-plus/icons-vue';

export default {
	data() {
		return {
			currentLocale: this.$i18n.locale,
			languages: [
				{ value: 'es', label: 'Español' },
				{ value: 'en', label: 'English' },
				{ value: 'zh', label: '简体中文' },
			],
		};
	},
	methods: {
		changeLanguage(lang) {
			this.$i18n.locale = lang;
			localStorage.setItem('panda_language', lang);
		},
		openDropdown() {
			// 通过 ref 获取 el-select 实例并调用 toggleMenu 方法
			this.$refs.selectRef.toggleMenu();
		}
	},
	components: {
		Switch, // 注册图标组件
	}
};
</script>

<style scoped>
el-button {
	position: fixed;
	left: 0px;
	top: 0px;
	z-index: 1000;
	overflow: visible;
	max-height: 100px;
}

el-select {
	position: fixed;
	left: 100px;
}

.windi-button {
	@apply fixed bottom-2 right-4 w-8 h-8 bg-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:bg-blue-600;
	z-index: 9999;
}

.select {
	@apply fixed bottom-2 right-4;
	z-index: 9999;
	visibility: hidden;
}

.select .el-select-dropdown {
	visibility: visible;
	pointer-events: auto;
}

</style>