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
				<router-view
				v-slot="{ Component }"
				>
					<transition
					name="fade"
					>
						<keep-alive
						:max="10"
						>
							<component :is="Component" />
						</keep-alive>
					</transition>
				</router-view>
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

.fade-enter-from {
	opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
}

.fade-enter-to {
	opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}

.fade-leave-from {
	opacity: 1;
}

.fade-leave-to {
	opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
}

.fade-enter-active,
.fade-leave-active {
	transition: all 0.3s;
}

.fade-enter-active {
	transition-delay: 0.3s;
}

el-aside {
	transition: all 0.3s;
}


</style>