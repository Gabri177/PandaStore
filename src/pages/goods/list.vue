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

			<el-table ref="tableRef" :data="tableData" :style="{ height: h - 60 - 40 + 'px' }" v-loading="loading"
				@selection-change="handleSelectionChange">

				<el-table-column type="selection" v-if="isSelectable" width="55" />
				<el-table-column label="商品详情" width="250"  header-align="center" >
					<template #default="{ row }">
						<div class="flex items-center">
							<div>
								<el-image class="mr-3 rounded" :src="row.avatar" style="width: 50px; height: 50px;"
									fit="cover" :lazy="true"></el-image>
							</div>
							<div class="flex-1">
								<p>{{ row.name }}</p>
								<div>
									<span class="text-rose-500">{{ row.saleUnit }}{{ row.lowestPrice }}</span>
									<el-divider direction="vertical"></el-divider>
									<span class="text-gray-500 text-xs">{{ row.saleUnit }}{{ row.highestPrice }}</span>
								</div>
								<p class="text-gray-400 text-xs mb-1">分类: {{ row.category ? row.category : "未分类" }}</p>
								<p class="text-gray-400 text-xs">创建时间: {{ row.createTime }}</p>
							</div>
						</div>
					</template>
				</el-table-column>

				<el-table-column prop="sales" label="商品销量"  header-align="center" align="center"/>
				<el-table-column prop="state" label="上架状态"  header-align="center" align="center">
					<template #default="{ row }">
						<el-switch v-model="row.state" class="ml-2" inline-prompt
							style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" active-text="上架中"
							inactive-text="已下架" active-value="onSale" inactive-value="notOnSale" @change="handleSwitchChange(row, $event)"/>
						<!-- <el-tag v-if="row.state === 'onSale'" type="success">上架中</el-tag>
						<el-tag v-else type="danger">已下架</el-tag> -->
					</template>
				</el-table-column>
				<el-table-column prop="stock" label="库存余量"  header-align="center"  align="center"/>
				<el-table-column label="操作" width="250"  header-align="center" align="center">
					<template #default="{ row }">
						<el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
						<el-button type="text" size="small" @click="handleEditGraphs(row)">设置轮播图</el-button>
						<el-button type="text" size="small" @click="handleDelete(row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
		<el-footer style="height: 40px;" class="rounded flex justify-center items-center border-t">

			<div>
				<el-pagination background layout="prev, pager, next" :current-page="currentPageRef"
					:page-size="pageSizeRef" :total="totalPageRef" @current-change="handleCurrentChange"
					@change="handleChange" />
			</div>
		</el-footer>


	</el-container>
	<ExcelUploader ref="uploaderRef" @confirm="handleUpdateGoods" />
	<FormDrawer ref="formDrawerRef" formTitle="添加商品" :withHeader="true" :destroyOnClose="true" formSize="60%"
		@submit="handleSubmit">

		<el-form :model="formData" :rules="rules" ref="formRef" label-width="120px" class="p-4">
			<el-form-item label="名称" prop="name">
				<el-input v-model="formData.name" placeholder="请输入名称"></el-input>
			</el-form-item>

			<el-form-item label="货号" prop="code">
				<el-input v-model="formData.code" placeholder="请输入货号"></el-input>
			</el-form-item>

			<el-form-item label="编码" prop="barcode">
				<el-input v-model="formData.barcode" placeholder="请输入编码"></el-input>
			</el-form-item>



			<div class="flex w-full justify-between">
				<el-form-item label="最低价" prop="lowestPrice">
					<el-input-number v-model="formData.lowestPrice" :precision="3" :min="0"
						placeholder="请输入最低价"></el-input-number>
				</el-form-item>

				<el-form-item label="最低价折扣" prop="lowestPriceDiscount">
					<el-input v-model="formData.lowestPriceDiscount" placeholder="请输入最低价折扣"></el-input>
				</el-form-item>
			</div>
			<div class="flex w-full justify-between">
				<el-form-item label="中间价1" prop="middlePrice1">
					<el-input-number v-model="formData.middlePrice1" :precision="3" :min="0"
						placeholder="请输入中间价1"></el-input-number>
				</el-form-item>

				<el-form-item label="中间价1折扣" prop="middlePrice1Discount">
					<el-input v-model="formData.middlePrice1Discount" placeholder="请输入中间价1折扣"></el-input>
				</el-form-item>
			</div>
			<div class="flex w-full justify-between">
				<el-form-item label="中间价2" prop="middlePrice2">
					<el-input-number v-model="formData.middlePrice2" :precision="3" :min="0"
						placeholder="请输入中间价2"></el-input-number>
				</el-form-item>

				<el-form-item label="中间价2折扣" prop="middlePrice2Discount">
					<el-input v-model="formData.middlePrice2Discount" placeholder="请输入中间价2折扣"></el-input>
				</el-form-item>
			</div>
			<div class="flex w-full justify-between">
				<el-form-item label="最高价" prop="highestPrice">
					<el-input-number v-model="formData.highestPrice" :precision="3" :min="0"
						placeholder="请输入最高价"></el-input-number>
				</el-form-item>

				<el-form-item label="最高价折扣" prop="highestPriceDiscount">
					<el-input v-model="formData.highestPriceDiscount" placeholder="请输入最高价折扣"></el-input>
				</el-form-item>
			</div>

			<el-form-item label="销售单位" prop="saleUnit">
				<el-select v-model="formData.saleUnit" placeholder="请选择销售单位">
					<el-option v-for="unit in units" :key="unit.value" :label="unit.label"
						:value="unit.value"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="最小购买单位" prop="minUnit">
				<el-select v-model="formData.minUnit" placeholder="请选择最小购买单位">
					<el-option v-for="unit in units" :key="unit.value" :label="unit.label"
						:value="unit.value"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="分类" prop="category">
				<el-tree-select check-strictly v-model="formData.category" :data="categories"
					:render-after-expand="false" />

			</el-form-item>

			<el-form-item label="货位" prop="location">
				<el-input v-model="formData.location" placeholder="请填写货位"></el-input>
			</el-form-item>

			<el-form-item label="库存" prop="stock">
				<el-input-number v-model="formData.stock" :min="0" placeholder="请输入库存"></el-input-number>
			</el-form-item>

			<el-form-item label="变体代码" prop="variantCode">
				<el-input v-model="formData.variantCode" placeholder="请输入变体代码"></el-input>
			</el-form-item>

			<el-form-item label="变体名称" prop="variantName">
				<el-input v-model="formData.variantName" placeholder="请输入变体名称"></el-input>
			</el-form-item>
		</el-form>

	</FormDrawer>
	<ImageMain ref="imageMainRef" />
</template>

<script setup>

import { ref, onMounted, onBeforeUnmount } from 'vue'
import ExcelUploader from '~/components/ExcelUploader.vue';
import FormDrawer from '../../components/FormDrawer.vue';
import { getAllCategory } from '~/api/category';
import { handleCategoryData, toast, popOut } from '~/composables/util';
import ImageMain from '~/components/ImageMain.vue';

const input_search = ref('');
const loading = ref(false);
const currentPageRef = ref(1);
const pageSizeRef = ref(50);
const totalPageRef = ref(1000);
const uploaderRef = ref(null);
const isSelectable = ref(false);
const tableRef = ref(null);
const formDrawerRef = ref(null);
let selectedGoodsIds = [];
const formRef = ref(null);
const categories = ref([]);
const imageMainRef = ref(null);

const formData = ref({
	name: '',
	state: '',
	code: '',
	barcode: '',
	location: '',
	lowestPrice: '',
	middlePrice1: '',
	middlePrice2: '',
	highestPrice: '',
	lowestPriceDiscount: '',
	middlePrice1Discount: '',
	middlePrice2Discount: '',
	highestPriceDiscount: '',
	saleUnit: '',
	minPurchaseUnit: '',
	category: '',
	stock: 0,
	variantCode: '',
	variantName: '',
});

///////////////////////////////////////////////////////////////// 切换上架状态

const handleSwitchChange = (rowInfo, val) => {
	console.log("Switch change: ",rowInfo,  val);
};

///////////////////////////////////////////////////////////////// 添加商品

const handleAdd = () => {
	console.log("Add goods");
	formDrawerRef.value.open();
};

const rules = {
	code: [{ max: 40, message: '货号长度不能超过40个字符' }],
	barcode: [
		{ required: true, message: '编码为必填项' },
		{ max: 40, message: '编码长度不能超过40个字符' },
	],
	name: [
		{ required: true, message: '名称为必填项' },
		{ max: 100, message: '名称长度不能超过100个字符' },
	],
	lowestPrice: [{ required: true, message: '价格为必填项' }],
	middlePrice1: [{ required: true, message: '价格为必填项' }],
	middlePrice2: [{ required: true, message: '价格为必填项' }],
	highestPrice: [{ required: true, message: '价格为必填项' }],
	stock: [{ required: true, message: '库存为必填项' }],
};

const units = [
	{ value: 'Unidad', label: '个/Unidad' },
	{ value: 'Paquete', label: '包/Paquete' },
	{ value: 'Caja', label: '箱/Caja' },
	{ value: 'Palet', label: '板/Palet' },
];

getAllCategory()
	.then((res) => {
		categories.value = handleCategoryData(res);
	})
	.catch((err) => {
		console.error(err);
	});

const handleSubmit = () => {
	formRef.value.validate((valid) => {
		if (valid) {
			console.log('提交表单数据：', formData.value);
			formDrawerRef.value.close();
		} else {
			console.error('表单验证失败');
		}
	});
};

///////////////////////////////////////////////////////////////// 删除商品

const handleDelete = (row) => {
	
	popOut("删除商品", "确认删除商品吗？")
		.then(() => {
			toast("删除成功", "success");
			console.log("Delete goods: ", row);
		})
		.catch(() => {
			toast("取消删除", "info");
			console.log("Cancel delete goods");
		});
};

///////////////////////////////////////////////////////////////// 编辑商品

const handleEdit = (row) => {
	formDrawerRef.value.open();
	formData.value = { ...row };
	console.log("Edit goods: ", row);
};

///////////////////////////////////////////////////////////////// 批量删除

const handleDeleteAll = () => {
	if (!isSelectable.value) {
		//当点击批量删除 进入选择状态
		console.log("Delete all goods");
		isSelectable.value = true;
	} else {
		//当点击确认删除 进行删除操作
		popOut("删除商品", "确认删除选中的商品吗？")
			.then(() => {
				toast("删除成功", "success");
				console.log("Selected goods ids: ", selectedGoodsIds);
				console.log("Confirm delete all goods");
				
			})
			.catch(() => {
				toast("取消删除", "info");
				console.log("Cancel delete all goods");
			})
			.finally(() => {
				isSelectable.value = false;
				clearTableSelection();
			});
		

	}

};

const handleSelectionChange = (val) => {
	console.log("handle Selection changed: ", val);
	selectedGoodsIds = val.map(item => item.id);
};

const clearTableSelection = () => {
	tableRef.value.clearSelection();
};

///////////////////////////////////////////////////////////////// 批量添加

const handleAddAll = () => {
	uploaderRef.value.openUploadDialog();
};

const handleUpdateGoods = (data) => {
	uploaderRef.value.startLoading();
	console.log("Upload new goods: ", data);
	setTimeout(() => {
		uploaderRef.value.stopLoading();
		uploaderRef.value.closeDisplayDialog();
		toast("上传成功", "success");
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
	//const filePath = `/public/${fileName}`
	const filePath = "https://github.com/Gabri177/PandaStore/raw/refs/heads/main/public/goods_modelo.xlsx"

	console.log("Download file: ", filePath);
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
		id: 1,
		avatar: "https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg",
		name: '商品1',
		code: 'xxxxx',
		barcode: 'xxxxx',
		location: 'xxxxx',
		state: 'onSale',
		lowestPrice: '100',
		middlePrice1: '150',
		middlePrice2: '200',
		highestPrice: '200',
		lowestPriceDiscount: '0.8',
		middlePrice1Discount: '0.7',
		middlePrice2Discount: '0.6',
		highestPriceDiscount: '0.5',
		saleUnit: '$',
		minPurchaseUnit: 'Unidad',
		category: '分类1',
		stock: '10',
		variantCode: 'xxxxx',
		variantName: 'xxxxx',
		createTime: '2021-10-10',
		editTime: '2021-10-10',
		sales: '100'
	},
	{
		id: 2,
		avatar: "https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg",
		name: '商品2',
		code: 'xxxxx',
		barcode: 'xxxxx',
		location: 'xxxxx',
		state: 'onSale',
		lowestPrice: '200',
		middlePrice1: '250',
		middlePrice2: '300',
		highestPrice: '300',
		lowestPriceDiscount: '0.8',
		middlePrice1Discount: '0.7',
		middlePrice2Discount: '0.6',
		highestPriceDiscount: '0.5',
		saleUnit: '$',
		minPurchaseUnit: 'Unidad',
		category: '分类2',
		stock: '20',
		variantCode: 'xxxxx',
		variantName: 'xxxxx',
		createTime: '2021-10-10',
		editTime: '2021-10-10',
		sales: '200'
	},
	{
		id: 3,
		avatar: "https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg",
		name: '商品3',
		code: 'xxxxx',
		barcode: 'xxxxx',
		location: 'xxxxx',
		state: 'notOnSale',
		lowestPrice: '300',
		middlePrice1: '350',
		middlePrice2: '400',
		highestPrice: '400',
		lowestPriceDiscount: '0.8',
		middlePrice1Discount: '0.7',
		middlePrice2Discount: '0.6',
		highestPriceDiscount: '0.5',
		saleUnit: '$',
		minPurchaseUnit: 'Unidad',
		category: '分类3',
		stock: '30',
		variantCode: 'xxxxx',
		variantName: 'xxxxx',
		createTime: '2021-10-10',
		editTime: '2021-10-10',
		sales: '300'


	},
	{
		id: 4,
		avatar: "https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg",
		name: '商品4',
		code: 'xxxxx',
		barcode: 'xxxxx',
		location: 'xxxxx',
		state: 'notOnSale',
		lowestPrice: '400',
		middlePrice1: '450',
		middlePrice2: '500',
		highestPrice: '500',
		lowestPriceDiscount: '0.8',
		middlePrice1Discount: '0.7',
		middlePrice2Discount: '0.6',
		highestPriceDiscount: '0.5',
		saleUnit: '$',
		minPurchaseUnit: 'Unidad',
		category: '分类4',
		stock: '40',
		variantCode: 'xxxxx',
		variantName: 'xxxxx',
		createTime: '2021-10-10',
		editTime: '2021-10-10',
		sales: '400'

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