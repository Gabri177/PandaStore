<template>
	<div class="flex flex-wrap m-4 justify-center">
		<div v-if="modelValue" class="flex flex-wrap">
			<div v-for="(item, index) in modelValue" :key="index" class="relative group w-[100px] h-[100px] mr-2">
				<el-image :src="item" fit="cover" class="w-[100px] h-[100px] rounded border"></el-image>

				<!-- 悬浮遮罩 -->
				<div
					class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					<el-icon @click="handleDelete(index)" class="text-white cursor-pointer" size="20">
						<Delete />
					</el-icon>
				</div>
			</div>
			<!-- 选择图片按钮 -->
			<div class="choose-image-btn" @click="open">
				<el-icon :size="25" class="text-gray-500">
					<Plus />
				</el-icon>
			</div>
		</div>

		
	</div>

	<!-- 选择图片弹窗 -->
	<el-dialog title="选择图片" v-model="dialogVisible" width="80%" top="5vh">
		<el-container class="bg-white rounded" style="height: 70vh;">
			<el-header class="image-header">
				<el-button type="primary" @click="handleAddClass" size="small">{{ $t('image.header.addImageClassButton')
					}}</el-button>
				<el-button type="warning" @click="handleUpload" size="small">{{ $t('image.header.addUploadButton')
					}}</el-button>
			</el-header>
			<el-container>
				<ImageAside ref="asideRef" @changeClass="handleAsideChange" />
				<ImageMain ref="mainRef" @choose="handleChoose" :isCheckable="true" />
			</el-container>
		</el-container>
		<template #footer>
			<span>
				<el-button @click="close">取消</el-button>
				<el-button type="primary" @click="submit">提交</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
import ImageAside from '~/components/ImageAside.vue'
import ImageMain from '~/components/ImageMain.vue'
import { ref } from 'vue'
import { Delete, Plus } from '@element-plus/icons-vue'
import { toast } from '~/composables/util'

const dialogVisible = ref(false)

const open = () => {
	dialogVisible.value = true
}
const close = () => {
	dialogVisible.value = false
}

const asideRef = ref(null)
const mainRef = ref(null)

const handleAddClass = () => {
	asideRef.value.addImageClass()
}

const handleUpload = () => {
	mainRef.value.openUploadDialog()
}

const handleAsideChange = (img_class_id) => {
	mainRef.value.loadData(img_class_id)
}

const props = defineProps({
	modelValue: [String, Array],
})
const emit = defineEmits(['update:modelValue'])

let urls = []

const handleChoose = (images) => {
	urls = images.map((item) => item.url)
}

const submit = () => {
	if (urls.length + props.modelValue.length > 6) {
		return toast('warning', '轮播图最多为六张图片', 'warning')
	}
	urls = [...props.modelValue, ...urls]
	emit('update:modelValue', urls)
	close()
}

// 删除图片
const handleDelete = (index) => {
	const newImages = [...props.modelValue]
	newImages.splice(index, 1)
	emit('update:modelValue', newImages)
	console.log('delete', newImages)
}
</script>

<style scoped>
.choose-image-btn {
	@apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover:(bg-gray-100);
}

.image-header {
	border-bottom: 1px solid #eeeeee;
	@apply flex items-center;
}
</style>