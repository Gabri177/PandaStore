<template>
	<div class="f-menu">
		<el-menu 
		default-active="2" 
		class="border-0"
		>
			<template v-for="(item, index) in asideMenu" :key="index">
				<el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
				<template #title>
					<el-icon>
						<component :is="item.icon" />
					</el-icon>
					<span>{{ item.name }}</span>
				</template>
			
					<el-menu-item v-for="(item2, index2) in item.child" 
					:key="index2"
					:index="item2.frontpath"
					>
						{{ item2.name }}
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
	width: 250px;
	height: 100%;
	top: 64px;
	bottom: 9;
	left: 0;
	overflow: auto;
	@apply shadow-md fixed bg-light-50;
}
</style>

<script setup>

	const asideMenu = [
		{
		"name": "主控台1",
		"icon": "home-filled",
		"child": [{
			"name": "后台面板1",
			"icon": "help",
			"frontpath": "/"
		}]
		},{
		"name": "主控台2",
		"icon": "home-filled",
		"child": [{
			"name": "后台面板2",
			"icon": "help",
			"frontpath": "/"
		}]
		},{
		"name": "主控台3",
		"icon": "home-filled"
		}
		
	]


</script>