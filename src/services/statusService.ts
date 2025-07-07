import { api } from '@/services/api'
import { CreateStatusDto, Status, UpdateStatusDto } from '@/types/status'

// Получить все статусы
export const getStatuses = async (): Promise<Status[]> => {
	const response = await api.get<{ data: Status[] }>('/statuses')
	return response.data.data
}

// Получить статус по ID (необязательно, но может пригодиться)
export const getStatusById = async (id: string): Promise<Status> => {
	const response = await api.get<{ data: Status }>(`/statuses/${id}`)
	return response.data.data
}

// Создать статус
export const createStatus = async (data: CreateStatusDto): Promise<Status> => {
	const response = await api.post<{ data: Status }>('/statuses', data)
	return response.data.data
}

// Обновить статус
export const updateStatus = async (
	id: string,
	data: UpdateStatusDto
): Promise<Status> => {
	const response = await api.patch<{ data: Status }>(`/statuses/${id}`, data)
	return response.data.data
}

// Удалить статус
export const deleteStatus = async (id: string): Promise<void> => {
	await api.delete(`/statuses/${id}`)
}
