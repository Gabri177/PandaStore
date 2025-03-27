import { useCookies } from "@vueuse/integrations/useCookies.mjs"
import * as constants from "~/default/constant"

const cookie = useCookies()

export function getLoginToken() {
	return cookie.get(constants.COOKIE_SET.token_name)
}

export function setToken(key, val) {
	cookie.set(key, JSON.stringify(val))
}

export function removeToken(key) {
	cookie.remove(key)
}

export function getToken(key) {
    const token = cookie.get(key);
    if (!token) return null;

    try {
        return typeof token === 'string' ? JSON.parse(token) : token;
    } catch (error) {
        console.error('解析 token 失败:', error, '原始数据:', token);
        return null;
    }
}



export function setLoginToken(token, expirationDateStr) {

	const expirationDate = new Date(expirationDateStr)
	//cookie.set(constants.COOKIE_SET.token_expires_name, expirationDateStr)
	cookie.set(constants.COOKIE_SET.token_name, token)
}

export function removeLoginToken() {
	cookie.remove(constants.COOKIE_SET.token_name)
	//cookie.remove(constants.COOKIE_SET.token_expires_name)
}


export function isTokenExpired() {

	const current_token = cookie.get(constants.COOKIE_SET.token_name)
	const expires = cookie.get(constants.COOKIE_SET.token_expires_name)
	
	if (!current_token){
		return false
	} else {
		if (!expires)
			return true
		else
			return new Date() > new Date(expires)
	}
		
}