<template>
	<div class="p-4">
		<el-dialog v-model="isUploadDialogVisible" class="mb-4">
			<div class="text-lg font-bold mb-4">Excel 文件上传</div>
			<el-upload action="#" :auto-upload="false" :on-change="handleFileChange" :on-preview="handleOnPreview" drag>
				<div class="el-upload__text">将文件拖到此处，或点击上传</div>
			</el-upload>
		</el-dialog>
		<el-dialog v-model="isDisplayDialogVisible" :width="900">
			<div class="text-lg font-bold mb-4">待添加商品</div>
			<el-table :data="parsedData" style="width: 100%; height: 500px">
				<el-table-column label="名称" :show-overflow-tooltip="true" fit>
					<template #default="{ row }">

						<div class="flex flex-col items-start justify-between">
							<p class="font-bold text-2xl">
								{{ row.name || "未知商品" }}
							</p>
							<div>
								<p class="info_text_font">货号: {{ row.code || "未知货号" }}</p>
								<p class="info_text_font">货位: {{ row.location || "未知货位" }}</p>
								<p class="info_text_font">编码: {{ row.barcode || "未知编码" }}</p>
							</div>
						</div>
					</template>
				</el-table-column>

				<el-table-column label="价格区间">
					<template #default="{ row }">
						<div class="flex flex-col justify-center items-start">
							<el-tag type="primary" class="mb-1 font-bold">
								{{ row.lowestPrice ? formatNumber(row.lowestPrice) : "未知最低价" }}€ x {{ row.lowestPriceDiscount }}%</el-tag>
							<el-tag type="success" class="mb-1 font-bold">
								{{ row.middlePrice1 ? formatNumber(row.middlePrice1) : "未知中间价" }}€ x {{ row.middlePrice1Discount }}%</el-tag>
							<el-tag type="warning" class="mb-1 font-bold">
								{{ row.middlePrice2 ? formatNumber(row.middlePrice2) : "未知中间价" }}€ x {{ row.middlePrice2Discount }}%</el-tag>
							<el-tag type="danger" class="font-bold">
								{{ row.highestPrice ? formatNumber(row.highestPrice) : "未知最高价" }}€ x {{ row.highestPriceDiscount }}%</el-tag>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="销售单位">
					<template #default="{ row }">
						<el-tag type="info" class="font-bold text-xl">{{ row.saleUnit || "未知销售单位" }}</el-tag>
						
					</template>
				</el-table-column>
				<el-table-column label="最小购买单位">
					<template #default="{ row }">
						{{ row.minPurchaseUnit || "未知最小购买单位" }}
					</template>
				</el-table-column>
				<el-table-column label="分类">
					<template #default="{ row }">
						{{ row.category || "未知分类" }}
					</template>
				</el-table-column>
				<el-table-column label="库存">
					<template #default="{ row }">
						{{ row.stock || "未知库存" }}
					</template>
				</el-table-column>
			</el-table>

			<template #footer>
				<div class="dialog-footer">
					<el-button @click="isDisplayDialogVisible = false">取消添加</el-button>
					<el-button type="primary" @click="handleUpdateConfirm" :loading="displayLoading">
						添加商品
					</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import { ref, computed } from "vue";
import * as XLSX from "xlsx";
import { toast } from "~/composables/util"
const parsedData = ref([]);
const isDisplayDialogVisible = ref(false);
const isUploadDialogVisible = ref(false);
const displayLoading = ref(false);

const emit = defineEmits(["confirm"]);


const handleUpdateConfirm = () => {
	emit("confirm", parsedData.value);
}


const openUploadDialog = () => {
	isUploadDialogVisible.value = true;
}

const closeDisplayDialog = () => {
	isDisplayDialogVisible.value = false;
}

const startLoading = () => {
	displayLoading.value = true;
}

const stopLoading = () => {
	displayLoading.value = false;
}

const standardHeader = {
	"名称": "name",
	"货号": "code",
	"货位": "location",
	"编码": "barcode",
	"最低价格": "lowestPrice",
	"中间价1": "middlePrice1",
	"中间价2": "middlePrice2",
	"最高价格": "highestPrice",
	"最低价折扣": "lowestPriceDiscount",
	"中间价1折扣": "middlePrice1Discount",
	"中间价2折扣": "middlePrice2Discount",
	"最高价折扣": "highestPriceDiscount",
	"销售单位": "saleUnit",
	"最小购买单位": "minPurchaseUnit",
	"分类": "category",
	"库存": "stock"
}
const headers = [
	"名称",
	"货号",
	"货位",
	"编码",
	"最低价格",
	"中间价1",
	"中间价2",
	"最高价格",
	"最低价折扣",
	"中间价1折扣",
	"中间价2折扣",
	"最高价折扣",
	"销售单位",
	"最小购买单位",
	"分类",
	"库存",
];

const handleOnPreview = (file) => {
	handleBeforeUpload(file.raw); // 手动调用 beforeUpload 逻辑
};

const handleFileChange = (file) => {
	console.log("文件变化触发：", file);
	console.log("文件类型：", Object.prototype.toString.call(file));
	handleBeforeUpload(file.raw); // 手动调用 beforeUpload 逻辑
};

const handleBeforeUpload = (file) => {
	const reader = new FileReader();
	reader.onload = (e) => {
		console.log(e);
		const data = new Uint8Array(e.target.result);
		const workbook = XLSX.read(data, { type: "array" });
		const firstSheetName = workbook.SheetNames[0];
		const worksheet = workbook.Sheets[firstSheetName];
		const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
		// 提取表头并验证
		const fileHeaders = jsonData[0];
		if (JSON.stringify(fileHeaders) !== JSON.stringify(headers)) {
			toast("错误", "表头不匹配，请检查文件格式", "error");
			return;
		}
		console.log("提取到的数据: ", jsonData);

		// 解析数据
		const rows = jsonData.slice(1)
			.map((row) =>
			headers.reduce((acc, header, index) => {
				acc[standardHeader[header]] = row[index] || null;
				return acc;
			}, {}))
			.filter(row => Object.values(row).some(value => value !== null && value !== ""));
		//更新响应式数据		
		parsedData.value = rows;
		// 显示数据展示对话框
		isDisplayDialogVisible.value = true;
		console.log(parsedData.value);
	};
	reader.readAsArrayBuffer(file);
	return false; // 阻止默认上传行为
}


const formatNumber = (value) => {
	if (value == null || isNaN(value)) {
		return "0.000";
	}
	return Number(value).toFixed(3);
}

defineExpose({
	openUploadDialog,
	closeDisplayDialog,
	startLoading,
	stopLoading
});

</script>

<style scoped>
.info_text_font {

	@apply text-xs text-gray-400 italic;
}
</style>