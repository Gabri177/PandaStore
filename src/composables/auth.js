import { useCookies } from "@vueuse/integrations/useCookies.mjs"

// const token_key = "adminkey"
const token_key = "token"

const cookie = useCookies()

export function getToken() {
	return cookie.get(token_key)
}

export function setToken(token) {
	return cookie.set(token_key, token)
}

export function removeToken() {
	return cookie.remove(token_key)
}