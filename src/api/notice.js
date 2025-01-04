import axios from '~/axios';
import { test } from '~/default/constant';

export function getNoticeList(id, page = 1, limit = 10) {
	
	if (test.trigger){
		return test.f_getImagesByClassId(page)
	} else 
		return axios.get(`/Admin/Noice/${id}/image/${page}`)
}