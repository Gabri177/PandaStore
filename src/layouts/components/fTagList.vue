<template>
	<div 
	class="f-tag-list"
	:style="{left: $store.state.asideWidth}"
	>
		<el-tabs
		v-model="activeTab"
		type="card"
		class="demo-tabs"
		@tab-remove="removeTab"
		style="min-width: 100px;"
		@tab-change="handleTabChange"
		>
			<el-tab-pane
			v-for="item in tabList"
			:closable="item.path !== '/'"
			:key="item.path"
			:label="item.title"
			:name="item.path"
			>
			</el-tab-pane>
		</el-tabs>
		
		<span class="tag-btn">
			<el-dropdown @command="handleCommand">
				<span class="el-dropdown-link">
				<el-icon>
					<arrow-down />
				</el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command="clearOther">{{ $t('sideMenu.dropdown.close_other') }}</el-dropdown-item>
						<el-dropdown-item command="clearAll">{{ $t('sideMenu.dropdown.close_all') }}</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</span>
	</div>
	<div style="height: 44px;"></div>
</template>

<style scoped>

	.f-tag-list {
		@apply fixed bg-gray-100 flex items-center px-2;
		top: 64px;
		right: 0;
		height: 44px;
		z-index: 100;
	}

	.tag-btn {
		@apply bg-white rounded ml-auto flex items-center justify-center px-2;
		height: 32px;
	}

	:deep(.el-tabs__header) {
		border: 0 !important;
		margin: 0;
	}

	:deep(.el-tabs__nav) {
		border: 0 !important;
	}

	:deep(.el-tabs__nav){
		border: 0 !important;
	}

	:deep(.el-tabs__item){
		border: 0 !important;
		height: 32px;
		line-height: 32px;
		@apply bg-white mx-1 rounded;
	}

	:deep(.el-tabs__nav-next), :deep(.el-tabs__nav-prev){
		line-height: 32px;
		height: 32px;
	}

	:deep(.is-disabled){
		cursor: not-allowed;
		@apply text-gray-300;
	}

</style>

<script setup>

import { useTablist } from "~/composables/useManager.js"

const {
		activeTab,
		tabList,
		handleCommand,
		removeTab,
		handleTabChange
} = useTablist()


</script>