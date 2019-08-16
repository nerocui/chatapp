import { SET_AUTH_INFO, LOGOUT } from './type';

export function setAuthInfo(user) {
	return {
		type: SET_AUTH_INFO,
		payload: user,
	};
}

export function logout() {
	return {
		type: LOGOUT
	};
}
