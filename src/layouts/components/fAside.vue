<template>
	<div class="f-menu">
		<el-menu class="border-0" @select="handleSelect" :style="{ width: $store.state.asideWidth }"
			:collapse="isCollapse" :collapse-transition="false" :default-active="defaultActive" unique-opened>
			<template v-for="(item, index) in asideMenu" :key="index">
				<el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
					<template #title>
						<el-icon>
							<component :is="item.icon" />
						</el-icon>
						<span>
							{{ $t(item.name) }}
						</span>
					</template>

					<el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.frontpath">
						<el-icon>
							<component :is="item2.icon" />
						</el-icon>
						<span>{{ $t(item2.name) }}</span>

					</el-menu-item>
				</el-sub-menu>

				<el-menu-item v-else :index="item.frontpath">
					<el-icon>
						<component :is="item.icon" />
					</el-icon>
					<span>Navigator Two</span>
				</el-menu-item>
			</template>

		</el-menu>
	</div>
</template>

<style scoped>
.f-menu {
	transition: all 0.3s;
	height: 100%;
	top: 64px;
	bottom: 9;
	left: 0;
	overflow-y: auto;
	overflow-x: hidden;
	@apply shadow-md fixed bg-light-50;
}

.f-menu::-webkit-scrollbar {
	width: 0;

}
</style>

<script setup>

import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { defaultAsideMenu } from '~/default/constant.js'

const router = useRouter()
const store = useStore()
const route = useRoute()

//默认选中
const defaultActive = ref(route.path)


//是否折叠菜单
const isCollapse = computed(() => !(store.state.asideWidth == '250px'))

//侧边栏菜单
// const asideMenu = computed(() => store.state.menus)

const asideMenu = defaultAsideMenu

const handleSelect = (path) => {
	router.push(path)
}

onBeforeRouteUpdate((to, from, next) => {
	// console.log('sidebar path update',to.path)
	defaultActive.value = to.path
	next()
})


</script>