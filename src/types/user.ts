export interface User {
	_id: string
	email: string
	firstName: string
	lastName: string
	role: 'admin' | 'recruiter' | string
	isActive: boolean
	createdAt?: string
	updatedAt?: string
}

export interface CreateUserDto {
	email: string
	firstName: string
	lastName: string
	role: 'admin' | 'recruiter' | string
	isActive: boolean
}
