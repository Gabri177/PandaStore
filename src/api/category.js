import axios from '~/axios'
import { test } from '~/default/constant';

export function getAllCategory() {
	
	if (test.trigger){
		return test.f_getAllCategory()
	} else 
		return axios.get('/Admin/AllCategory')
}