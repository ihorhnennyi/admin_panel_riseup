export interface User {
	_id: string
	email: string
	name: string
	role: 'admin' | 'recruiter'
	password?: string
	lastName?: string
	middleName?: string
	phone?: string
	city?: string
	branch?: string
	description?: string
	position?: string
	birthDate?: string
	isActive?: boolean
	viber?: string
	whatsapp?: string
	facebook?: string
	telegram?: string
	languages?: string[]
	skills?: string[]
	workSchedule?: string
	employmentType?: string
	startDate?: string
	experienceYears?: number
	specializations?: string[]
	linkedinUrl?: string
	identificationNumber?: string
	certificates?: string[]
	supervisor?: string
	responsibilities?: string[]
	emergencyContact?: string
	photoUrl?: string
}

export interface CreateUserDto {
	email: string
	name: string
	password?: string // при редактировании может отсутствовать
	role: 'admin' | 'recruiter'

	lastName?: string
	middleName?: string
	phone?: string
	city?: string
	branch?: string
	description?: string
	position?: string
	birthDate?: string
	isActive?: boolean
	viber?: string
	whatsapp?: string
	facebook?: string
	telegram?: string
	languages?: string[]
	skills?: string[]
	workSchedule?: string
	employmentType?: string
	startDate?: string
	experienceYears?: number
	specializations?: string[]
	linkedinUrl?: string
	identificationNumber?: string
	certificates?: string[]
	supervisor?: string
	responsibilities?: string[]
	emergencyContact?: string
	photoUrl?: string
}
