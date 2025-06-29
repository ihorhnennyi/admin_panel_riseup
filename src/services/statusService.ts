// import { api } from '@/services/api'
// import { CreateStatusDto, Status } from '@/types/status'

// export const getStatuses = async (): Promise<Status[]> => {
// 	const response = await api.get<Status[]>('/statuses')
// 	return response.data
// }

// export const getStatus = async (id: string): Promise<Status> => {
// 	const response = await api.get<Status>(`/statuses/${id}`)
// 	return response.data
// }

// export const createStatus = async (data: CreateStatusDto): Promise<Status> => {
// 	const response = await api.post<Status>('/statuses', data)
// 	return response.data
// }

// export const updateStatus = async (
// 	id: string,
// 	data: CreateStatusDto
// ): Promise<Status> => {
// 	const response = await api.put<Status>(`/statuses/${id}`, data)
// 	return response.data
// }

// export const deleteStatus = async (id: string): Promise<void> => {
// 	await api.delete(`/statuses/${id}`)
// }
