import { Candidate } from '@/types/candidate'

export interface CandidateRow {
	id: string
	firstName: string
	lastName: string
	middleName: string
	email: string
	phone: string
	age?: number
	city: string
	description?: string
	salary?: string | number
	source: string
	status: string
	recruiter: string
	createdAt: string
	updatedAt: string
	original: Candidate
}

// Формат даты: 20.10.23 - 12:00
const formatDate = (dateStr?: string): string => {
	if (!dateStr) return ''
	const date = new Date(dateStr)
	const d = String(date.getDate()).padStart(2, '0')
	const m = String(date.getMonth() + 1).padStart(2, '0')
	const y = String(date.getFullYear()).slice(-2)
	const h = String(date.getHours()).padStart(2, '0')
	const min = String(date.getMinutes()).padStart(2, '0')
	return `${d}.${m}.${y} - ${h}:${min}`
}

export const mapCandidatesToRows = (
	candidates: Candidate[]
): CandidateRow[] => {
	const getName = (field: any) =>
		typeof field === 'object' && field !== null ? field.name ?? '' : field ?? ''

	return candidates.map((candidate, index) => ({
		id: (index + 1).toString(),
		firstName: candidate.firstName ?? '',
		lastName: candidate.lastName ?? '',
		middleName: candidate.middleName ?? '',
		email: candidate.email ?? '',
		phone: candidate.phone ?? '',
		age: typeof candidate.age === 'number' ? candidate.age : undefined,
		city: getName(candidate.city),
		description: candidate.description ?? '',
		salary: candidate.salary ?? '',
		source: getName(candidate.source),
		status: getName(candidate.status),
		recruiter:
			candidate.createdBy && typeof candidate.createdBy === 'object'
				? candidate.createdBy.name ?? ''
				: '',
		createdAt: formatDate(candidate.createdAt),
		updatedAt: formatDate(candidate.updatedAt),
		original: candidate,
	}))
}
