// import { api } from '@/services/api'
// import { CreateUserDto, User } from '@/types/user'

// export const getUsers = async (): Promise<User[]> => {
// 	const response = await api.get<User[]>('/users')
// 	return response.data
// }

// export const getUser = async (id: string): Promise<User> => {
// 	const response = await api.get<User>(`/users/${id}`)
// 	return response.data
// }

// export const createUser = async (data: CreateUserDto): Promise<User> => {
// 	const response = await api.post<User>('/users', data)
// 	return response.data
// }

// export const updateUser = async (
// 	id: string,
// 	data: CreateUserDto
// ): Promise<User> => {
// 	const response = await api.put<User>(`/users/${id}`, data)
// 	return response.data
// }

// export const deleteUser = async (id: string): Promise<void> => {
// 	await api.delete(`/users/${id}`)
// }
