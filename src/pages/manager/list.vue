<template>
	<div>
		<el-card shadow="never" class="border-0">
			<div class="flex items-center justify-between mb-3">
				<el-button type="primary" size="small" @click="handleAdd">{{ $t('notice.list.button_add') }}</el-button>
				<el-tooltip effect="dark" :content="$t('notice.list.tip_refresh')" placement="top">
					<el-button text @click="getData">
						<el-icon :size="20">
							<Refresh />
						</el-icon>
					</el-button>
				</el-tooltip>
			</div>
		</el-card>

	</div>

	<el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
		<el-table-column :label="table_title" width="200">
			<template #default="scope">
				<div class="flex items-center">
					<el-avatar :size="40" :src= "scope.row.avatar">
						<img
							src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
						/>
					</el-avatar>
					<div class="ml-3">
						<h6>{{ scope.row.username }}</h6>
						<small>ID: {{ scope.row.id }}</small>
					</div>
				</div>
			</template>
		</el-table-column>
		<el-table-column prop="create_time" :label="table_create_time" width="380" />
		<el-table-column :label="table_operate" width="180" align="center">
			<template #default="scope">
				<el-button type="primary" text size="small" @click="handleEdit(scope.row)">{{
					$t('notice.list.button_edit') }}</el-button>
				<el-button type="primary" text size="small" @click="handleDelete(scope.row)">{{
					$t('notice.list.button_delete') }}</el-button>
			</template>
		</el-table-column>
	</el-table>

	<div class="flex items-center justify-center mt-5">
		<el-pagination background layout="prev, pager, next" :total="totalPages" :current-page="currentPage"
			:page-size="limitRef" @current-change="getData" />
	</div>
	<DiaLog ref="dialogRef" :title="dialogTitle" @cancel="handleDialogCancel" @confirm="handleDialogConfirm">
		<div class="flex flex-col">
			<el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
				<el-form-item :label="$t('notice.list.table_title')" prop="name" label-position="top">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item :label="$t('notice.list.table_content')" prop="content" label-position="top">
					<el-input v-model="form.content"></el-input>
				</el-form-item>
			</el-form>
		</div>

	</DiaLog>

</template>

<script setup>

import { ref, computed, reactive } from 'vue'
import { lang } from '~/lang'
import DiaLog from '~/components/DiaLog.vue'
import { toast, popOut } from '~/composables/util'


const { t } = lang.global
const loading = ref(false)
const isEdit = ref(false)
const formRef = ref(null)
const dialogRef = ref(null)
const tableData = ref([])
const table_title = computed(() => t('manager.list.table_title'))
const table_create_time = computed(() => t('notice.list.table_create_time'))
const table_operate = computed(() => t('notice.list.table_operate'))
const dialogTitle = computed(() => isEdit.value ? t('notice.list.edit_title') : t('notice.list.add_title'))
const currentPage = ref(1) //模拟当前页数 应该设置api 并调用api 来获取当前页数
const totalPages = ref(20)  //模拟总页数 应该设置api 并调用api 来获取总页数
const limitRef = ref(10) //模拟每页显示条数 应该设置api 并调用api 来获取每页显示条数
const tempRow = ref({})
const form = reactive({
	name: '',
	content: ''
})

const rules = reactive({
	name: [
		{ required: true, message: () => t('notice.list.rule_name'), trigger: 'blur' }
	],
	content: [
		{ required: true, message: () => t('notice.list.rule_content'), trigger: 'blur' }
	]
})

const handleAdd = () => {
	isEdit.value = false
	form.name = ''
	form.content = ''
	dialogRef.value.openDialog()
	// console.log('add')
}


const handleDialogCancel = () => {
	dialogRef.value.closeDialog()
	// console.log('cancel')
}

const handleDialogConfirm = () => {

	formRef.value.validate((valid) => {
		// console.log('valid', valid)
		if (!valid) {
			// console.log('error')
			return
		} else {
			if (isEdit.value) {
				//模拟提交更改 应该设置api 并调用api 来提交更改
				setTimeout(() => {
					tempRow.value.title = form.name
					tempRow.value.content = form.content
					tempRow.value = null
				}, 500);
				toast(t('toast.edit.success_title'), t('toast.edit.success_message'))
				console.log('Edit Confirm')

			} else {
				//模拟提交添加 应该设置api 并调用api 来提交添加
				setTimeout(() => {
					tableData.value.unshift({
						id: tableData.value.length + 1,
						date: '2023-10-01',
						title: form.name,
						content: form.content,
						create_time: '2023-10-01',
						update_time: '2023-10-01'
					})
				}, 500);
				toast(t('toast.add.success_title'), t('toast.add.success_message'))
				console.log('Add Confirm')
			}
		}
	})


	dialogRef.value.closeDialog()
	// console.log('confirm')
}

const handleEdit = (row) => {
	// console.log('Edit', id)	
	isEdit.value = true
	console.log(row.target)
	tempRow.value = row
	form.content = row.content
	form.name = row.title
	dialogRef.value.openDialog()
	// console.log('edit')
}

const handleDelete = (row) => {

	popOut(t('notice.list.delete_title'), t('notice.list.delete_msg') + ` ${row.title} ?`, t('button.confirm'), t('button.cancel'))
		.then(() => {
			loading.value = true
			setTimeout(() => {
				tableData.value = tableData.value.filter(item => item != row)
				toast(t('toast.delete.success_title'), t('toast.delete.success_message'))
				console.log('Delete Confirm success')
				loading.value = false
			}, 500);
			//toast(t('toast.delete.error_title'), t('toast.delete.error_message'), 'error')
		})
		.catch(() => {
			loading.value = false
		})
	console.log('handle Delete')
}


function getData() {   //模拟请求数据  应该设置api 并调用api 来获取公告数据
	loading.value = true
	setTimeout(() => {
		tableData.value = [
			{
				id: 1,
				date: '2023-10-01',
				username: 'Notice 1',
				content: 'Content for notice 1',
				create_time: '2023-10-01',
				update_time: '2023-10-01',
				avatar: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
			},
			{
				id: 2,
				date: '2023-10-02',
				username: 'Notice 2',
				content: 'Content for notice 2',
				create_time: '2023-10-02',
				update_time: '2023-10-02',
				avatar: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
			},
			{
				id: 3,
				date: '2023-10-03',
				username: 'Notice 3',
				content: 'Content for notice 3',
				create_time: '2023-10-03',
				update_time: '2023-10-03',
				avatar: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'

			},
			{
				id: 4,
				date: '2023-10-04',
				username: 'Notice 4',
				content: 'Content for notice 4',
				create_time: '2023-10-04',
				update_time: '2023-10-04',
				avatar: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
			}
		]
		loading.value = false
	}, 500);
}

getData()

</script>


<style scope>
.el-card__body {
	padding-bottom: 0;
}
</style>