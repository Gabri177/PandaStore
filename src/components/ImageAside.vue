<template>
	<el-aside width="220px" class="image-aside" v-loading="loading">

		<div class="top">


			<AsideList v-for="(i, index) in list" :key="index" :active="activeId == i.id" @edit="handleEdit(i)"
				@delete="handleDelete(i.id, i.name)" @click="handleActiveClick(i.id)">
				{{ i.name }}
			</AsideList>

		</div>
		<div class="bottom">
			<el-pagination background layout="prev, next" :total="totalPages" :current-page="currentPage"
				:page-size="limitRef" @current-change="getData" />
		</div>
	</el-aside>

	<DiaLog ref="dialogRef" :title="dialogTitle" @cancel="handleCancel" @confirm="handleConfirm">
		<div>
			<el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
				<el-form-item :label="labelCategoryTitle" label-position="top" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item :label="orderTitle" label-position="top" prop="order">
					<el-input-number v-model="form.order" :min="0" :max="1000"></el-input-number>
				</el-form-item>
			</el-form>
		</div>
	</DiaLog>
</template>

<script setup>
import AsideList from '~/components/AsideList.vue'
import {
	getImageClassList,
	createImageClass,
	updateImageClass,
	deleteImageClass
} from '~/api/image_class.js'
import { ref, reactive, computed } from 'vue'
import DiaLog from '~/components/DiaLog.vue'
import FormDrawer from '~/components/FormDrawer.vue'
import { toast, popOut } from '~/composables/util'
import { lang } from '~/lang'

import { getImagesList } from '~/api/image.js'

const t = lang.global.t

/////// dialog ///////////////////////////
/////// form ///////////////////
const editId = ref(0)
const dialogTitle = computed(() => editId.value ? t('image.imageAside.editImageClass') : t('image.imageAside.addImageClass'))
const labelCategoryTitle = computed(() => t('image.imageAside.categoryLabel'))
const orderTitle = computed(() => t('image.imageAside.orderLabel'))
const formRef = ref(null)
const form = reactive({
	name: '',
	order: 33
})

const form_reset = () => {
	form.name = ''
	form.order = 33
}

const rules = reactive({
	name: [
		{
			required: true,
			message: 'ddddddddddd',
			trigger: 'blur',
		}
	],
	order: [
		{
			required: true,
			message: 'xxxxxxxxxxxxx',
			trigger: 'blur',
		}
	]
});


const handleConfirm = async () => {

	const valid = await formRef.value.validate()

	if (valid) {
		dialogRef.value.showLoading()
		const statePromise = editId.value ? updateImageClass(editId.value, form) : createImageClass(form)

		// 模拟请求返回时间为0.5秒钟
		setTimeout(() => {
			statePromise
				.then(res => {
					// 获取最新的分页数据
					console.log('ImageAside.vue 获取分页数据成功: ', res)
					toast('success', '编辑成功');
					return getImageClassList(currentPage.value, limitRef.value);
				})
				.then(res => {
					// 更新总页数
					totalPages.value = res.totalCount;
					// 向上取整, 防止最后一页数据不足
					const lastPage = Math.ceil(totalPages.value / limitRef.value);
					// 跳转到最后一页
					// 也可以直接默认永远是第一页
					// getData(1);
					getData(editId.value ? currentPage.value : lastPage);
					dialogRef.value.closeDialog();
				})
				.finally(() => {
					dialogRef.value.hideLoading();
				})

		}, 500);
	} else {
		// console.log('error submit!!')
		return
	}

}
/////// form ///////////////////


const dialogRef = ref(null)

// 新增分类
const addImageClass = () => {

	editId.value = 0
	form_reset()
	dialogRef.value.openDialog()
}

// 取消新增或编辑
const handleCancel = () => {

	form_reset()
	dialogRef.value.closeDialog()
}

defineExpose({

	addImageClass
})
/////// dialog ///////////////////////////


///////////////////////// list //////////////////////////
const list = ref([])
const activeId = ref(0)

// 加载动画
const loading = ref(false)

// 分页部分
const currentPage = ref(1)
const totalPages = ref(0)
const limitRef = ref(0)

// 获取数据
function getData(page = null, limit = 10) {
	if (typeof page == 'number')
		currentPage.value = page
	if (typeof limit == 'number')
		limitRef.value = limit
	// console.log('limit value: ', limitRef.value)
	// console.log('getData', page)
	loading.value = true
	// 模拟请求返回时间为0.5秒钟
	setTimeout(() => {
		getImageClassList(currentPage.value, limit)
			.then(res => {
				list.value = res.list
				totalPages.value = res.totalCount
				let item = res.list[0]
				if (item) {
					handleActiveClick(item.id)
				}
			})
			.finally(() => {
				loading.value = false
			})
	}, 500);
}
getData()


// 编辑分类
const handleEdit = (i) => {
	form.name = i.name
	form.order = i.order
	editId.value = i.id
	dialogRef.value.openDialog()
}

// 删除分类
const handleDelete = (id, name) => {
	popOut(t('image.imageAside.popOut.delete.title'),
		t('image.imageAside.popOut.delete.message') + `  ${name} ?`,
		t('image.imageAside.popOut.delete.confirm'),
		t('image.imageAside.popOut.delete.cancel')
	)
		.then(() => {
			loading.value = true
			setTimeout(() => {
				deleteImageClass(id)
					.then(res => {
						getData()
						toast('success', '删除成功')
					})
					.catch(error => {
						toast('error', '删除失败')
					})
					.finally(() => {
						loading.value = false
					})
			}, 500);
		})
		.catch(() => {
			// console.log('cancel')
		})
}


// 激活分类

const emit = defineEmits(['changeClass'])

const handleActiveClick = (id) => {

	activeId.value = id;
	emit('changeClass', id)
}
///////////////////////// list //////////////////////////
</script>

<style scoped>
.image-aside {

	border-right: 1px solid #eeeeee;
	position: relative;
}

.image-aside .top {
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 50px;
	overflow-y: auto;
}

.image-aside .bottom {
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