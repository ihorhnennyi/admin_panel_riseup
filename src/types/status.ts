export interface Status {
	_id: string
	name: string
	color: string
	description: string
}

export type CreateStatusDto = Omit<Status, '_id'>
export type UpdateStatusDto = Partial<CreateStatusDto>
