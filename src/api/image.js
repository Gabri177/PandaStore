import axios from '~/axios';
import { test } from '~/default/constant';

//获取图片列表
export function getImagesList(id, page = 1) {
	return axios.get(`/Admin/Image_class/${id}/image/${page}`)
}