<template>
	<div class="aside-list" :class="{'active': active}">
		<span class="truncate"><slot /></span>
		<el-button class="ml-auto" type="primary" size="small" @click="$emit('edit')" text>
			<el-icon :size="12">
				<Edit />
			</el-icon>
		</el-button>
		<el-button type="primary" size="small" @click="$emit('delete')" text>
			<el-icon :size="12">
				<Close />
			</el-icon>
		</el-button>
	</div>
</template>

<script setup>

defineProps({
	active: {
		type: Boolean,
		default: false
	}
})

defineEmits(['edit', 'delete'])

</script>

<style scoped>

.el-button+.el-button {
	margin-left: 1px;
}

.aside-list {
	border-bottom: 1px solid #f4f4f4;
	@apply flex items-center p-3 text-sm text-gray-600 cursor-pointer;
}

.aside-list:hover {
	@apply bg-gray-100;
}

.active {
	@apply bg-blue-100;
}

</style>