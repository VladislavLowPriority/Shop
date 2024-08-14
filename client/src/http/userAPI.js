import { jwtDecode } from 'jwt-decode'
import { $authHost, $host } from './index'

export const registration = async (email, password) => {
	const { data } = await $host.post('api/user/registration', {
		email,
		password,
		role: 'USER',
	})
	localStorage.setItem('token', data.token)
	return jwtDecode(data.token)
}

export const login = async (email, password) => {
	const { data } = await $host.post('api/user/login', { email, password })
	localStorage.setItem('token', data.token)
	return jwtDecode(data.token)
}

export const check = async () => {
	const token = localStorage.getItem('token')
	if (!token) {
		throw new Error('No token found')
	}
	const { data } = await $authHost.get('api/user/auth')
	localStorage.setItem('token', data.token)
	return jwtDecode(data.token)
}
