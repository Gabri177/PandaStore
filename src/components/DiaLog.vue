<template>
	<el-dialog v-model="centerDialogVisible" :title="title" :width="width" align-center>
		<slot></slot>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="handleCancel">{{ $t('dialog.cancel') }}</el-button>
				<el-button type="primary" @click="handleConfirm" :loading="loading">
					{{ $t('dialog.confirm') }}
				</el-button>
			</div>
		</template>
	</el-dialog>
</template>
<script setup>
import { ref } from 'vue'

const loading = ref(false)

const centerDialogVisible = ref(false)

const openDialog = () => {
	centerDialogVisible.value = true
}

const closeDialog = () => {
	centerDialogVisible.value = false
}

const handleCancel = () => {
	emit('cancel')
}

const handleConfirm = () => {
	emit('confirm')
}

const showLoading = () => {
	loading.value = true
}

const hideLoading = () => {
	loading.value = false
}

defineProps({
	title: {
		type: String,
		default: 'Warning'
	},
	width: {
		type: Number,
		default: 500
	}
})

const emit = defineEmits(['cancel', 'confirm'])

defineExpose({
	openDialog,
	closeDialog,
	showLoading,
	hideLoading
})



</script>