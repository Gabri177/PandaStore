<template>
	<!-- 默认的name是file  -->
	<el-upload drag 
	:action="uploadImageAction" 
	multiple
	:header="{
		token
	}"
	name="image" 
	:data="data"
	:on-success="handleSuccess"
	:on-error="handleError"
	>
		<el-icon class="el-icon--upload"><upload-filled /></el-icon>
		<div class="el-upload__text">
			{{ $t('image.imageMain.upload.text_1') }} <em>{{ $t('image.imageMain.upload.text_2') }}</em>
		</div>
		<template #tip>
			<div class="el-upload__tip">
				{{ $t('image.imageMain.upload.tip') }}
			</div>
		</template>
	</el-upload>
</template>

<script setup>
import { uploadImageAction } from '~/api/image';
import { getLoginToken } from '~/composables/auth';
import { toast } from '~/composables/util';
import { lang } from '~/lang';
const token = getLoginToken();
const { t } = lang.global;

const handleSuccess = (response, uploadFile, uploadFiles) => {
	toast(t('image.imageMain.upload.successTitle'), t('image.imageMain.upload.successMessage'))
	emit('success', {response, uploadFile, uploadFiles})
}

const handleError = (error, uploadFile, uploadFiles) => {
	// console.log("dfsfsd", error)
	//let msg = JSON.parse(error.message).msg || '上传失败'
	toast(t('image.imageMain.upload.failedTitle'), t('image.imageMain.upload.failedMessage'), "error")
	emit('error', {error, uploadFile, uploadFiles})
}

defineProps({
	data:Object
})

const emit = defineEmits(['success', 'error'])
</script>