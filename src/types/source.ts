export interface Source {
	_id: string
	name: string
	color: string
	description?: string
}

export type CreateSourceDto = Omit<Source, '_id'>
export type UpdateSourceDto = Partial<CreateSourceDto>
