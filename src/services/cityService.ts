// import { api } from '@/services/api'
// import { City, CreateCityDto } from '@/types/city'

// export const getCities = async (): Promise<City[]> => {
// 	const response = await api.get<City[]>('/cities')
// 	return response.data
// }

// export const getCity = async (id: string): Promise<City> => {
// 	const response = await api.get<City>(`/cities/${id}`)
// 	return response.data
// }

// export const createCity = async (data: CreateCityDto): Promise<City> => {
// 	const response = await api.post<City>('/cities', data)
// 	return response.data
// }

// export const updateCity = async (
// 	id: string,
// 	data: CreateCityDto
// ): Promise<City> => {
// 	const response = await api.put<City>(`/cities/${id}`, data)
// 	return response.data
// }

// export const deleteCity = async (id: string): Promise<void> => {
// 	await api.delete(`/cities/${id}`)
// }
