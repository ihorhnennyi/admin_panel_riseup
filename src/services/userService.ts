import { api } from '@/services/api'
import { CreateUserDto, User } from '@/types/user'

export const getUsers = async (): Promise<User[]> => {
	const response = await api.get<{ data: User[] }>('/users')
	return response.data.data
}

export const getUser = async (id: string): Promise<User> => {
	const response = await api.get<{ data: User }>(`/users/${id}`)
	return response.data.data
}

export const createUser = async (data: CreateUserDto): Promise<User> => {
	const response = await api.post<{ data: User }>('/users', data)
	return response.data.data
}

export const updateUser = async (
	id: string,
	data: Partial<CreateUserDto>
): Promise<User> => {
	const response = await api.patch<{ data: User }>(`/users/${id}`, data)
	return response.data.data
}

export const deleteUser = async (id: string): Promise<void> => {
	await api.delete(`/users/${id}`)
}
