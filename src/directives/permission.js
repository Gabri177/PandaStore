import store from '~/store'

function hasPermission(values, el = false) {
	
	if(!Array.isArray(values)) {
		throw new Error('Permissions rules must be an array !')
	}
	// console.log('hasPermission called: ', values)
	const hasAuth = values.findIndex(value => store.state.ruleNames.includes(value)) != -1
	if(el && !hasAuth) {
		el.parentNode && el.parentNode.removeChild(el)
	}
	return hasAuth
}


export default {
	install(app) {
		app.directive('permission', {
			mounted(el, binding) {
				// console.log('permission mounted');
				hasPermission(binding.value, el)
			}
		})
	}
}