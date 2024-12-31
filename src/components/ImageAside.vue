<template>
	<el-aside width="220px" class="image-aside" v-loading="loading">

		<div class="top">
			

			<AsideList
			v-for="(i, index) in list"
			:key="index"
			:active="activeId === i.id"
			>
				{{ i.name }}
			</AsideList>

		</div>
		<div class="bottom">
			分页
		</div>
	</el-aside>
</template>

<script setup>
import AsideList from '~/components/AsideList.vue'
import { getImageClassList } from '~/api/image_class.js'
import { ref } from 'vue'

const list = ref([])
const activeId = ref(0)

// 加载动画
const loading = ref(false)

// 获取数据
function getData() {
	loading.value = true
	getImageClassList(1)
	.then(res => {
		list.value = res.list
		let item = res.list[0]
		if (item) {
			activeId.value = item.id
		}
	})
	.finally(() => {
		loading.value = false
	})
}

getData()

</script>

<style scoped>



.image-aside {
	
	border-right: 1px solid #eeeeee;
	position: relative;
}

.image-aside .top{
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 50px;
	overflow-y: auto;
}

.image-aside .bottom{
	position: absolute;
	bottom: 0;
	height: 50px;
	left: 0;
	right: 0;
	@apply flex items-center justify-center;
}

::-webkit-scrollbar {
	width: 3px;
	height: 6px;
}

::-webkit-scrollbar-corner {
	display: block;
}

::-webkit-scrollbar-thumb {
	border-radius: 8px;
	background-color: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-track {
	border-right-color: transparent;
	border-left-color: transparent;
	background-color: rgba(0, 0, 0, 0.1);
}


</style>