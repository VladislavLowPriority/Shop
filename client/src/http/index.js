import axios from 'axios'

const $host = axios.create({
	baseURL: process.env.REACT_APP_API_URL || 'http://localhost:7500/',
})

const $authHost = axios.create({
	baseURL: process.env.REACT_APP_API_URL || 'http://localhost:7500/',
})

const authInterceptor = config => {
	config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
	return config
}

$authHost.interceptors.request.use(authInterceptor)

export { $authHost, $host }
