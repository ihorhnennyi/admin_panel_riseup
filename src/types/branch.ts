export interface Branch {
	_id: string
	name: string
	description?: string
	city: string
}

export type CreateBranchDto = Omit<Branch, '_id'>
export type UpdateBranchDto = Partial<CreateBranchDto>
