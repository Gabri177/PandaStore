<template>
	<el-container class="bg-white rounded" :style="{ height: h + 'px' }">
		<el-header class="category-header" style="height: 60px;">
			<div>
				<el-button type="primary" @click="handleAdd" :disabled="isSelectable">添加</el-button>
				<el-button type="warning" @click="handleAddAll" :disabled="isSelectable">批量添加</el-button>
				<el-button type="danger" @click="handleDeleteAll">{{ !isSelectable ? "批量删除" : "确认删除" }}</el-button>
			</div>
			<div>
				<el-button type="text" @click="handleDownloadFile">批量添加请点击这里, 下载Excel模板</el-button>
			</div>
			<div>
				<el-input v-model="input_search" style="width: 240px" placeholder="根据关键词搜索">
					<template #suffix>
						<el-icon class="el-input__icon">
							<search />
						</el-icon>
					</template>
				</el-input>
			</div>
		</el-header>
		<el-main style="overflow-y: auto;" class="w-full">

			<el-table :data="tableData" :style="{ height: h - 60 - 40 + 'px' }" v-loading="loading">

				<el-table-column type="selection" v-if="isSelectable" width="55" />
				<el-table-column label="商品头像" width="300">
					<template #default="{ row }">
						<div class="flex items-center">
							<div>
								<el-image class="mr-3 rounded" :src="row.avatar" style="width: 50px; height: 50px;"
									fit="cover" :lazy="true"></el-image>
							</div>
							<div class="flex-1">
								<p>{{ row.goodName }}</p>
								<div>
									<span class="text-rose-500">{{ row.unit }}{{ row.lowerPrice }}</span>
									<el-divider direction="vertical"></el-divider>
									<span class="text-gray-500 text-xs">{{ row.unit }}{{ row.upperPrice }}</span>
								</div>
								<p class="text-gray-400 text-xs mb-1">分类: {{ row.category ? row.category : "未分类" }}</p>
								<p class="text-gray-400 text-xs">创建时间: {{ row.createTime }}</p>
							</div>
						</div>
					</template>
				</el-table-column>

				<el-table-column prop="goodName" label="商品名称" />
				<el-table-column prop="state" label="上架状态">
					<template #default="{ row }">
						<el-tag v-if="row.state === 'onSale'" type="success">上架中</el-tag>
						<el-tag v-else type="danger">已下架</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="stock" label="库存余量" />
				<el-table-column label="操作" width="180">
					<template #default="{ row }">
						<el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
						<el-button type="text" size="small" @click="handleDelete(row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
		<el-footer style="height: 40px;" class="rounded flex justify-center items-center border-t">

			<div>
				<el-pagination background layout="prev, pager, next" :current-page="currentPageRef" :page-size="pageSizeRef"  :total="totalPageRef" @current-change="handleCurrentChange" @change="handleChange" />
			</div>
		</el-footer>


	</el-container>
	<ExcelUploader ref = "uploaderRef" @confirm="handleUpdateGoods"/>
</template>

<script setup>

import { ref, onMounted, onBeforeUnmount } from 'vue'
import ExcelUploader from '~/components/ExcelUploader.vue';

const input_search = ref('');
const loading = ref(false);
const currentPageRef = ref(1);
const pageSizeRef = ref(50);
const totalPageRef = ref(1000);
const uploaderRef = ref(null);
const isSelectable = ref(false);

///////////////////////////////////////////////////////////////// 批量删除

const handleDeleteAll = () => {
	if (!isSelectable.value) {
		console.log("Delete all goods");
		isSelectable.value = true;
	} else {
		console.log("Confirm delete all goods");
		isSelectable.value = false;
	}
	
};

///////////////////////////////////////////////////////////////// 批量添加

const handleAddAll = () => {
	uploaderRef.value.openUploadDialog();
};

const handleUpdateGoods = (data) => {
	uploaderRef.value.startLoading();
	console.log("Upload new goods: " ,data);
	setTimeout(() => {
		uploaderRef.value.stopLoading();
		uploaderRef.value.closeDisplayDialog();
	}, 2000);
};

///////////////////////////////////////////////////////////////// 分页

const handleCurrentChange = (val) => {
	console.log(val);
};

const handleChange = (currentPage, pageSize) => {
	console.log('change', currentPage, pageSize);
};

///////////////////////////////////////////////////////////////// 下载模板文件

const handleDownloadFile = () => {
	const fileName = "goods_modelo.xlsx"
	const filePath = `/public/${fileName}`

	const link = document.createElement("a")
	link.href = filePath
	link.download = fileName
	link.style.display = "none"
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
};

///////////////////////////////////////////////////////////////// 动态窗口大小
// 定义响应式高度
const h = ref(window.innerHeight - 64 - 44 - 40);

// 定义更新高度的函数
const upgoodNameHeight = () => {
	h.value = window.innerHeight - 64 - 44 - 40;
};

// 监听窗口调整大小事件
onMounted(() => {
	window.addEventListener('resize', upgoodNameHeight);
});

// 移除监听器，防止内存泄漏
onBeforeUnmount(() => {
	window.removeEventListener('resize', upgoodNameHeight);
});
///////////////////////////////////////////////////////////////// 拉取并展示商品列表

const tableData = [
	{
		avatar: "https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg",

		goodName: '商品1',
		state: 'onSale',
		stock: '10',
		unit: '$',
		lowerPrice: '100',
		upperPrice: '200',
		category: '分类1',
		createTime: '2021-10-10',
		editTime: '2021-10-10'
	},
	{
		avatar: "https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg",
		goodName: '商品2',
		state: 'onSale',
		stock: '20',
		unit: '$',
		lowerPrice: '200',
		upperPrice: '300',
		category: '分类2',
		createTime: '2021-10-10',
		editTime: '2021-10-10'
	},
	{
		avatar: "https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg",

		goodName: '商品3',
		state: 'notOnSale',
		stock: '30',
		unit: '$',
		lowerPrice: '300',
		upperPrice: '400',
		category: '分类3',
		createTime: '2021-10-10',
		editTime: '2021-10-10'


	},
	{
		avatar: "https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg",

		goodName: '商品4',
		state: 'notOnSale',
		stock: '40',
		unit: '$',
		lowerPrice: '400',
		upperPrice: '500',
		category: '分类4',
		createTime: '2021-10-10',
		editTime: '2021-10-10'

	}
]



</script>


<style>
.category-header {
	border-bottom: 1px solid #eeeeee;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.el-pagination {
	--el-pagination-button-bg-color: #fff !important;
}

</style>