import { Branch, CreateBranchDto, UpdateBranchDto } from '@/types/branch'
import { api } from './api'

// Получить все филиалы
export const getBranches = async (): Promise<Branch[]> => {
	const response = await api.get<{ data: Branch[] }>('/branches')
	return response.data.data
}

// Получить филиал по ID (необязательно, но оставим)
export const getBranchById = async (id: string): Promise<Branch> => {
	const response = await api.get<{ data: Branch }>(`/branches/${id}`)
	return response.data.data
}

// Создать филиал
export const createBranch = async (data: CreateBranchDto): Promise<Branch> => {
	const response = await api.post<{ data: Branch }>('/branches', data)
	return response.data.data
}

// Обновить филиал
export const updateBranch = async (
	id: string,
	data: UpdateBranchDto
): Promise<Branch> => {
	const response = await api.patch<{ data: Branch }>(`/branches/${id}`, data)
	return response.data.data
}

// Удалить филиал
export const deleteBranch = async (id: string): Promise<void> => {
	await api.delete(`/branches/${id}`)
}
