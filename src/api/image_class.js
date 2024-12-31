import axios from '~/axios'
import { test } from '~/default/constant';

export function getImageClassList(page) {

	if (test.trigger){
		switch (page) {
			case 1:
				return test.imageClass1.success
			case 2:
				return test.imageClass2.success
			case 3:
				return test.imageClass3.success
		}
	} else 
		return axios.get('/Admin/image_class/' + page)
}