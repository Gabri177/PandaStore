import axios from '~/axios'
import { test } from '~/default/constant';

export function getImageClassList(page, limit = 10) {

	if (test.trigger){
		return test.imageClass.success(page, limit)
	} else 
		return axios.get('/Admin/image_class/' + page)
}

export function createImageClass(data) { // name, order

	if (test.trigger){
		return test.f_addImageClass(data)
	} else 
		return axios.post('/Admin/image_class', data)
}

export function updateImageClass(id, data) { 

	if (test.trigger){
		return test.f_updateImageClass(id, data)
	} else 
		return axios.post(`/Admin/image_class/${id}`, data)
}

export function deleteImageClass(id) {
	
	if (test.trigger){
		return test.f_deleteImageClass(id)
	} else 
		return axios.post(`/Admin/image_class/${id}/delete`)
}