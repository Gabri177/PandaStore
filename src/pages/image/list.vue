<template>
	<el-container class="bg-white rounded" :style="{height: h + 'px'}">
      <el-header class="image-header">
        <el-button type="primary" @click="handleAddClass" size="small">{{ $t('image.header.addImageClassButton') }}</el-button>
       
      </el-header>
      <el-container>
		<ImageAside ref="asideRef" @changeClass="handleAsideChange"/>
		<ImageMain ref="mainRef"/>
      </el-container>
    </el-container>
</template>

<script setup>

import ImageAside from '~/components/ImageAside.vue'
import ImageMain from '~/components/ImageMain.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue';

const asideRef = ref(null)
const windowHeight = window.innerHeight || document.body.clientHeight
// const h = windowHeight - 64 - 44 - 40

const handleAddClass = () => {
	asideRef.value.addImageClass()
}

// 定义响应式高度
const h = ref(window.innerHeight - 64 - 44 - 40);

// 定义更新高度的函数
const updateHeight = () => {
	h.value = window.innerHeight - 64 - 44 - 40;
};

// 监听窗口调整大小事件
onMounted(() => {
	window.addEventListener('resize', updateHeight);
});

// 移除监听器，防止内存泄漏
onBeforeUnmount(() => {
	window.removeEventListener('resize', updateHeight);
});

const mainRef = ref(null)
const handleAsideChange = (img_class_id) => {
	mainRef.value.loadData(img_class_id)
}


</script>

<style scoped>

.image-header {
  
	border-bottom: 1px solid #eeeeee;
	@apply flex items-center;
}
</style>