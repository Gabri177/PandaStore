import { ElNotification, ElMessageBox } from "element-plus";
import nprogress from 'nprogress'

export function toast(title, message, type = "success", dangerouslyUseHTMLString = false) {
  ElNotification({
	title,
	message,
	type,
	duration: 2000,
	dangerouslyUseHTMLString: dangerouslyUseHTMLString
  });
}

export function popOut(title = "", content = "default content", confirm = "OK", cancel = "Cancel", type = "warning") {

	return ElMessageBox.confirm(
		content,
		title,
		{
		  confirmButtonText: confirm,
		  cancelButtonText: cancel,
		  type,
		}
	)
	
}

// 显示全屏的loading

export function showFullScreenLoading() {

	nprogress.start()
}

// 隐藏全屏的loading

export function hideFullScreenLoading() {
	
	nprogress.done()
}

export function handleCategoryData(data){
	const firstClassCategory = addCategoryValue(data.firstClassCategory);
	const secondClassCategory = addCategoryValue(data.secondClassCategory);

	const categories = firstClassCategory.map((item) => {
		const children = secondClassCategory.filter((child) => child.parentId === item.id);
		return {
			...item,
			children
		};
	});

	console.log('categories', categories);
	return categories;
};

function addCategoryValue(data){

	const newClassCategory = data.map((item) => {
		return {
			...item,
			value: item.label
		};
	});

	return newClassCategory;
}