<template>
	<div>
		<el-card shadow="never" class="border-0" >
			<div class="flex items-center justify-between mb-3">
				<el-button type="primary" size="small">add</el-button>
				<el-tooltip
				effect="dark"
				content="刷新"
				placement="top"
				>
					<el-button text>
						<el-icon :size="20"><Refresh /></el-icon>
					</el-button>
				</el-tooltip>
			</div>
		</el-card>
		
	</div>

	<el-table :data="tableData" stripe style="width: 100%">
		<el-table-column prop="title" :label="table_title"/>
		<el-table-column prop="create_time" :label="table_create_time" width="380" />
		<el-table-column :label="table_operate" width="180" align="center" >
			<template #default="scope">
				<el-button type="primary" text size="small" @click="handleEdit(scope.row.id)">修改</el-button>
				<el-button type="primary" text size="small" @click="handleDelete(scope.row.id)">删除</el-button>
			</template>
		</el-table-column>
  	</el-table>

	<DiaLog 
	ref="dialogRef" 
	:title="dialogTitle"
	@cancel="handleDialogCancel"
	@confirm="handleDialogConfirm"
	>
		<div>
			
		</div>
	</DiaLog>

</template>

<script setup>

import { ref, computed } from 'vue'
import { lang } from '~/lang'
import DiaLog from '~/components/DiaLog.vue'

const { t } = lang.global
const isEdit = ref(false)
const dialogRef = ref(null)
const tableData = ref([])
const table_title = computed(() => t('notice.list.table_title'))
const table_create_time = computed(() => t('notice.list.table_create_time'))
const table_operate = computed(() => t('notice.list.table_operate'))
const dialogTitle = computed(() => isEdit.value ? t('notice.list.edit_title') : t('notice.list.delete_title'))

const handleDialogCancel = () => {
	dialogRef.value.closeDialog()
	// console.log('cancel')
}

const handleDialogConfirm = () => {
	dialogRef.value.closeDialog()
	// console.log('confirm')
}

const handleEdit = (id) => {
	// console.log('Edit', id)	
	isEdit.value = true
	dialogRef.value.openDialog()
	// console.log('edit')
}

const handleDelete = (id) => {
	// console.log('Delete', id)
	isEdit.value = false
	dialogRef.value.openDialog()
	// console.log('delete')
}


function getData(){
	tableData.value = [
		{
			id: 1,
			date: '2023-10-01',
			title: 'Notice 1',
			content: 'Content for notice 1',
			create_time: '2023-10-01',
			update_time: '2023-10-01'
		},
		{
			id: 2,
			date: '2023-10-02',
			title: 'Notice 2',
			content: 'Content for notice 2',
			create_time: '2023-10-02',
			update_time: '2023-10-02'
		},
		{
			id: 3,
			date: '2023-10-03',
			title: 'Notice 3',
			content: 'Content for notice 3',
			create_time: '2023-10-03',
			update_time: '2023-10-03'
		},
		{
			id: 4,
			date: '2023-10-04',
			title: 'Notice 4',
			content: 'Content for notice 4',
			create_time: '2023-10-04',
			update_time: '2023-10-04'
		}
	]
}

getData()

</script>


<style scope>


.el-card__body{
	padding-bottom: 0;
}
</style>