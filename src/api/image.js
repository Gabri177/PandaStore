import axios from '~/axios';
import { test } from '~/default/constant';

const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

//获取图片列表
export function getImagesList(id, page = 1, limit = 10) {
	
	if (test.trigger){
		return test.f_getImagesByClassId(id, page, limit)
	} else 
		return axios.get(`/Admin/Image_class/${id}/image/${page}?limit=${limit}`)
}

//修改图片信息
export function updateImage(id, name) {
	
	if (test.trigger){
		return test.f_updateImage(id , name)
	} else 
		return axios.post(`/Admin/Image/image/${id}`, { name })
}

//删除图片
export function deleteImage(ids) {
	
	if (test.trigger){
		return test.f_deleteImage(ids)
	} else 
		return axios.post(`/Admin/Image/delete_all`, { ids })
}

//上传图片
export const uploadImageAction = apiBaseURL + '/api' + '/Admin/Image/upload'