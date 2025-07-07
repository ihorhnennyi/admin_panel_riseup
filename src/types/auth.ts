export interface LoginDto {
	email: string
	password: string
}

export interface AuthUser {
	_id: string
	email: string
	name: string
	role: string
}

export interface AuthResponse {
	accessToken: string
	refreshToken: string
	user: AuthUser
}

export interface GetMeResponse {
	_id: string
	email: string
	name: string
	role: string
}
