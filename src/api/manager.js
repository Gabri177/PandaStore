import axios from '~/axios';
import { test } from '~/default/constant';



//登录
export function login(data) {

	if (test.trigger != true) {  // 这里设置为真的api 已经用不等于来接通真的api
		return test.login.success
	}else {
		return axios.post('/Admin/Login', {
			username: data.username,
			password: data.password
		});
	}
}
//退出
export function logout() {

	if (test.trigger != true) { // 这里设置为真的api 已经用不等于来接通真的api
		return test.logout.success
	}else {
		return axios.post('/Admin/Logout')
	}
}

//获取用户信息
// 接口名称要修改 方法要改成get
export function getInfo() {

	if (test.trigger == true) {
		return test.getinfo.success
	}else {
		return axios.post('/Admin/GetInfo')
	}
}
//更改密码
export function changePassword(data) {

	return axios.post('/Admin/ChangePassword', data)
}
//注册
export function registerAccount(data) {

	return axios.post('/Admin/Register', data)
}


