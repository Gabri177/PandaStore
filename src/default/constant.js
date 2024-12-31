export const defaultAsideMenu =  [
	{
		"id": 5,
		"rule_id": 0,
		"status": 1,
		"create_time": "XXXXXXXXXX",
		"update_time": "XXXXXXXXXX",
		"name": "后台面板",
		"desc": "index",
		"frontpath": null, 
		"condition": null,
		"menu": 1,
		"order": 1,
		"icon": "help",
		"method": "GET",
		"child": [
			{
				"id": 10,
				"rule_id": 5,
				"status": 1,
				"create_time": "XXXXXXXXXX",
				"update_time": "XXXXXXXXXX",
				"name": "主控台",
				"desc": "index",
				"frontpath": "/",
				"condition": null,
				"menu": 1,
				"order": 20,
				"icon": "home-filled",
				"method": "GET",
				"child": []
			}
		]
	},
	{
		"id": 6,
		"rule_id": 0,
		"status": 1,
		"create_time": "XXXXXXXXXX",
		"update_time": "XXXXXXXXXX",
		"name": "商品管理",
		"desc": "shop_goods_list",
		"frontpath": null,
		"condition": null,
		"menu": 1,
		"order": 2,
		"icon": "shopping-bag",
		"method": "GET",
		"child": [
			{
				"id": 13,
				"rule_id": 6,
				"status": 1,
				"create_time": "XXXXXXXXXX",
				"update_time": "XXXXXXXXXX",
				"name": "商品管理",
				"desc": "shop_goods_list",
				"frontpath": "/goods/list",
				"condition": "",
				"menu": 1,
				"order": 20,
				"icon": "shopping-cart-full",
				"method": "GET",
				"child": []
			},
			{
				"id": 14,
				"rule_id": 6,
				"status": 1,
				"create_time": "XXXXXXXXXX",
				"update_time": "XXXXXXXXXX",
				"name": "分类管理",
				"desc": "shop_category_list",
				"frontpath": "/category/list",
				"condition": "",
				"menu": 1,
				"order": 20,
				"icon": "menu",
				"method": "GET",
				"child": []
			},
			{
				"id": 15,
				"rule_id": 6,
				"status": 1,
				"create_time": "XXXXXXXXXX",
				"update_time": "XXXXXXXXXX",
				"name": "规格管理",
				"desc": "shop_sku_list",
				"frontpath": "/skus/list",
				"condition": "",
				"menu": 1,
				"order": 20,
				"icon": "aim",
				"method": "GET",
				"child": []
			},
			{
				"id": 157,
				"rule_id": 6,
				"status": 1,
				"create_time": "XXXXXXXXXX",
				"update_time": "XXXXXXXXXX",
				"name": "优惠券管理",
				"desc": "shop_coupon_list",
				"frontpath": "/coupon/list",
				"condition": "",
				"menu": 1,
				"order": 50,
				"icon": "postcard",
				"method": "GET",
				"child": []
			}
		]
	},
	{
		"id": 173,
		"rule_id": 0,
		"status": 1,
		"create_time": "XXXXXXXXXX",
		"update_time": "XXXXXXXXXX",
		"name": "用户管理",
		"desc": "",
		"frontpath": "",
		"condition": "",
		"menu": 1,
		"order": 3,
		"icon": "user",
		"method": "GET",
		"child": [
			{
				"id": 21,
				"rule_id": 173,
				"status": 1,
				"create_time": "XXXXXXXXXX",
				"update_time": "XXXXXXXXXX",
				"name": "用户管理",
				"desc": "user_user-list_list",
				"frontpath": "/user/list",
				"condition": "",
				"menu": 1,
				"order": 20,
				"icon": "user-filled",
				"method": "GET",
				"child": []
			},
			{
				"id": 22,
				"rule_id": 173,
				"status": 1,
				"create_time": "XXXXXXXXXX",
				"update_time": "XXXXXXXXXX",
				"name": "会员等级",
				"desc": "user_user-level_list",
				"frontpath": "/level/list",
				"condition": "",
				"menu": 1,
				"order": 20,
				"icon": "data-analysis",
				"method": "GET",
				"child": []
			}
		]
	},
	{
		"id": 7,
		"rule_id": 0,
		"status": 1,
		"create_time": "xxxxxxxxxxx",
		"update_time": "xxxxxxxxxxx",
		"name": "订单管理",
		"desc": "order_order_list",
		"frontpath": null,
		"condition": null,
		"menu": 1,
		"order": 4,
		"icon": "message-box",
		"method": "GET",
		"child": [
			{
				"id": 18,
				"rule_id": 7,
				"status": 1,
				"create_time": "xxxxxxxxxxx",
				"update_time": "xxxxxxxxxxx",
				"name": "订单管理",
				"desc": "order_order_list",
				"frontpath": "/order/list",
				"condition": "",
				"menu": 1,
				"order": 1,
				"icon": "reading",
				"method": "GET",
				"child": []
			},
			{
				"id": 17,
				"rule_id": 7,
				"status": 1,
				"create_time": "XXXXXXXXXX",
				"update_time": "XXXXXXXXXX",
				"name": "评论管理",
				"desc": "shop_comment_list",
				"frontpath": "/comment/list",
				"condition": "",
				"menu": 1,
				"order": 20,
				"icon": "comment",
				"method": "GET",
				"child": []
			}
		]
	},
	{
		"id": 8,
		"rule_id": 0,
		"status": 1,
		"create_time":"XXXXXXXXXX",
		"update_time": "XXXXXXXXXX",
		"name": "管理员管理",
		"desc": "user_user-list_list",
		"frontpath": null,
		"condition": null,
		"menu": 1,
		"order": 5,
		"icon": "management",
		"method": "GET",
		"child": [
			{
				"id": 25,
				"rule_id": 8,
				"status": 1,
				"create_time": "XXXXXXXXXX",
				"update_time": "XXXXXXXXXX",
				"name": "管理员管理",
				"desc": "set_manager",
				"frontpath": "/manager/list",
				"condition": "",
				"menu": 1,
				"order": 20,
				"icon": "coordinate",
				"method": "GET",
				"child": []
			},
			{
				"id": 27,
				"rule_id": 8,
				"status": 1,
				"create_time": "XXXXXXXXXX",
				"update_time": "XXXXXXXXXX",
				"name": "权限管理",
				"desc": "",
				"frontpath": "/access/list",
				"condition": "",
				"menu": 1,
				"order": 20,
				"icon": "connection",
				"method": "GET",
				"child": []
			},
			{
				"id": 33,
				"rule_id": 8,
				"status": 1,
				"create_time": "XXXXXXXXXX",
				"update_time": "XXXXXXXXXX",
				"name": "角色管理",
				"desc": "",
				"frontpath": "/role/list",
				"condition": "",
				"menu": 1,
				"order": 20,
				"icon": "histogram",
				"method": "GET",
				"child": []
			}
		]
	},
	{
		"id": 9,
		"rule_id": 0,
		"status": 1,
		"create_time": "XXXXXXXXXX",
		"update_time": "XXXXXXXXXX",
		"name": "系统设置",
		"desc": "set_base",
		"frontpath": null,
		"condition": null,
		"menu": 1,
		"order": 6,
		"icon": "setting",
		"method": "GET",
		"child": [
			{
				"id": 23,
				"rule_id": 9,
				"status": 1,
				"create_time": "XXXXXXXXXX",
				"update_time": "XXXXXXXXXX",
				"name": "基础设置",
				"desc": "set_base",
				"frontpath": "/setting/base",
				"condition": "",
				"menu": 1,
				"order": 19,
				"icon": "baseball",
				"method": "GET",
				"child": []
			},
			{
				"id": 26,
				"rule_id": 9,
				"status": 1,
				"create_time": "XXXXXXXXXX",
				"update_time": "XXXXXXXXXX",
				"name": "交易设置",
				"desc": "set_payment",
				"frontpath": "/setting/buy",
				"condition": "",
				"menu": 1,
				"order": 20,
				"icon": "credit-card",
				"method": "GET",
				"child": []
			},
			{
				"id": 24,
				"rule_id": 9,
				"status": 1,
				"create_time": "XXXXXXXXXX",
				"update_time": "XXXXXXXXXX",
				"name": "物流设置",
				"desc": "set_express",
				"frontpath": "/setting/ship",
				"condition": "",
				"menu": 1,
				"order": 21,
				"icon": "bicycle",
				"method": "GET",
				"child": []
			}
		]
	},
	{
		"id": 177,
		"rule_id": 0,
		"status": 1,
		"create_time": "XXXXXXXXXX",
		"update_time": "XXXXXXXXXX",
		"name": "分销模块",
		"desc": null,
		"frontpath": "",
		"condition": "",
		"menu": 1,
		"order": 7,
		"icon": "shopping-cart",
		"method": "GET",
		"child": [
			{
				"id": 178,
				"rule_id": 177,
				"status": 1,
				"create_time": "XXXXXXXXXX",
				"update_time": "XXXXXXXXXX",
				"name": "分销员管理",
				"desc": null,
				"frontpath": "/distribution/index",
				"condition": "",
				"menu": 1,
				"order": 50,
				"icon": "user-filled",
				"method": "GET",
				"child": []
			},
			{
				"id": 179,
				"rule_id": 177,
				"status": 1,
				"create_time": "XXXXXXXXXX",
				"update_time": "XXXXXXXXXX",
				"name": "分销设置",
				"desc": null,
				"frontpath": "/distribution/setting",
				"condition": "",
				"menu": 1,
				"order": 50,
				"icon": "set-up",
				"method": "GET",
				"child": []
			}
		]
	},
	{
		"id": 172,
		"rule_id": 0,
		"status": 1,
		"create_time": "XXXXXXXXXX",
		"update_time": "XXXXXXXXXX",
		"name": "其他模块",
		"desc": "",
		"frontpath": "",
		"condition": "",
		"menu": 1,
		"order": 8,
		"icon": "mostly-cloudy",
		"method": "GET",
		"child": [
			{
				"id": 11,
				"rule_id": 172,
				"status": 1,
				"create_time": "XXXXXXXXXX",
				"update_time": "XXXXXXXXXX",
				"name": "图库管理",
				"desc": "image",
				"frontpath": "/image/list",
				"condition": null,
				"menu": 1,
				"order": 20,
				"icon": "picture-filled",
				"method": "GET",
				"child": []
			},
			{
				"id": 149,
				"rule_id": 172,
				"status": 1,
				"create_time": "XXXXXXXXXX",
				"update_time": "XXXXXXXXXX",
				"name": "公告管理",
				"desc": "set_notice",
				"frontpath": "/notice/list",
				"condition": "",
				"menu": 1,
				"order": 50,
				"icon": "notification",
				"method": "GET",
				"child": []
			}
		]
	}
]

const defalutStatistic1Data = {
	"panels": [
		{
			"title": "支付订单",
			"value": 11,
			"unit": "年",
			"unitColor": "success",
			"subTitle": "总支付订单",
			"subValue": 11,
			"subUnit": ""
		},
		{
			"title": "订单量",
			"value": 666,
			"unit": "周",
			"unitColor": "danger",
			"subTitle": "转化率",
			"subValue": "60%",
			"subUnit": ""
		},
		{
			"title": "销售额",
			"value": 3.33,
			"unit": "年",
			"unitColor": "",
			"subTitle": "总销售额",
			"subValue": 3.33,
			"subUnit": ""
		},
		{
			"title": "新增用户",
			"value": 77,
			"unit": "年",
			"unitColor": "warning",
			"subTitle": "总用户",
			"subValue": 77,
			"subUnit": "人"
		}
	]
}

const defaultGetInfoData =  {
	"id": 3,
	"username": "admin",
	"avatar": "https://avatars.githubusercontent.com/u/152025617?s=400&u=d694da60281ffe578e22a75c9f6415ac607f3542&v=4",
	"super": 1,
	"role": {
		"id": 2,
		"name": "超级管理员"
	},
	"menus": defaultAsideMenu,
	"ruleNames": [
		"createRule,POST",
		"updateRule,POST",
		"deleteRule,POST",
		"getRuleList,GET",
		"updateRuleStatus,POST",
		"createRole,POST",
		"updateRole,POST",
		"deleteRole,POST",
		"getRoleList,GET",
		"updateRoleStatus,POST",
		"getGoodsList,GET",
		"getCurrentImageList,GET",
		"getImageClassList,GET",
		"createImageClass,POST",
		"updateImageClass,POST",
		"deleteImageClass,POST",
		"uploadImage,POST",
		"deleteImage,POST",
		"updateImage,POST",
		"getCategoryList,GET",
		"createCategory,POST",
		"sortCategory,POST",
		"updateCategory,POST",
		"updateCategoryStatus,POST",
		"deleteCategory,DELETE",
		"getSkusList,GET",
		"createSkus,POST",
		"deleteSkus,POST",
		"updateSkus,POST",
		"updateSkusStatus,POST",
		"getOrderList,GET",
		"deleteOrder,POST",
		"shipOrder,POST",
		"refundOrder,POST",
		"exportOrder,POST",
		"getCommentList,GET",
		"reviewComment,POST",
		"updateCommentStatus,POST",
		"getUserList,GET",
		"createUser,POST",
		"updateUser,POST",
		"updateUserStatus,POST",
		"deleteUser,POST",
		"getUserLevelList,GET",
		"createUserLevel,POST",
		"updateUserLevel,POST",
		"updateUserLevelStatus,POST",
		"deleteUserLevel,POST",
		"deleteManager,POST",
		"getManagerList,GET",
		"createManager,POST",
		"updateManager,POST",
		"updateManagerStatus,POST",
		"getSysSetting,GET",
		"sysconfigUpload,POST",
		"setSysSetting,POST",
		"getSysSetting,GET",
		"setSysSetting,GET",
		"readGoods,GET",
		"updateGoodsSkus,POST",
		"setGoodsBanner,POST",
		"restoreGoods,POST",
		"destroyGoods,POST",
		"deleteGoods,POST",
		"updateGoodsStatus,POST",
		"createGoods,POST",
		"updateGoods,POST",
		"checkGoods,POST",
		"createGoodsSkusCard,POST",
		"sortGoodsSkusCard,POST",
		"updateGoodsSkusCard,POST",
		"deleteGoodsSkusCard,POST",
		"createGoodsSkusCardValue,POST",
		"updateGoodsSkusCardValue,POST",
		"deleteGoodsSkusCardValue,POST",
		"getNoticeList,GET",
		"createNotice,POST",
		"updateNotice,POST",
		"deleteNotice,POST",
		"getCouponList,GET",
		"createCoupon,POST",
		"updateCoupon,POST",
		"updateCouponStatus,POST",
		"getCategoryGoods,GET",
		"connectCategoryGoods,POST",
		"deleteCategoryGoods,POST",
		"getStatistics1,GET",
		"getStatistics2,GET",
		"getStatistics3,GET",
		"setRoleRules,POST",
		"deleteCoupon,POST",
		"getShipInfo,GET",
		"getExpressCompanyList,GET",
		"getAgentStatistics,GET",
		"getAgentList,GET",
		"getUserBillList,GET",
		"getDistributionSetting,GET",
		"setDistributionSetting,POST"
	]
}

const defalutStatistic3DataWeek = {
	"x": [
		"07-24",
		"07-23",
		"07-22",
		"07-21",
		"07-20",
		"07-19",
		"07-18"
	],
	"y": [
		51,
		0,
		1,
		1,
		0,
		2,
		1
	]
}

const defalutStatistic3DataMonths = {
	"x": [
		"07-01",
		"06-01",
		"05-01",
		"04-01",
		"03-01",
		"02-01",
		"01-01"
	],
	"y": [
		51,
		0,
		1,
		1,
		0,
		2,
		1
	]
}

const defalutStatistic3DataHours = {
	"x": [
		"00",
		"01",
		"02",
		"03",
		"04",
		"05",
		"06",
		"07",
		"08",
		"09",
		"10",
		"11",
		"12",
		"13",
		"14",
		"15",
		"16",
		"17",
		"18",
		"19",
		"20",
		"21",
		"22",
		"23"
	],
	"y": [
		51,
		0,
		1,
		1,
		0,
		2,
		1,
		51,
		0,
		1,
		1,
		0,
		2,
		1,
		51,
		0,
		1,
		1,
		0,
		2,
		1,
		51,
		0,
		1
	]
}

const defalutStatistic2Data = {
	"goods": [
		{
			"label": "审核中",
			"value": 0
		},
		{
			"label": "销售中",
			"value": 119
		},
		{
			"label": "已下架",
			"value": 61
		},
		{
			"label": "库存预警",
			"value": 6
		}
	],
	"order": [
		{
			"label": "待付款",
			"value": 171
		},
		{
			"label": "待发货",
			"value": 16
		},
		{
			"label": "已发货",
			"value": 1
		},
		{
			"label": "退款中",
			"value": 17
		}
	]
}




export const test = {
	"trigger": true,
	"login": {
		"success": Promise.resolve({
			
			"token": "xxxxxxxxxxxxx"
			
		})
	},
	"logout": {
		"success": Promise.resolve({
			"data": "退出登录成功"
		})
	},
	"getinfo": {
		"success": Promise.resolve(defaultGetInfoData)
	},
	"statistic1": {
		"success": Promise.resolve(defalutStatistic1Data)
	},
	"statistic3Week": {
		"success": Promise.resolve(defalutStatistic3DataWeek)
	},
	"statistic3Months": {
		"success": Promise.resolve(defalutStatistic3DataMonths)
	},
	"statistic3Hours": {
		"success": Promise.resolve(defalutStatistic3DataHours)
	},
	"statistic2": {
		"success": Promise.resolve(defalutStatistic2Data)
	}
}