<template>
	<div class="flex justify-center items-center min-h-screen bg-gray-100">
	  <div class="p-6 bg-white rounded-lg shadow-md w-full max-w-lg">
		<el-result
		  icon="warning"
		  :title="$t('NotFound.title')"
		  :sub-title="$t('NotFound.subTitle')"
		>
		  <template #extra>
			<el-button type="primary" @click="$router.push('/')">{{ $t('NotFound.button_text') }}</el-button>
		  </template>
		</el-result>
	  </div>
	</div>
  </template>
  