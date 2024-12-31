<template>
	<el-card shadow="never">
		<template #header>
			<div class="flex justify-between items-center">
				<span class="text-sm font-bold">{{ $t('订单统计') }}</span>
				<div>
					<el-check-tag 
					:checked = "current === item.value"
					style="margin-right: 8px;"
					v-for="(item, index) in options"
					:key="index"
					@click="handleClick(item.value)"
					>
						{{ $t(item.label) }}
					</el-check-tag>
				</div>
			</div>
		</template>
		<div ref="el" id="chart" style="height: 300px; width: 100%;">

		</div>
	</el-card>
</template>

<script setup>

import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getStatistics3 } from '~/api/index.js'
import { useResizeObserver } from '@vueuse/core';
import * as echarts from 'echarts';

const current = ref('week')

const options = [
	{
		label: '近一天',
		value: 'hour' //这里对应api的参数名
	},
	{
		label: '近一周',
		value: 'week' //这里对应api的参数名
	},
	{
		label: '近一月',
		value: 'month' //这里对应api的参数名
	}
]

const handleClick = (value) => {
	current.value = value
	getData()
}



var myChart = null;

onMounted(() => {
	var chartDom = document.getElementById('chart');
	myChart = echarts.init(chartDom);
	getData()
	})

function getData() {
	let option = {
		xAxis: {
			type: 'category',
			data: []
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
			data: [],
			type: 'bar'
			}
		]
	};

	myChart.showLoading();
	//模拟等待数据
	setTimeout(() => {
		getStatistics3(current.value)
		.then(res => {
			option.xAxis.data = res.x
			option.series[0].data = res.y
			myChart.setOption(option);
		})
		.finally(() => {
			myChart.hideLoading();
		})
	}, 1000);

}

onBeforeUnmount(() => {
	if (myChart) {
		echarts.dispose(myChart)
	}
})

const el = ref(null)
useResizeObserver(el, (entires) => {
	
	myChart.resize()
})

</script>