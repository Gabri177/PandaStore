<template>
	<el-container class="bg-white rounded" :style="{ height: h + 'px' }">
		<el-header class="category-header">
			<div class="flex justify-between items-center w-full">
				<div>
					<el-button type="primary" @click="handleAdd">添加分类</el-button>
					<el-button type="success" @click="handleEditAll" :disabled="isEditable">编辑分类</el-button>
					<el-button type="danger" @click="handleDeleteAll" :disabled="isCheckable">批量删除</el-button>
				</div>
				<div>
					<el-button type="warning" @click="handleSaveALl" :disabled="!isNeedSave">保存更改</el-button>
				</div>
			</div>
		</el-header>
		<el-container style="overflow-y: auto;">
			<div class="w-full">
				<el-tree :allow-drop="allowDrop" :allow-drag="allowDrag" :data="tableData" draggable default-expand-all
					node-key="id" @node-drag-start="handleDragStart" @node-drag-enter="handleDragEnter"
					@node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver" @node-drag-end="handleDragEnd"
					@node-drop="handleDrop"
					:node-key="tableData.id"
					:show-checkbox="isCheckable"
					ref="tree"
				>
					<template #default="{ node, data }">
						<div class=" flex justify-between items-center w-full">
							<div>
								<div v-if = "!isEditable">
									<span class="mr-3">{{ data.label }}</span>
									<span>{{ data.isShowable ? '🟢' : '🔴' }}</span>
								</div>
								<div v-else class="category-input">
									<el-input v-model="data.label" style="width: 240px" />
								</div>
								
							</div>
							<div class="mx-3">
								<span>
									<el-switch v-model="data.isShowable" @change="handleSwitchChange(data, $event)"/>
									
									<!-- {{ console.log(node) ? "1": "2" }} -->
								</span>
							</div>
						</div>
					</template>
				</el-tree>
				<!-- {{ tableData }} -->
			</div>
		</el-container>

		<Dialog title="添加分类" ref="addDialogRef" @confirm="handleAddCategory" @cancel="handleCancelAdd">
			<el-form :model="form">
				<el-form-item label="上级分类">
					<el-select v-model="newCategory.firstClass" placeholder="请选择上级分类">
						<el-option label="无" :value="null"></el-option>
						<el-option v-for="cat in tableData" :key="cat.id" :label="cat.label"
							:value="cat.label"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="分类名称">
					<el-input v-model="newCategory.secondClass"></el-input>
				</el-form-item>
			</el-form>
		</Dialog>
	</el-container>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue';
import { popOut, toast } from '~/composables/util'
import Dialog from '~/components/Dialog.vue'
import { lang } from '~/lang';
///////////////////////////////////////////////////////////////// 多语言

const { t } = lang.global

///////////////////////////////////////////////////////////////// 拖拽排序

const isDraged = ref(false);

const handleDragStart = (node, ev) => {
	// console.log('drag start', node);
};

const handleDragEnter = (draggingNode, dropNode, ev) => {
	// console.log('tree drag enter:', dropNode.label);
};

const handleDragLeave = (draggingNode, dropNode, ev) => {
	// console.log('tree drag leave:', dropNode.label);
};

const handleDragOver = (draggingNode, dropNode, ev) => {
	// console.log('tree drag over:', dropNode.label);
};

const handleDragEnd = (draggingNode, dropNode, dropType, ev) => {
	// console.log('tree drag end:', dropNode && dropNode.label, dropType);
};

const handleDrop = (draggingNode, dropNode, dropType, ev) => {
	// console.log('tree drop:', dropNode.label, dropType);
	// console.log ('new data', tableData.value);
	fixData(tableData.value);
	needSave();
	isDraged.value = true;
	// console.log ('new data', tableData.value);
};

// 这个函数用来修复 tableData 的数据结构 
// 当拖动发生后, children 和 parent 之间的关系可能发生变化
// 所以需要重新遍历一遍数据, 重新建立 children 和 parent 之间的关系
const fixData = (data) => {
	data.forEach((item) => {
		if (!item.children) {
			item.children = [];
		} else {
			item.children.forEach((child) => {
				child.parentId = item.id;

				if (child.children) {
					delete child.children;
				}
			});
		}
	});
};

const getDepth = (node) => {
	let depth = 0;
	while (node && node.parent) {
		depth++;
		node = node.parent;
	}
	return depth;
};

const allowDrop = (draggingNode, dropNode, type) => {
	// 计算目标节点的深度
	const targetDepth0 = getDepth(draggingNode);
	const targetDepth1 = getDepth(dropNode);
	// console.log('targetDepth1', targetDepth1);
	// console.log('targetDepth0', targetDepth0);
	// console.log ('draggingNode', draggingNode);	
	// console.log ('dropNode', dropNode);
	// console.log ('type', type);
	// 当其本身是一个有孩子的父节点时, 禁止拖动加入其他节点
	if (draggingNode.childNodes && draggingNode.childNodes.length > 0 && (type === 'inner' || targetDepth1 >= 2)) {
		// console.log("has children");
		return false;
	}

	// 如果深度大于等于 2，则禁止内嵌拖动
	if (targetDepth1 >= 2 && type === 'inner') {
		return false;
	}

	return true;
};

const allowDrag = (draggingNode) => {
	return !draggingNode.data.label.includes('Level three 3-1-1');
};

///////////////////////////////////////////////////////////////// 批量删除分类
const getData = () => {
	return {
		firstClassCategory: [
			{
				id: 1,
				label: 'Category 1',
				order: 1,
				isShowable: true
			},
			{
				id: 2,
				label: 'Category 2',
				order: 2,
				isShowable: true
			},
			{
				id: 3,
				label: 'Category 3',
				order: 3,
				isShowable: true
			},
			{
				id: 4,
				label: 'Category 4',
				order: 4,
				isShowable: true
			}
		],
		secondClassCategory: [
			{
				id: 31,
				label: 'Subcategory 3-1',
				order: 1,
				parentId: 3,
				isShowable: true
			},
			{
				id: 32,
				label: 'Subcategory 3-2',
				order: 2,
				parentId: 3,
				isShowable: true
			}
		],
		firstClassLength: 4,
		secondClassLength: 2
	}
}

const handleData = (data) => {
	const firstClassCategory = data.firstClassCategory;
	const secondClassCategory = data.secondClassCategory;

	const categories = firstClassCategory.map((item) => {
		const children = secondClassCategory.filter((child) => child.parentId === item.id);
		return {
			...item,
			children
		};
	});

	console.log('categories', categories);
	return categories;
};

const tableData = ref('')
const rawData = getData();

tableData.value = handleData(rawData);

const isCheckable = ref(false);
const tree = ref(null);


const handleDeleteAll = () => {

	
	if (!isCheckable.value){
		isCheckable.value = !isCheckable.value;
		needSave();
	}
}

const getCheckedNodes = () => {
	return tree.value.getCheckedNodes();
};

///////////////////////////////////////////////////////////////// 编辑分类

const isEditable = ref(false)

const handleEditAll = () => {
	
	if (!isEditable.value){
		isEditable.value = !isEditable.value;
		needSave();
	}
}

///////////////////////////////////////////////////////////////// 保存更改

const isNeedSave = ref(false);
const needSave = () => {
	isNeedSave.value = true;
};
const noNeedSave = () => {
	isNeedSave.value = false;
};

const handleSaveALl = () => {

	// 编辑逻辑的保存
	if (isEditable.value) {
		// 这里是提交数据的地方
		isEditable.value = !isEditable.value;
		noNeedSave();
	}

	// 删除逻辑的保存
	if (isCheckable.value) {
		const checkedNodes = getCheckedNodes();
		popOut('warning', 'Are you sure you want to delete all selected categories?')  
		//  这里只是更改了table value的数据, 后面需要处理table value的数据
		//  应该在用户确认删除后 将更改后的table value数据格式化 提交给后端
		.then(() => {
			if (checkedNodes.length != 0) {
				tableData.value = tableData.value.filter((item) => !checkedNodes.includes(item));
				tableData.value.forEach((item) => {
					if (item.children)
						item.children = item.children.filter((child) => !checkedNodes.includes(child));
				});
				fixData(tableData.value);
				// 这里是提交数据的地方
				isCheckable.value = !isCheckable.value;
				noNeedSave();
				toast('success', 'Delete successfully');
			} else {
				toast('warning', 'There is no category selected', "warning");
				isCheckable.value = !isCheckable.value;
				noNeedSave();
			}
		});
	}

	// 新增逻辑的保存
	if (isAddable.value){
		// 这里是提交数据的地方
		toast('success', 'Add successfully');
		isAddable.value = false;
		noNeedSave();
	}

	// 开关逻辑的保存
	if (isSwitchChange.value){
		// 这里是提交数据的地方
		toast('success', 'Switch successfully');
		isSwitchChange.value = false;
		noNeedSave();
	}

	// 拖拽逻辑的保存
	if (isDraged.value){
		// 这里是提交数据的地方
		toast('success', 'Drag successfully');
		isDraged.value = false;
		noNeedSave();
	}
	
	
};

///////////////////////////////////////////////////////////////// 动态窗口大小
// 定义响应式高度
const h = ref(window.innerHeight - 64 - 44 - 40);

// 定义更新高度的函数
const updateHeight = () => {
	h.value = window.innerHeight - 64 - 44 - 40;
};

// 监听窗口调整大小事件
onMounted(() => {
	window.addEventListener('resize', updateHeight);
});

// 移除监听器，防止内存泄漏
onBeforeUnmount(() => {
	window.removeEventListener('resize', updateHeight);
});
///////////////////////////////////////////////////////////////// 设置开关状态

const isSwitchChange = ref(false);
// 当按下开关的时候 需要将子节点的开关状态也改变
// 如果是父节点, 需要将所有子节点的开关状态改变
const handleSwitchChange = (value, event) => {
	isSwitchChange.value = true;
	needSave();
	if (!value.parentId){
		// console.log ('father changed')
		tableData.value.forEach((item) => {
			if (item.children){
				// console.log ('children: ', item.children)
				item.children.forEach((child) => {
					if (child.parentId && child.parentId == value.id){
						child.isShowable = event;
					}
				});
			}
		});
	}
};


///////////////////////////////////////////////////////////////// 新增分类

const isAddable = ref(false);
const addDialogRef = ref(null);
const newCategory = ref({})
const handleAdd = () => {
	newCategory.value = {}
	addDialogRef.value.openDialog();
};

const handleAddCategory = () => {
	console.log('newCategory', newCategory.value);
	if (!newCategory.value.secondClass){
		toast('warning', 'You did not add any category!', "warning");
		addDialogRef.value.closeDialog();
		return;
	}
	
	if (!newCategory.value.firstClass && newCategory.value.firstClass == null){
		console.log ('type tabledata', tableData.value);
		tableData.value.push({
			id: rawData.firstClassLength + 1,
			label: newCategory.value.secondClass,
			order: rawData.firstClassLength + 1,
			isShowable: true,
			children: []
		})
		needSave();
		isAddable.value = true;
		addDialogRef.value.closeDialog();
		return;
	}

	const parent = tableData.value.find((item) => item.label == newCategory.value.firstClass)
	if (parent){
		parent.children.push({
			id: rawData.secondClassLength + 1,
			label: newCategory.value.secondClass,
			order: rawData.secondClassLength + 1,
			isShowable: true,
			parentId: parent.id
		})
		needSave();
		isAddable.value = true;
		addDialogRef.value.closeDialog();
		return;
	}
};

const handleCancelAdd = () => {
	addDialogRef.value.closeDialog();
};


</script>


<style scoped>
.category-header {
	border-bottom: 1px solid #eeeeee;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.context-menu {
	position: absolute;
	z-index: 1000;
	background: #ffffff;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	border-radius: 4px;
	padding: 8px;
}

.el-tree {
	--el-tree-node-content-height: 50px;
	--el-tree-node-hover-bg-color: rgba(156, 201, 255, 0.403);
	--el-tree-text-color: rgba(0, 0, 0, 0.65);
	--el-tree-expand-icon-color: #57a8ffa6;
	background: var(--el-fill-color-blank);
	color: var(--el-tree-text-color);
	cursor: default;
	font-size: var(--el-font-size-base);
	position: relative;

}

.category-input .el-input {
	--el-border-color: #fff !important;
}
</style>
