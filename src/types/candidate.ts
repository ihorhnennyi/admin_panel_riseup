// Общий тип для справочников (статусы, города, источники и т.д.)
export interface RefWithNameAndColor {
	_id?: string
	name: string
	color?: string
	description?: string
}

// Тип, который может быть либо ID, либо объект со значением
export type Populated<T = string> = T | RefWithNameAndColor

// Дополнительный тип для рекрутёра
export interface RecruiterShort {
	_id: string
	name: string
	lastName?: string
	email?: string
}

// Основной тип кандидата (как приходит с бэкенда)
export interface Candidate {
	_id: string
	firstName: string
	lastName: string
	middleName?: string
	email?: string
	phone?: string
	age?: number
	position?: string
	salary?: number
	city: Populated
	source: Populated
	status: Populated
	description?: string
	employmentType?: string
	gender?: string
	isActive?: boolean
	comment?: string
	createdAt?: string
	updatedAt?: string

	// 👇 Добавлено:
	createdBy?: string | RecruiterShort
}

// DTO для создания кандидата
export interface CreateCandidateDto {
	firstName: string
	lastName: string
	middleName?: string
	email?: string
	phone?: string
	age?: number
	position?: string
	salary?: number
	city: string
	source: string
	status: string
	description?: string
	employmentType?: string
	gender?: string
	isActive?: boolean
	comment?: string
}

// DTO для обновления кандидата (частичное обновление)
export type UpdateCandidateDto = Partial<CreateCandidateDto>
