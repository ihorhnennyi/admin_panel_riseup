export interface City {
	_id: string
	name: string
	latitude?: number
	longitude?: number
	color?: string
	createdAt?: string
	updatedAt?: string
}

export interface CreateCityDto {
	name: string
	latitude?: number
	longitude?: number
	color?: string
}
