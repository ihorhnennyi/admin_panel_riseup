import { CreateSourceDto, Source, UpdateSourceDto } from '@/types/source'
import { api } from './api'

// Получить все источники
export const getSources = async (): Promise<Source[]> => {
	const response = await api.get<{ data: Source[] }>('/sources')
	return response.data.data
}

// Получить источник по ID
export const getSourceById = async (id: string): Promise<Source> => {
	const response = await api.get<{ data: Source }>(`/sources/${id}`)
	return response.data.data
}

// Создать источник
export const createSource = async (data: CreateSourceDto): Promise<Source> => {
	const response = await api.post<{ data: Source }>('/sources', data)
	return response.data.data
}

// Обновить источник
export const updateSource = async (
	id: string,
	data: UpdateSourceDto
): Promise<Source> => {
	const response = await api.patch<{ data: Source }>(`/sources/${id}`, data)
	return response.data.data
}

// Удалить источник
export const deleteSource = async (id: string): Promise<void> => {
	await api.delete(`/sources/${id}`)
}
