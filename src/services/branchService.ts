// import { api } from '@/services/api'
// import { Branch, CreateBranchDto } from '@/types/branch'

// export const getBranches = async (): Promise<Branch[]> => {
// 	const response = await api.get<Branch[]>('/branches')
// 	return response.data
// }

// export const getBranch = async (id: string): Promise<Branch> => {
// 	const response = await api.get<Branch>(`/branches/${id}`)
// 	return response.data
// }

// export const createBranch = async (data: CreateBranchDto): Promise<Branch> => {
// 	const response = await api.post<Branch>('/branches', data)
// 	return response.data
// }

// export const updateBranch = async (
// 	id: string,
// 	data: CreateBranchDto
// ): Promise<Branch> => {
// 	const response = await api.put<Branch>(`/branches/${id}`, data)
// 	return response.data
// }

// export const deleteBranch = async (id: string): Promise<void> => {
// 	await api.delete(`/branches/${id}`)
// }
