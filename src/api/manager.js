import axios from '~/axios';

export function login(data) {
	console.log("username: ", data.username)
	console.log("password: ", data.password)
  return axios.post('/Admin/Login', {
	username: data.username,
	password: data.password
  });
}

export function getInfo() {

	return axios.get('/Admin/TokenTest')
}

export function logout() {

	return axios.post('/Admin/Logout')
}

export function changePassword(data) {

	return axios.post('/Admin/ChangePassword', data)
}