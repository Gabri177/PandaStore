import axios from '~/axios';
import { test } from '~/default/constant';


//主控台基础数字统计信息接口
export function getStatistics1() {

	if (test.trigger == true) {
		return test.statistic1.success
	}else {
		return axios.get('/Admin/Statistic1')
	}
}

export function getStatistics2() {

	if (test.trigger == true) {
		return test.statistic2.success
	}else {
		return axios.get('/Admin/Statistic2' + type)
	}
}

//图表信息接口
export function getStatistics3(type) {

	if (test.trigger == true) {
		switch (type) {
			case 'hour':
				return test.statistic3Hours.success
			case 'week':
				return test.statistic3Week.success
			case 'month':
				return test.statistic3Months.success
		}
	}else {
		return axios.get('/Admin/Statistic3?type=' + type)
	}
}

