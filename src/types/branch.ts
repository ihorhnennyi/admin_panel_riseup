export interface Branch {
	_id: string
	name: string
	description?: string
	city: string
	createdAt?: string
	updatedAt?: string
}

export interface CreateBranchDto {
	name: string
	description?: string
	city: string
}
