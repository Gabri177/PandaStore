<template>
	<div>
		<el-row :gutter="20" v-permission="['getStatistics1,GET']">
			<template v-if="panels.length == 0">
				<el-col :xs="6" :sm="6" :md="6" :lg="6" :offset="0" :span="6" v-for="i in 4" :key="i">
					<el-skeleton style="width: 100%" animated loading>
						<template #template>
							<el-card shadow="hover" class="border-0">
								<template #header>

									<div class="flex justify-between">
										<el-skeleton-item variant="text" style="width: 50%" />
										<el-skeleton-item variant="text" style="width: 10%" />
									</div>
								</template>
								<el-skeleton-item variant="h3" style="width: 80%" />
								<el-divider />
								<div class="flex justify-between text-sm text-gray-500">
									<el-skeleton-item variant="text" style="width: 50%" />
									<el-skeleton-item variant="text" style="width: 10%" />
								</div>
							</el-card>
						</template>
					</el-skeleton>
				</el-col>
			</template>

			<el-col :xs="24" :sm="12" :md="8" :lg="6" :offset="0" :span="6"  v-for="(item, index) in panels" :key="index">
				<el-card shadow="hover" class="border-0">
					<template #header>

						<div class="flex justify-between">
							<span class="text-sm">
								{{ $t(item.title) }}
							</span>
							<el-tag :type="item.unitColor" effect="plain">
								{{ $t(item.unit) }}
							</el-tag>
						</div>
					</template>
					<span class="text-3xl font-bold text-gray-500">
						<CountTo :value="item.value" />
					</span>
					<el-divider />
					<div class="flex justify-between text-sm text-gray-500">
						<span>
							{{ $t(item.subTitle) }}
						</span>
						<span>
							{{ item.subValue }}
						</span>
					</div>
				</el-card>

			</el-col>
		</el-row>


		<IndexNavs />

		<el-row :gutter="20" class="mt-5">
			<el-col :xs="24" :sm="12" :md="16" :lg="16" :span="12" :offset="0">
				<IndexChart v-permission="['getStatistics3,GET']" />
			</el-col>
			<el-col :xs="24" :sm="12" :md="8" :lg="8" :span="12"  :offset="0" v-permission="['getStatistics2,GET']">
				<IndexCard class="mb-3" title="店铺信息" tip="店铺及商品信息" :btns="goods" />
				<IndexCard title="交易提示" tip="需要立即处理的订单" :btns="order" />
			</el-col>
		</el-row>
	</div>
</template>

<script setup>
import { getStatistics1, getStatistics2 } from '~/api/index.js'
import { ref } from 'vue'
import CountTo from '~/components/CountTo.vue'
import IndexNavs from '~/components/IndexNavs.vue'
import IndexChart from '~/components/IndexChart.vue'
import IndexCard from '../components/IndexCard.vue'

const panels = ref([])

//模拟等待数据
setTimeout(() => {
	getStatistics1()
		.then(res => {
			panels.value = res.panels
			// console.log('index data',panels.value)
		})
}, 1000);

const goods = ref([])
const order = ref([])
//模拟等待数据
setTimeout(() => {
	getStatistics2()
		.then(res => {
			goods.value = res.goods
			order.value = res.order
			// console.log('goods', goods.value)
			// console.log('order', order.value)
		})
}, 1000);

</script>
