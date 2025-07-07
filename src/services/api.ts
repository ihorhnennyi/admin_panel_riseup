import axios from 'axios'
import {
	clearTokens,
	getAccessToken,
	getRefreshToken,
	setTokens,
} from './tokenService'

const API_URL = 'http://localhost:5000'

type AuthResponse = {
	accessToken: string
	refreshToken: string
}

export const api = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

api.interceptors.request.use(config => {
	const token = getAccessToken()
	if (token && config.headers) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

let isRefreshing = false
let queue: any[] = []

const processQueue = (error: any, token: string | null) => {
	queue.forEach(p => (error ? p.reject(error) : p.resolve(token)))
	queue = []
}

api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config

		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			!originalRequest.url.includes('/auth/refresh')
		) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					queue.push({
						resolve: (token: string) => {
							originalRequest.headers.Authorization = `Bearer ${token}`
							resolve(api(originalRequest))
						},
						reject,
					})
				})
			}

			originalRequest._retry = true
			isRefreshing = true

			try {
				const refreshToken = getRefreshToken()
				if (!refreshToken) throw new Error('Missing refresh token')

				const { data } = await axios.post<{ data: AuthResponse }>(
					`${API_URL}/auth/refresh`,
					{ refreshToken }
				)

				const { accessToken, refreshToken: newRefreshToken } = data.data

				setTokens(accessToken, newRefreshToken)
				processQueue(null, accessToken)

				originalRequest.headers.Authorization = `Bearer ${accessToken}`
				return api(originalRequest)
			} catch (err) {
				processQueue(err, null)
				clearTokens()
				window.location.href =
					'/?redirect=' + encodeURIComponent(window.location.pathname)
				return Promise.reject(err)
			} finally {
				isRefreshing = false
			}
		}

		return Promise.reject(error)
	}
)
