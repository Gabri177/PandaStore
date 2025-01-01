<template>
	 <el-main class="image-main" v-loading="loading">
		<div class="top p-3">
			<el-row :gutter="10">
				<el-col 
				:span="6" 
				:offset="0"
				v-for="(item, index) in list"
				:key="index">
					<el-card shadow="hover" class="relative mb-3" :body-style="{ padding: '0px' }">
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
							<el-button type="primary" size="small" text @click="handleEdit">edit</el-button>
							<el-button type="primary" size="small" text @click="handleDelete">delete</el-button>
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
	</el-main>
</template>

<script setup>

import { 
	getImagesList 
} from '~/api/image.js'
import { ref, reactive, computed } from 'vue';
import { toast, popOut } from '~/composables/util'
import { lang } from '~/lang'
import DiaLog from '~/components/DiaLog.vue'


const { t } = lang.global

// 弹窗部分
const dialogRef = ref(null)
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
const dialogTitle = computed(() => t('image.imageAside.editImageClass'))
const renameTitle = computed(() => t('image.imageAside.categoryLabel'))

//弹窗按钮事件处理
const handleCancel = () => {

	form.rename = ''
	dialogRef.value.closeDialog()
}

const handleConfirm = () => {
	formRef.value.validate((valid) => {
		if (valid) {
			console.log('form', form)
		}
	})
}

// 编辑 删除 按钮事件处理

const handleEdit = () => {
	dialogRef.value.openDialog()
}

const handleDelete = () => {
	
	popOut('warngin', '是否删除该图片')
	.then(() => {
		toast('success', '删除成功')
	})
	.catch(() => {
		console.log('cancel')
	})
	.finally(() => {
		console.log('finally')
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

			console.log('res image list', res)
			list.value = res.list
			totalPages.value = res.totalCount
			// console.log('totalPages', totalPages.value)
			
		})
		.finally(() => {
			loading.value = false
		})
	}, 500);
}

// 根据分类获取图片列表
const loadData = (id) => {
	console.log('loadData', id)
	currentPage.value = 1
	imageClassId.value = id
	getData()
}

defineExpose({
	loadData
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