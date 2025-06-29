export interface Status {
	_id: string
	name: string
	color: string
	description?: string
	order: number
	type: 'initial' | 'interview' | 'final' | string
	isDefault: boolean
	isActive: boolean
	createdAt?: string
	updatedAt?: string
}

export interface CreateStatusDto {
	name: string
	color: string
	description?: string
	order: number
	type: 'initial' | 'interview' | 'final' | string
	isDefault: boolean
	isActive: boolean
}
