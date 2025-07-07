export interface City {
	_id: string
	name: string
	latitude?: number
	longitude?: number
	color: string
}

export type CreateCityDto = Omit<City, '_id'>
export type UpdateCityDto = Partial<CreateCityDto>
