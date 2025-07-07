import { City, CreateCityDto, UpdateCityDto } from '@/types/city'
import { api } from './api'

// Получить все города
export const getCities = async (): Promise<City[]> => {
	const response = await api.get<{ data: City[] }>('/cities')
	return response.data.data
}

// Получить город по ID (не используется в хуке, но пригодится)
export const getCityById = async (id: string): Promise<City> => {
	const response = await api.get<{ data: City }>(`/cities/${id}`)
	return response.data.data
}

// Создать новый город
export const createCity = async (data: CreateCityDto): Promise<City> => {
	const response = await api.post<{ data: City }>('/cities', data)
	return response.data.data
}

// Обновить город
export const updateCity = async (
	id: string,
	data: UpdateCityDto
): Promise<City> => {
	const response = await api.patch<{ data: City }>(`/cities/${id}`, data)
	return response.data.data
}

// Удалить город
export const deleteCity = async (id: string): Promise<void> => {
	await api.delete(`/cities/${id}`)
}
