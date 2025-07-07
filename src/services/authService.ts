import { AuthResponse, GetMeResponse, LoginDto } from '@/types/auth'
import { api } from './api'
import { setTokens } from './tokenService'

export const login = async (dto: LoginDto): Promise<AuthResponse> => {
	const response = await api.post<{ data: AuthResponse }>('/auth/login', dto)
	const { accessToken, refreshToken, user } = response.data.data
	setTokens(accessToken, refreshToken)
	return { accessToken, refreshToken, user }
}

export const getMe = async (): Promise<GetMeResponse> => {
	const response = await api.get<{ data: GetMeResponse }>('/auth/me')
	return response.data.data
}
