<template>
	<el-row :gutter="20" class="mt-5">
		<el-col :xs="24" :sm="12" :md="8" :lg="3" :span="3" :offset="0" v-for="(item, index) in iconNavs" :key="index">
			<el-card shadow="hover" @click="$router.push(item.path)">
				<div class="flex items-center justify-center cursor-pointer flex-col"> 
					<el-icon :size="25" :class="item.color">
						<component :is="item.icon"></component>
					</el-icon>
					<span class="text-sm mt-2">{{ $t(item.title) }}</span>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>

<script setup>

const iconNavs = [
	{
		icon: 'user',
		title: '用户',
		color: 'text-light-blue-500',
		path: '/user/list',
	},
	{
		icon: 'shopping-cart',
		title: '商品',
		color: 'text-violet-500',
		path: '/goods/list'
	},
	{
		icon: 'tickets',
		title: '订单',
		color: 'text-fuchsia-500',
		path: '/order/list'
	},
	{
		icon: 'chat-dot-square',
		title: '评价',
		color: 'text-teal-500',
		path: '/comment/list'
	},
	{
		icon: 'picture',
		title: '图库',
		color: 'text-rose-500',
		path: '/image/list'
	},
	{
		icon: 'bell',
		title: '公告',
		color: 'text-green-500',
		path: '/notice/list'
	},
	{
		icon: 'set-up',
		title: '设置',
		color: 'text-grap-500',
		path: '/setting/base'
	},
	{
		icon: 'files',
		title: '优惠券',
		color: 'text-yellow-500',
		path: '/coupon/list'
	}
]



</script>