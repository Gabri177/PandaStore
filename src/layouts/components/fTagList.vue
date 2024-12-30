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
						<el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
						<el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>
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
import { ref, computed, watch, isRef } from 'vue'
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router'
import { useCookies } from "@vueuse/integrations/useCookies.mjs"
import lang from "~/lang"

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
		console.log('cookie tabList: ', tabList.value)
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
	console.log('title: ', p)
	const match = p.match(/'([^']+)'/)
	if (!match)
		match = p.match(/"([^"]+)"/);
	console.log('match: ', match)	
	if (match) {
		console.log('title path : ' , match[1]);
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
	console.log('tab change: ', tab)
}

watch(() => language.locale.value, () => {

	console.log('locale change: ')
	console.log('tabList: ', tabList.value)
	tabList.value.forEach(tab => {
		tab.title = computed(() => t(tab.title_key))
	})
})

</script>