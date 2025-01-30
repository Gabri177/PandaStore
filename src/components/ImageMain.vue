<template>
	 <el-main class="image-main" v-loading="loading">
		<div class="top p-3">
			<el-row :gutter="10">
				<el-col 
				:span="6" 
				:offset="0"
				v-for="(item, index) in list"
				:key="index">
					<el-card shadow="hover" class="relative mb-3" :body-style="{ padding: '0px' }" :class="{'border-blue-500':item.checked}">
						<el-image
						fit="cover"
						class="h-[150px]"
						style="width: 100%;"
						:src="item.url"
						:preview-src-list="[item.url]"
						:initial-index="0"
						/>
						<div class="image-title">
							{{ item.name }}
						</div>
						<div class="flex justify-center items-center p-2 ">

							<el-checkbox v-show="isCheckable" v-model="item.checked" @change="handleChooseChange(item)"></el-checkbox>
							
							<el-button type="primary" size="small" text @click="handleEdit(item)">{{ $t('image.imageMain.edit') }}</el-button>
							<el-button class="!m-0" type="primary" size="small" text @click="handleDelete(item)">{{ $t('image.imageMain.delete') }}</el-button>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<div class="bottom">
			<el-pagination background layout="prev,pager,next" 
			:total="totalPages" 
			:current-page="currentPage"
			:page-size="limitRef"
			@current-change="getData"
			/>
		</div>

		<DiaLog 
		ref="dialogRef" 
		:title="dialogTitle"
		@cancel="handleCancel"
		@confirm="handleConfirm"
		>
			<div>
				<el-form 
				:model="form" 
				ref="formRef" 
				:rules="rules" 
				label-width="80px" 
				>
					<el-form-item 
					:label="renameTitle" 
					label-position="top"
					prop="rename"
					>
						<el-input v-model="form.rename" ></el-input>
					</el-form-item>
				</el-form>
			</div>
		</DiaLog>

		<DiaLog 
		ref="uploadRef" 
		:title="uploadTitle"
		@cancel="handleUploadCancel"
		@confirm="handleUploadConfirm"
		>
			<div>
				<UploadFile :data="{ imageClassId }" @success="handleUploadSuccess" @error="handleUploadError"/>
			</div>
		</DiaLog>
	</el-main>
</template>

<script setup>

import { 
	getImagesList,
	updateImage,
	deleteImage
} from '~/api/image.js'
import { ref, reactive, computed, openBlock } from 'vue';
import { toast, popOut } from '~/composables/util'
import { lang } from '~/lang'
import DiaLog from '~/components/DiaLog.vue'
import UploadFile from './UploadFile.vue';


const { t } = lang.global

// 上传弹窗
const uploadRef = ref(null)
const uploadTitle = computed(() => t('image.imageMain.upload.title'))

const openUploadDialog = () => {
	uploadRef.value.openDialog()
}

const handleUploadCancel = () => {
	uploadRef.value.closeDialog()
}




// 弹窗部分
const dialogRef = ref(null)
const formRef = ref(null)
const form = reactive({
	rename: ''
})

const rules = reactive({
	rename: [
		{ 
			required: true, 
			message: t('image.imageAside.categoryNameRequired'), 
			trigger: 'blur' 
		}
	]
})

//编辑的弹窗
const dialogTitle = computed(() => t('image.imageAside.rename.title'))
const renameTitle = computed(() => t('image.imageAside.rename.message'))

//弹窗按钮事件处理

let image_id=''
const handleCancel = () => {

	form.rename = ''
	dialogRef.value.closeDialog()
}

const handleConfirm = () => {
	formRef.value.validate((valid) => {
		if (valid) {
			// console.log('form', form)
			dialogRef.value.showLoading()
			updateImage(image_id, form.rename)
			.then(res => {
				// console.log('updateImage:', res)
				toast('success', '重命名成功')
				getData(currentPage.value)
				
			})
			.finally(()=>{
				dialogRef.value.hideLoading()
				handleCancel()
			})

		}
	})

}

// 编辑 删除 按钮事件处理
const handleEdit = (item) => {
	dialogRef.value.openDialog()
	form.rename = item.name
	image_id = item.id
	// console.log('handleEdit image_id: ', image_id)
}

const handleDelete = (item) => {
	
	popOut(t('image.imageMain.popOut.title'), t('image.imageMain.popOut.message'))
	.then(() => {
		// console.log ("handleDelete imageID: ", item.id)
		deleteImage(item.id)
		.then(res => {
			// console.log("图片删除成功", res)
			getData()
			toast ('success', '删除成功')
		})
		.finally(() => {
			// console.log('finally-deleteImage')
		})
	
	})
	.catch(() => {
		// console.log('cancel')
	})
	.finally(() => {
		// console.log('finally')
	})
}

// 分页部分
const currentPage = ref(1)
const totalPages = ref(0)
const limitRef = ref(10)
const loading = ref(false)
const list = ref([])
const imageClassId = ref(0)

// 获取数据
function getData(page = null, limit = 10) {
	if (typeof page == 'number')
		currentPage.value = page
	if (typeof limit == 'number')
		limitRef.value = limit
	loading.value = true
	// 模拟请求返回时间为0.5秒钟
	setTimeout(() => {
		getImagesList(imageClassId.value, currentPage.value, limit)
		.then(res => {

			// console.log('getData => res image list', res)
			list.value = res.list.map(item => {
				item.checked = false
				return item
			})
			totalPages.value = res.totalCount
			// console.log('totalPages', totalPages.value)
			
		})
		.catch((err)=>{
			// console.log('getData error: ', err)
		})
		.finally(() => {
			loading.value = false
		})
	}, 500);
}

// 根据分类获取图片列表
const loadData = (id) => {
	// console.log('loadData', id)
	currentPage.value = 1
	imageClassId.value = id
	getData()
}

// 上传事件处理
const handleUploadSuccess = (res) => {
	// console.log('handleUploadSuccess', res)
	getData()
	uploadRef.value.closeDialog()
}

const handleUploadError = (error) => {
	// console.log('handleUploadError', error)
	uploadRef.value.closeDialog()
}

//选中的图片
const emit = defineEmits(['choose'])

const checkedImages = computed(() => {
	return list.value.filter(item => item.checked)
})

const handleChooseChange = (item) => {
	if (item.checked && checkedImages.value.length > 6) {
		item.checked = false
		return toast('warning', '只能选择六张图片', "error")
	}
	emit('choose', checkedImages.value)
}

defineExpose({
	loadData,
	openUploadDialog
})

defineProps({
	
	isCheckable: {
		type: Boolean,
		default: false
	}
})



</script>


<style scoped>

.image-title {
	position: absolute;
	top:122px;
	left: -1px;
	right: -1px;
	background-color: rgba(0, 0, 0, 0.5);
	@apply text-sm truncate text-gray-100 px-2 py-1;
}


.image-main {
	position: relative;
}


.image-main .top{
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 50px;
	overflow-y: auto;
}

.image-main .bottom{
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