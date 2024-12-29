import axios from '~/axios';



//登录
export function login(data) {
	console.log("username: ", data.username)
	console.log("password: ", data.password)
  return axios.post('/Admin/Login', {
	username: data.username,
	password: data.password
  });
}
//退出
export function logout() {

	return axios.post('/Admin/Logout')
}
//获取用户信息
// 接口名称要修改 方法要改成get
export function getInfo() {

	return axios.post('/admin/getinfo')
}
//更改密码
export function changePassword(data) {

	return axios.post('/Admin/ChangePassword', data)
}
//注册
export function registerAccount(data) {

	return axios.post('/Admin/Register', data)
}


