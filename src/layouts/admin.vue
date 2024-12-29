<template>
	<el-container>
		<el-header>
			<fHeader />
		</el-header>
		<el-container>
			<el-aside
			:width="$store.state.asideWidth"
			>
				<fAside />
			</el-aside>
			<el-main>
				<fTagList />
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script setup>

import fHeader from './components/fHeader.vue';
import fAside from './components/fAside.vue';
import fTagList from './components/fTagList.vue';

</script>

<style scoped>

el-aside {
	transition: all 0.3s;
}


</style>